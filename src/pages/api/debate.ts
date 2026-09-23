import type { NextApiRequest, NextApiResponse } from 'next';
import { localDebate } from '@/lib/atlas/localAgents';
import type { DebateResult, Decision, Ticker } from '@/lib/atlas/types';

const MODEL = 'qwen3.8-max';
const QWEN_URL =
  process.env.QWEN_BASE_URL ??
  'https://hackathon.bitgetops.com/v1/chat/completions';

function apiKey() {
  return process.env.QWEN_API_KEY ?? process.env.NEXT_PUBLIC_QWEN_API_KEY ?? '';
}

async function qwen(messages: Array<{ role: string; content: string }>, maxTokens = 320) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 25_000);
  try {
    const r = await fetch(QWEN_URL, {
      method: 'POST',
      signal: ctrl.signal,
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey()}`,
      },
      body: JSON.stringify({ model: MODEL, messages, temperature: 0.7, max_tokens: maxTokens }),
    });
    if (!r.ok) throw new Error(`qwen ${r.status}: ${(await r.text()).slice(0, 200)}`);
    const body = (await r.json()) as { choices?: Array<{ message?: { content?: string } }> };
    const text = body?.choices?.[0]?.message?.content?.trim();
    if (!text) throw new Error('qwen: empty completion');
    return text;
  } finally {
    clearTimeout(timer);
  }
}

function marketBrief(t: Ticker) {
  return [
    `Instrument: ${t.label} (${t.symbol})`,
    `Last price: ${t.price}`,
    `24h change: ${t.change24h.toFixed(2)}%`,
    `24h high / low: ${t.high24h} / ${t.low24h}`,
    `24h volume (base): ${t.volume24h}`,
    `Data source: ${t.source}`,
  ].join('\n');
}

function extractJson(text: string): Partial<Decision> | null {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
  const raw = fenced ? fenced[1] : text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
  if (!raw || !raw.includes('{')) return null;
  try {
    return JSON.parse(raw) as Partial<Decision>;
  } catch {
    return null;
  }
}

function sanitize(d: Partial<Decision>, t: Ticker, fallback: Decision): Decision {
  const action = d.action === 'LONG' || d.action === 'SHORT' || d.action === 'WAIT' ? d.action : fallback.action;
  const n = (v: unknown, alt: number) => (typeof v === 'number' && Number.isFinite(v) ? v : alt);
  const entry = n(d.entry, t.price);
  const stop = n(d.stop, fallback.stop);
  const target = n(d.target, fallback.target);
  const riskReward = Math.abs(target - entry) / Math.max(Math.abs(entry - stop), 1e-9);
  return {
    action,
    entry,
    stop,
    target,
    sizeMultiplier: action === 'WAIT' ? 0 : Math.min(Math.max(n(d.sizeMultiplier, fallback.sizeMultiplier), 0.1), 2),
    confidence: Math.min(Math.max(Math.round(n(d.confidence, fallback.confidence)), 1), 99),
    riskReward: Number((Number.isFinite(riskReward) ? riskReward : fallback.riskReward).toFixed(2)),
    reasoning: typeof d.reasoning === 'string' && d.reasoning.trim() ? d.reasoning.trim() : fallback.reasoning,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<DebateResult | { error: string }>) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

  const ticker = req.body?.ticker as Ticker | undefined;
  if (!ticker || typeof ticker.price !== 'number') {
    return res.status(400).json({ error: 'ticker required' });
  }

  const started = Date.now();
  const local = localDebate(ticker);
  const brief = marketBrief(ticker);

  if (!apiKey()) {
    return res.status(200).json({
      symbol: ticker.symbol,
      price: ticker.price,
            source: 'local',
      model: 'atlas-local-agents',
      messages: local.messages.map((m, i) => ({ ...m, ts: started + i })),
      decision: local.decision,
      latencyMs: Date.now() - started,
      fellBack: false,
    });
  }

  try {
           const bull = await qwen([
      {
        role: 'system',
        content:
          'You are the Bull Agent on the Atlas trading desk. You argue the LONG case with conviction, always citing concrete levels from the data given. Never hedge into neutrality. 3 sentences max, no markdown, no bullet points.',
      },
      { role: 'user', content: `${brief}\n\nMake the long case. Include an entry, an invalidation level and a target.` },
    ]);
    const bullTs = Date.now();

    const bear = await qwen([
      {
        role: 'system',
        content:
          'You are the Bear Agent on the Atlas trading desk. You argue the SHORT or AVOID case with conviction, attacking the bull thesis on specifics. 3 sentences max, no markdown.',
      },
      {
        role: 'user',
        content: `${brief}\n\nThe Bull Agent said:\n"${bull}"\n\nRebut it and state what would have to happen before you would size up.`,
      },
    ]);
    const bearTs = Date.now();

    const riskRaw = await qwen(
      [
        {
          role: 'system',
          content:
            'You are the Risk Manager on the Atlas trading desk. You arbitrate the debate and reply with ONE JSON object and nothing else. Schema: {"action":"LONG"|"SHORT"|"WAIT","entry":number,"stop":number,"target":number,"sizeMultiplier":number,"confidence":number,"riskReward":number,"reasoning":string}. Prices must be absolute numbers in the instrument\'s quote currency, sizeMultiplier between 0 and 2 (0 for WAIT), confidence 1-99, reasoning max 2 sentences.',
        },
        {
          role: 'user',
          content: `${brief}\n\nBull:\n"${bull}"\n\nBear:\n"${bear}"\n\nReturn the verdict JSON only.`,
        },
      ],
      420,
    );
    const riskTs = Date.now();

    const decision = sanitize(extractJson(riskRaw) ?? {}, ticker, local.decision);

    let trader: string;
    try {
      trader = await qwen(
        [
          {
            role: 'system',
            content:
              'You are the Trader Agent. You log exactly one sentence describing the execution you just performed on the paper book. No markdown.',
          },
          {
            role: 'user',
            content: `Instrument ${ticker.label}. Verdict: ${JSON.stringify(decision)}. Write the execution log line.`,
          },
        ],
        120,
      );
    } catch {
      trader = local.messages[3].text;
    }
    const traderTs = Date.now();

    return res.status(200).json({
      symbol: ticker.symbol,
      price: ticker.price,
      source: 'qwen',
      model: MODEL,
      fellBack: false,
      messages: [
        { agent: 'bull', text: bull, ts: bullTs },
        { agent: 'bear', text: bear, ts: bearTs },
        {
          agent: 'risk',
          text: `Verdict: ${decision.action} · entry ${decision.entry} · stop ${decision.stop} · target ${decision.target} · size ${decision.sizeMultiplier}x · R:R ${decision.riskReward}. ${decision.reasoning}`,
          ts: riskTs,
        },
        { agent: 'trader', text: trader, ts: traderTs },
      ],
      decision,
      latencyMs: Date.now() - started,
    });
  } catch {
    return res.status(200).json({
      symbol: ticker.symbol,
      price: ticker.price,
      source: 'local',
      model: 'atlas-local-agents (qwen unavailable)',
      messages: local.messages.map((m, i) => ({ ...m, ts: started + i })),
      decision: local.decision,
      latencyMs: Date.now() - started,
      fellBack: true,
    });
  }
}