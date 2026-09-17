module.exports = [
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/pages-api-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/atlas/atlas/src/lib/atlas/localAgents.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "localDebate",
    ()=>localDebate
]);
function readMarket(t) {
    const span = Math.max(t.high24h - t.low24h, t.price * 0.0001);
    const rangePos = Math.min(Math.max((t.price - t.low24h) / span, 0), 1);
    const rangePct = span / t.price * 100;
    // Synthetic RSI: range position dominates, 24h change tilts it.
    const rsi = Math.round(Math.min(Math.max(rangePos * 70 + 15 + t.change24h * 1.6, 4), 96));
    const trend = t.change24h > 0.35 ? 'up' : t.change24h < -0.35 ? 'down' : 'flat';
    const vwap = (t.high24h + t.low24h + t.price) / 3;
    const bias = rsi < 34 || trend === 'up' && rangePos > 0.55 ? 'long' : rsi > 70 || trend === 'down' && rangePos < 0.4 ? 'short' : 'wait';
    return {
        rsi,
        rangePos,
        rangePct,
        trend,
        vwap,
        bias
    };
}
const p = (n, ref)=>{
    const d = ref >= 1000 ? 2 : ref >= 10 ? 3 : 4;
    return n.toLocaleString('en-US', {
        minimumFractionDigits: d,
        maximumFractionDigits: d
    });
};
function localDebate(t) {
    const r = readMarket(t);
    const price = t.price;
    const atr = Math.max(t.high24h - t.low24h, price * 0.004) * 0.55;
    const bull = [
        `${t.label} at ${p(price, price)} is holding ${r.rangePos > 0.5 ? 'the upper half' : 'the lower band'} of a ${r.rangePct.toFixed(2)}% 24h range with synthetic RSI at ${r.rsi}.`,
        r.trend === 'up' ? `Momentum is with us: ${t.change24h.toFixed(2)}% on the day and price is trading above the ${p(r.vwap, price)} session VWAP, so dips are being absorbed.` : `The ${t.change24h.toFixed(2)}% flush swept liquidity into ${p(t.low24h, price)} and buyers defended it — that is the reversal tell, not weakness.`,
        `Long case: enter ${p(price, price)}, invalidation under ${p(price - atr * 1.1, price)}, first objective ${p(price + atr * 2.2, price)}. Volume of ${Math.round(t.volume24h).toLocaleString('en-US')} confirms participation.`
    ].join(' ');
    const bear = [
        `Pushing back. A ${r.rangePct.toFixed(2)}% range is compression, not trend — chasing ${p(price, price)} inside chop is how you donate to market makers.`,
        r.rsi > 68 ? `RSI ${r.rsi} is stretched into the ${p(t.high24h, price)} highs, and the last three touches of that level rejected.` : `RSI ${r.rsi} shows no demand impulse; ${r.rangePos < 0.4 ? 'price is pinned near the lows' : 'the bid is thin above'} and the 24h change is ${t.change24h.toFixed(2)}%.`,
        `I want a close beyond ${p(t.high24h + atr * 0.15, price)} before anyone commits size. Until then the honest trade is smaller, or none.`
    ].join(' ');
    const action = r.bias === 'long' ? 'LONG' : r.bias === 'short' ? 'SHORT' : 'WAIT';
    const dir = action === 'SHORT' ? -1 : 1;
    const entry = price;
    const stop = action === 'WAIT' ? price - atr * 1.1 : entry - dir * atr * 1.1;
    const target = action === 'WAIT' ? price + atr * 2.2 : entry + dir * atr * 2.4;
    const riskReward = Math.abs(target - entry) / Math.max(Math.abs(entry - stop), 1e-9);
    const disagreement = Math.abs(r.rsi - 50) / 50;
    const sizeMultiplier = action === 'WAIT' ? 0 : Number((0.4 + disagreement * 0.6).toFixed(2));
    const confidence = Math.round(48 + disagreement * 34);
    const reasoning = action === 'WAIT' ? `Bull and Bear are both right about different timeframes. Range is only ${r.rangePct.toFixed(2)}% wide with RSI ${r.rsi} — no edge. Stand down and re-run on the next candle close.` : `Bull owns the structure (RSI ${r.rsi}, ${(r.rangePos * 100).toFixed(0)}% of range), Bear owns the regime (${r.rangePct.toFixed(2)}% compression). Verdict: take the ${action} at ${sizeMultiplier}x with stop ${p(stop, price)} and target ${p(target, price)} for ${riskReward.toFixed(2)}R.`;
    const risk = `Verdict: ${action} · entry ${p(entry, price)} · stop ${p(stop, price)} · target ${p(target, price)} · size ${sizeMultiplier}x · R:R ${riskReward.toFixed(2)}. ${reasoning}`;
    const trader = action === 'WAIT' ? `No order sent — logging a WAIT on ${t.label} and re-arming the watcher.` : `Paper ${action} ${t.label} filled at ${p(entry, price)}, ${sizeMultiplier}x size, OCO stop ${p(stop, price)} / target ${p(target, price)} live.`;
    return {
        messages: [
            {
                agent: 'bull',
                text: bull
            },
            {
                agent: 'bear',
                text: bear
            },
            {
                agent: 'risk',
                text: risk
            },
            {
                agent: 'trader',
                text: trader
            }
        ],
        decision: {
            action,
            entry: Number(entry.toFixed(6)),
            stop: Number(stop.toFixed(6)),
            target: Number(target.toFixed(6)),
            sizeMultiplier,
            confidence,
            riskReward: Number(riskReward.toFixed(2)),
            reasoning
        }
    };
}
}),
"[project]/atlas/atlas/src/pages/api/debate.ts [api] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>handler
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$localAgents$2e$ts__$5b$api$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/atlas/atlas/src/lib/atlas/localAgents.ts [api] (ecmascript)");
;
const MODEL = 'qwen-plus';
const QWEN_URL = process.env.QWEN_BASE_URL ?? 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1/chat/completions';
function apiKey() {
    return process.env.QWEN_API_KEY ?? process.env.NEXT_PUBLIC_QWEN_API_KEY ?? '';
}
async function qwen(messages, maxTokens = 320) {
    const ctrl = new AbortController();
    const timer = setTimeout(()=>ctrl.abort(), 25_000);
    try {
        const r = await fetch(QWEN_URL, {
            method: 'POST',
            signal: ctrl.signal,
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${apiKey()}`
            },
            body: JSON.stringify({
                model: MODEL,
                messages,
                temperature: 0.7,
                max_tokens: maxTokens
            })
        });
        if (!r.ok) throw new Error(`qwen ${r.status}: ${(await r.text()).slice(0, 200)}`);
        const body = await r.json();
        const text = body?.choices?.[0]?.message?.content?.trim();
        if (!text) throw new Error('qwen: empty completion');
        return text;
    } finally{
        clearTimeout(timer);
    }
}
function marketBrief(t) {
    return [
        `Instrument: ${t.label} (${t.symbol})`,
        `Last price: ${t.price}`,
        `24h change: ${t.change24h.toFixed(2)}%`,
        `24h high / low: ${t.high24h} / ${t.low24h}`,
        `24h volume (base): ${t.volume24h}`,
        `Data source: ${t.source}`
    ].join('\n');
}
function extractJson(text) {
    const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/i);
    const raw = fenced ? fenced[1] : text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1);
    if (!raw || !raw.includes('{')) return null;
    try {
        return JSON.parse(raw);
    } catch  {
        return null;
    }
}
function sanitize(d, t, fallback) {
    const action = d.action === 'LONG' || d.action === 'SHORT' || d.action === 'WAIT' ? d.action : fallback.action;
    const n = (v, alt)=>typeof v === 'number' && Number.isFinite(v) ? v : alt;
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
        reasoning: typeof d.reasoning === 'string' && d.reasoning.trim() ? d.reasoning.trim() : fallback.reasoning
    };
}
async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({
        error: 'POST only'
    });
    const ticker = req.body?.ticker;
    if (!ticker || typeof ticker.price !== 'number') {
        return res.status(400).json({
            error: 'ticker required'
        });
    }
    const started = Date.now();
    const local = (0, __TURBOPACK__imported__module__$5b$project$5d2f$atlas$2f$atlas$2f$src$2f$lib$2f$atlas$2f$localAgents$2e$ts__$5b$api$5d$__$28$ecmascript$29$__["localDebate"])(ticker);
    const brief = marketBrief(ticker);
    if (!apiKey()) {
        return res.status(200).json({
            symbol: ticker.symbol,
            price: ticker.price,
            source: 'local',
            model: 'atlas-local-agents',
            messages: local.messages.map((m, i)=>({
                    ...m,
                    ts: started + i
                })),
            decision: local.decision,
            latencyMs: Date.now() - started
        });
    }
    try {
        const bull = await qwen([
            {
                role: 'system',
                content: 'You are the Bull Agent on the Atlas trading desk. You argue the LONG case with conviction, always citing concrete levels from the data given. Never hedge into neutrality. 3 sentences max, no markdown, no bullet points.'
            },
            {
                role: 'user',
                content: `${brief}\n\nMake the long case. Include an entry, an invalidation level and a target.`
            }
        ]);
        const bear = await qwen([
            {
                role: 'system',
                content: 'You are the Bear Agent on the Atlas trading desk. You argue the SHORT or AVOID case with conviction, attacking the bull thesis on specifics. 3 sentences max, no markdown.'
            },
            {
                role: 'user',
                content: `${brief}\n\nThe Bull Agent said:\n"${bull}"\n\nRebut it and state what would have to happen before you would size up.`
            }
        ]);
        const riskRaw = await qwen([
            {
                role: 'system',
                content: 'You are the Risk Manager on the Atlas trading desk. You arbitrate the debate and reply with ONE JSON object and nothing else. Schema: {"action":"LONG"|"SHORT"|"WAIT","entry":number,"stop":number,"target":number,"sizeMultiplier":number,"confidence":number,"riskReward":number,"reasoning":string}. Prices must be absolute numbers in the instrument\'s quote currency, sizeMultiplier between 0 and 2 (0 for WAIT), confidence 1-99, reasoning max 2 sentences.'
            },
            {
                role: 'user',
                content: `${brief}\n\nBull:\n"${bull}"\n\nBear:\n"${bear}"\n\nReturn the verdict JSON only.`
            }
        ], 420);
        const decision = sanitize(extractJson(riskRaw) ?? {}, ticker, local.decision);
        let trader;
        try {
            trader = await qwen([
                {
                    role: 'system',
                    content: 'You are the Trader Agent. You log exactly one sentence describing the execution you just performed on the paper book. No markdown.'
                },
                {
                    role: 'user',
                    content: `Instrument ${ticker.label}. Verdict: ${JSON.stringify(decision)}. Write the execution log line.`
                }
            ], 120);
        } catch  {
            trader = local.messages[3].text;
        }
        const ts = Date.now();
        return res.status(200).json({
            symbol: ticker.symbol,
            price: ticker.price,
            source: 'qwen',
            model: MODEL,
            messages: [
                {
                    agent: 'bull',
                    text: bull,
                    ts: ts + 1
                },
                {
                    agent: 'bear',
                    text: bear,
                    ts: ts + 2
                },
                {
                    agent: 'risk',
                    text: `Verdict: ${decision.action} · entry ${decision.entry} · stop ${decision.stop} · target ${decision.target} · size ${decision.sizeMultiplier}x · R:R ${decision.riskReward}. ${decision.reasoning}`,
                    ts: ts + 3
                },
                {
                    agent: 'trader',
                    text: trader,
                    ts: ts + 4
                }
            ],
            decision,
            latencyMs: Date.now() - started
        });
    } catch  {
        return res.status(200).json({
            symbol: ticker.symbol,
            price: ticker.price,
            source: 'local',
            model: 'atlas-local-agents (qwen unavailable)',
            messages: local.messages.map((m, i)=>({
                    ...m,
                    ts: started + i
                })),
            decision: local.decision,
            latencyMs: Date.now() - started
        });
    }
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__1omam9_._.js.map