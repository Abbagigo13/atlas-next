'use client';

import { useEffect, useState } from 'react';
import type { Candle, CandleInterval, CandlesResponse } from './types';

const POLL_MS = 30_000;

export function useCandles(symbol: string, interval: CandleInterval) {
  const [candles, setCandles] = useState<Candle[]>([]);
  const [source, setSource] = useState<CandlesResponse['source'] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let alive = true;
    const load = async () => {
      try {
        const r = await fetch(
          `/api/candles?symbol=${encodeURIComponent(symbol)}&interval=${interval}`,
          { cache: 'no-store' },
        );
        if (!r.ok) return;
        const body = (await r.json()) as CandlesResponse;
        if (alive) {
          setCandles(body.candles);
          setSource(body.source);
          setLoading(false);
        }
      } catch {
        // keep whatever candles we already have on a failed poll
      }
    };
    setLoading(true);
    load();
    const id = window.setInterval(load, POLL_MS);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
  }, [symbol, interval]);

  return { candles, source, loading };
}