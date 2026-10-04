'use client';

import { useEffect, useState } from 'react';
import { START_BALANCE, type DebateRecord, type PaperState } from './types';

type LandingState = {
  latest: DebateRecord | null;
  totalReturnPct: number | null;
  loading: boolean;
};

export function useLatestDebate(): LandingState {
  const [state, setState] = useState<LandingState>({ latest: null, totalReturnPct: null, loading: true });

  useEffect(() => {
    let alive = true;
    fetch('/api/state', { cache: 'no-store' })
      .then((r) => (r.ok ? r.json() : null))
      .then((body: { paper: PaperState | null; history: DebateRecord[] } | null) => {
        if (!alive || !body) return;
        const latest = body.history?.[0] ?? null;
        let totalReturnPct: number | null = null;
        if (body.paper) {
          const unrealized = body.paper.positions.reduce((acc, p) => {
            const dir = p.action === 'LONG' ? 1 : -1;
            return acc + (p.markPrice - p.entry) * p.qty * dir;
          }, 0);
          const equity = body.paper.balance + unrealized;
          totalReturnPct = ((equity - START_BALANCE) / START_BALANCE) * 100;
        }
        setState({ latest, totalReturnPct, loading: false });
      })
      .catch(() => {
        if (alive) setState((s) => ({ ...s, loading: false }));
      });
    return () => {
      alive = false;
    };
  }, []);

  return state;
}