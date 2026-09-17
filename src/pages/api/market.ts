import type { NextApiRequest, NextApiResponse } from 'next';
import { getSymbol } from '@/lib/atlas/symbols';
import type { Ticker } from '@/lib/atlas/types';

const num = (v: unknown) => {
  const n = typeof v === 'string' ? Number.parseFloat(v) : typeof v === 'number' ? v : NaN;
  return Number.isFinite(n) ? n : NaN;
};

async function jsonFetch(url: string, init?: RequestInit, timeoutMs = 6000) {
  const ctrl = new AbortController();
  const t = setTimeout(() => ctrl.abort(), timeoutMs);
  try {
    const r = await fetch(url, { ...init, signal: ctrl.signal, cache: 'no-store' });
    if (!r.ok) throw new Error(`${r.status}`);
    return (await r.json()) as unknown;
  } finally {
    clearTimeout(t);
  }
}

/** 1 — Bitget v3 public tickers. */
async function bitgetV3(symbol: string) {
  const body = (await jsonFetch(
    `https://api.bitget.com/api/v3/market/tickers?category=SPOT&symbol=${symbol}`,
  )) as { data?: Array<Record<string, string>> };
  const d = body?.data?.[0];
  if (!d) return null;
  const price = num(d.lastPrice ?? d.lastPr);
  if (!Number.isFinite(price)) return null;
  return {
    price,
    change24h: num(d.price24hPcnt) * 100,
    high24h: num(d.highPrice24h ?? d.high24h),
    low24h: num(d.lowPrice24h ?? d.low24h),
    volume24h: num(d.volume24h ?? d.baseVolume),
    source: 'bitget-v3' as const,
  };
}

/** 2 — Bitget v2 spot tickers (kept as the closest sibling fallback). */
async function bitgetV2(symbol: string) {
  const body = (await jsonFetch(
    `https://api.bitget.com/api/v2/spot/market/tickers?symbol=${symbol}`,
  )) as { data?: Array<Record<string, string>> };
  const d = body?.data?.[0];
  if (!d) return null;
  const price = num(d.lastPr);
  if (!Number.isFinite(price)) return null;
  return {
    price,
    change24h: num(d.change24h) * 100,
    high24h: num(d.high24h),
    low24h: num(d.low24h),
    volume24h: num(d.baseVolume),
    source: 'bitget-v2' as const,
  };
}

/** 3 — CoinMarketCap (only when a key is present, it is not keyless). */
async function coinmarketcap(cmc?: string) {
  const key = process.env.CMC_API_KEY;
  if (!key || !cmc) return null;
  const body = (await jsonFetch(
    `https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=${cmc}&convert=USD`,
    { headers: { 'X-CMC_PRO_API_KEY': key } },
  )) as { data?: Record<string, { quote?: { USD?: Record<string, number> } }> };
  const q = body?.data?.[cmc]?.quote?.USD;
  if (!q || !Number.isFinite(q.price)) return null;
  const price = q.price as number;
  const change = q.percent_change_24h ?? 0;
  return {
    price,
    change24h: change,
    high24h: price * (1 + Math.abs(change) / 200),
    low24h: price * (1 - Math.abs(change) / 200),
    volume24h: q.volume_24h ?? 0,
    source: 'coinmarketcap' as const,
  };
}

/** 4 — CoinGecko public (keyless), crypto only. */
async function coingecko(id?: string) {
  if (!id) return null;
  const body = (await jsonFetch(
    `https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=usd&include_24hr_change=true&include_24hr_vol=true`,
  )) as Record<string, { usd?: number; usd_24h_change?: number; usd_24h_vol?: number }>;
  const d = body?.[id];
  if (!d?.usd) return null;
  const change = d.usd_24h_change ?? 0;
  return {
    price: d.usd,
    change24h: change,
    high24h: d.usd * (1 + Math.abs(change) / 200),
    low24h: d.usd * (1 - Math.abs(change) / 200),
    volume24h: d.usd_24h_vol ?? 0,
    source: 'coingecko' as const,
  };
}

/** 5 — Mock of last resort: stable, seeded wobble so the UI always renders. */
function mock(base: number) {
  const drift = Math.sin(Date.now() / 900_000) * 0.006;
  const price = base * (1 + drift);
  const change = drift * 100;
  return {
    price,
    change24h: change,
    high24h: price * 1.004,
    low24h: price * 0.995,
    volume24h: base * 12,
    source: 'mock' as const,
  };
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Ticker | { error: string }>) {
  const key = typeof req.query.symbol === 'string' ? req.query.symbol : 'BTC';
  const spec = getSymbol(key);

  type Quote = {
    price: number;
    change24h: number;
    high24h: number;
    low24h: number;
    volume24h: number;
    source: Ticker['source'];
  };

  const chain: Array<() => Promise<Quote | null>> = [
    () => bitgetV3(spec.bitget),
    () => bitgetV2(spec.bitget),
    () => coinmarketcap(spec.cmc),
    () => coingecko(spec.coingecko),
  ];

  for (const step of chain) {
    try {
      const q = await step();
      if (q && Number.isFinite(q.price)) {
        res.setHeader('Cache-Control', 'no-store');
        return res.status(200).json({
          symbol: spec.key,
          label: spec.label,
          price: q.price,
          change24h: Number.isFinite(q.change24h) ? q.change24h : 0,
          high24h: Number.isFinite(q.high24h) ? q.high24h : q.price * 1.004,
          low24h: Number.isFinite(q.low24h) ? q.low24h : q.price * 0.996,
          volume24h: Number.isFinite(q.volume24h) ? q.volume24h : 0,
          source: q.source,
          ts: Date.now(),
        });
      }
    } catch {
      // try the next source
    }
  }

  const q = mock(spec.fallbackPrice);
  res.setHeader('Cache-Control', 'no-store');
  return res.status(200).json({
    symbol: spec.key,
    label: spec.label,
    ...q,
    ts: Date.now(),
  });
}
