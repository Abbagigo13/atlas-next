'use client';

import { useEffect, useRef, useState } from 'react';
import type { Ticker } from './types';

const POLL_MS = 15_000;

export function useWatchlist(symbols: string[]) {
  const [tickers, setTickers] = useState<Record<string, Ticker>>({});
  const symbolsRef = useRef(symbols);
  symbolsRef.current = symbols;

  useEffect(() => {
    let alive = true;
    const load = async () => {
      const keys = symbolsRef.current;
      const results = await Promise.all(
        keys.map(async (k) => {
          try {
            const r = await fetch(`/api/market?symbol=${encodeURIComponent(k)}`, { cache: 'no-store' });
            if (!r.ok) return null;
            return (await r.json()) as Ticker;
          } catch {
            return null;
          }
        }),
      );
      if (!alive) return;
      setTickers((prev) => {
        const next = { ...prev };
        results.forEach((t) => {
          if (t) next[t.symbol] = t;
        });
        return next;
      });
    };
    load();
    const id = window.setInterval(load, POLL_MS);
    return () => {
      alive = false;
      window.clearInterval(id);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [symbols.join(',')]);

  return tickers;
}