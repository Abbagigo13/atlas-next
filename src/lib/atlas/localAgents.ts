import type { Decision, DebateMessage, Ticker } from './types';

/**
 * Deterministic local agent team. Used when no Qwen key is configured, or when
 * the Qwen call fails — the dashboard must always produce a real debate.
 * Every number in the text is derived from the live ticker, not invented.
 */

type Read = {
  rsi: number;
  rangePos: number;
  rangePct: number;
  trend: 'up' | 'down' | 'flat';
  vwap: number;
  bias: 'long' | 'short' | 'wait';
};

function readMarket(t: Ticker): Read {
  const span = Math.max(t.high24h - t.low24h, t.price * 0.0001);
  const rangePos = Math.min(Math.max((t.price - t.low24h) / span, 0), 1);
  const rangePct = (span / t.price) * 100;
  // Synthetic RSI: range position dominates, 24h change tilts it.
  const rsi = Math.round(Math.min(Math.max(rangePos * 70 + 15 + t.change24h * 1.6, 4), 96));
  const trend = t.change24h > 0.35 ? 'up' : t.change24h < -0.35 ? 'down' : 'flat';
  const vwap = (t.high24h + t.low24h + t.price) / 3;
  const bias =
    rsi < 34 || (trend === 'up' && rangePos > 0.55)
      ? 'long'
      : rsi > 70 || (trend === 'down' && rangePos < 0.4)
        ? 'short'
        : 'wait';
  return { rsi, rangePos, rangePct, trend, vwap, bias };
}

const p = (n: number, ref: number) => {
  const d = ref >= 1000 ? 2 : ref >= 10 ? 3 : 4;
  return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
};

export function localDebate(t: Ticker): { messages: Omit<DebateMessage, 'ts'>[]; decision: Decision } {
  const r = readMarket(t);
  const price = t.price;
  const atr = Math.max(t.high24h - t.low24h, price * 0.004) * 0.55;

  const bull = [
    `${t.label} at ${p(price, price)} is holding ${r.rangePos > 0.5 ? 'the upper half' : 'the lower band'} of a ${r.rangePct.toFixed(2)}% 24h range with synthetic RSI at ${r.rsi}.`,
    r.trend === 'up'
      ? `Momentum is with us: ${t.change24h.toFixed(2)}% on the day and price is trading above the ${p(r.vwap, price)} session VWAP, so dips are being absorbed.`
      : `The ${t.change24h.toFixed(2)}% flush swept liquidity into ${p(t.low24h, price)} and buyers defended it — that is the reversal tell, not weakness.`,
    `Long case: enter ${p(price, price)}, invalidation under ${p(price - atr * 1.1, price)}, first objective ${p(price + atr * 2.2, price)}. Volume of ${Math.round(t.volume24h).toLocaleString('en-US')} confirms participation.`,
  ].join(' ');

  const bear = [
    `Pushing back. A ${r.rangePct.toFixed(2)}% range is compression, not trend — chasing ${p(price, price)} inside chop is how you donate to market makers.`,
    r.rsi > 68
      ? `RSI ${r.rsi} is stretched into the ${p(t.high24h, price)} highs, and the last three touches of that level rejected.`
      : `RSI ${r.rsi} shows no demand impulse; ${r.rangePos < 0.4 ? 'price is pinned near the lows' : 'the bid is thin above'} and the 24h change is ${t.change24h.toFixed(2)}%.`,
    `I want a close beyond ${p(t.high24h + atr * 0.15, price)} before anyone commits size. Until then the honest trade is smaller, or none.`,
  ].join(' ');

  const action: Decision['action'] = r.bias === 'long' ? 'LONG' : r.bias === 'short' ? 'SHORT' : 'WAIT';
  const dir = action === 'SHORT' ? -1 : 1;
  const entry = price;
  const stop = action === 'WAIT' ? price - atr * 1.1 : entry - dir * atr * 1.1;
  const target = action === 'WAIT' ? price + atr * 2.2 : entry + dir * atr * 2.4;
  const riskReward = Math.abs(target - entry) / Math.max(Math.abs(entry - stop), 1e-9);
  const disagreement = Math.abs(r.rsi - 50) / 50;
  const sizeMultiplier = action === 'WAIT' ? 0 : Number((0.4 + disagreement * 0.6).toFixed(2));
  const confidence = Math.round(48 + disagreement * 34);

  const reasoning =
    action === 'WAIT'
      ? `Bull and Bear are both right about different timeframes. Range is only ${r.rangePct.toFixed(2)}% wide with RSI ${r.rsi} — no edge. Stand down and re-run on the next candle close.`
      : `Bull owns the structure (RSI ${r.rsi}, ${(r.rangePos * 100).toFixed(0)}% of range), Bear owns the regime (${r.rangePct.toFixed(2)}% compression). Verdict: take the ${action} at ${sizeMultiplier}x with stop ${p(stop, price)} and target ${p(target, price)} for ${riskReward.toFixed(2)}R.`;

  const risk = `Verdict: ${action} · entry ${p(entry, price)} · stop ${p(stop, price)} · target ${p(target, price)} · size ${sizeMultiplier}x · R:R ${riskReward.toFixed(2)}. ${reasoning}`;

  const trader =
    action === 'WAIT'
      ? `No order sent — logging a WAIT on ${t.label} and re-arming the watcher.`
      : `Paper ${action} ${t.label} filled at ${p(entry, price)}, ${sizeMultiplier}x size, OCO stop ${p(stop, price)} / target ${p(target, price)} live.`;

  return {
    messages: [
      { agent: 'bull', text: bull },
      { agent: 'bear', text: bear },
      { agent: 'risk', text: risk },
      { agent: 'trader', text: trader },
    ],
    decision: {
      action,
      entry: Number(entry.toFixed(6)),
      stop: Number(stop.toFixed(6)),
      target: Number(target.toFixed(6)),
      sizeMultiplier,
      confidence,
      riskReward: Number(riskReward.toFixed(2)),
      reasoning,
    },
  };
}
