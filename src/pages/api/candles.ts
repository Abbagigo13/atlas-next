import type { NextApiRequest, NextApiResponse } from 'next';
import { getSymbol } from '@/lib/atlas/symbols';
import type { Candle, CandleInterval, CandlesResponse } from '@/lib/atlas/types';

const num = (v: unknown) => {
  const n = typeof v === 'string' ? Number.parseFloat(v) : typeof v === 'number' ? v : NaN;
  return Number.isFinite(n) ? n : NaN;
};

async function jsonFetch(url: string, timeoutMs = 6000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(url, { signal: ctrl.signal, cache: 'no-store' });
    if (!r.ok) throw new Error(`${r.status}`);
    return (await r.json()) as unknown;
  } finally {
    clearTimeout(t);
  }
}

const BITGET_GRANULARITY: Record<CandleInterval, string> = {
  '15m': '15min',
  '1h': '1H',
  '4h': '4H',
  '1d': '1day',
};

const BITGET_LIMIT: Record<CandleInterval, number> = {
  '15m': 96,
  '1h': 100,
  '4h': 100,
  '1d': 90,
};

const COINGECKO_DAYS: Record<CandleInterval, number> = {
  '15m': 1,
  '1h': 7,
  '4h': 30,
  '1d': 90,
};

async function bitgetCandles(symbol: string, interval: CandleInterval): Promise<Candle[] | null> {
  const granularity = BITGET_GRANULARITY[interval];
  const limit = BITGET_LIMIT[interval];
  const body = (await jsonFetch(
    `https://api.bitget.com/api/v2/spot/market/candles?symbol=${symbol}&granularity=${granularity}&limit=${limit}`,
  )) as { data?: string[][] };
  const rows = body?.data;
  if (!rows || rows.length === 0) return null;
  const candles = rows
    .map((r) => ({ t: num(r[0]), o: num(r[1]), h: num(r[2]), l: num(r[3]), c: num(r[4]) }))
    .filter((c) => Number.isFinite(c.t) && Number.isFinite(c.c))
    .sort((a, b) => a.t - b.t);
  return candles.length > 0 ? candles : null;
}

async function coingeckoCandles(id: string, interval: CandleInterval): Promise<Candle[] | null> {
  const days = COINGECKO_DAYS[interval];
  const rows = (await jsonFetch(
    `https://api.coingecko.com/api/v3/coins/${id}/ohlc?vs_currency=usd&days=${days}`,
  )) as number[][];
  if (!Array.isArray(rows) || rows.length === 0) return null;
  return rows.map((r) => ({ t: r[0], o: r[1], h: r[2], l: r[3], c: r[4] }));
}

function mockCandles(base: number, interval: CandleInterval): Candle[] {
  const count = 80;
  const stepMs =
    interval === '15m' ? 15 * 60_000 : interval === '1h' ? 60 * 60_000 : interval === '4h' ? 4 * 60 * 60_000 : 24 * 60 * 60_000;
  const now = Date.now();
  let last = base * 0.985;
  const out: Candle[] = [];
  for (let i = count - 1; i >= 0; i--) {
    const t = now - i * stepMs;
    const drift = Math.sin(t / (stepMs * 9) + i) * base * 0.004;
    const o = last;
    const c = base + drift + (Math.random() - 0.5) * base * 0.002;
    const h = Math.max(o, c) + Math.random() * base * 0.0015;
    const l = Math.min(o, c) - Math.random() * base * 0.0015;
    out.push({ t, o, h, l, c });
    last = c;
  }
  return out;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<CandlesResponse | { error: string }>,
) {
  const key = typeof req.query.symbol === 'string' ? req.query.symbol : 'BTC';
  const rawInterval = typeof req.query.interval === 'string' ? req.query.interval : '15m';
  const safeInterval: CandleInterval = (['15m', '1h', '4h', '1d'] as const).includes(
    rawInterval as CandleInterval,
  )
    ? (rawInterval as CandleInterval)
    : '15m';
  const spec = getSymbol(key);

  try {
    const bg = await bitgetCandles(spec.bitget, safeInterval);
    if (bg) {
      res.setHeader('Cache-Control', 'no-store');
      return res.status(200).json({ symbol: spec.key, interval: safeInterval, candles: bg, source: 'bitget' });
    }
  } catch {
    // try next source
  }

  if (spec.coingecko) {
    try {
      const cg = await coingeckoCandles(spec.coingecko, safeInterval);
      if (cg) {
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json({ symbol: spec.key, interval: safeInterval, candles: cg, source: 'coingecko' });
      }
    } catch {
      // fall through to mock
    }
  }

  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    symbol: spec.key,
    interval: safeInterval,
    candles: mockCandles(spec.fallbackPrice, safeInterval),
    source: 'mock',
  });
}