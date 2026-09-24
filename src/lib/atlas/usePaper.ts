'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { getSymbol } from './symbols';
import {
  START_BALANCE,
  type ClosedTrade,
  type Decision,
  type PaperState,
  type Position,
  type Settings,
  type Ticker,
} from './types';

export const emptyState = (): PaperState => ({
  version: 1,
  balance: START_BALANCE,
  positions: [],
  trades: [],
  equity: [{ t: Date.now(), equity: START_BALANCE }],
  records: { bull: { wins: 0, losses: 0, calls: 0 }, bear: { wins: 0, losses: 0, calls: 0 }, risk: { wins: 0, losses: 0, calls: 0 } },
  settings: { paperTrading: true, autoExecute: false, speed: 'realistic', autoMode: false },
  lastMessages: {},
});

async function loadRemote(): Promise<PaperState> {
  try {
    const r = await fetch('/api/state', { cache: 'no-store' });
    if (!r.ok) return emptyState();
    const body = (await r.json()) as { paper: PaperState | null };
    const parsed = body.paper;
    if (!parsed || parsed.version !== 1) return emptyState();
    return { ...emptyState(), ...parsed, settings: { ...emptyState().settings, ...parsed.settings } };
  } catch {
    return emptyState();
  }
}

function persistKeyFor(s: PaperState): string {
  return JSON.stringify({ ...s, positions: s.positions.map(({ markPrice, ...rest }) => rest) });
}

const uid = () => `${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`;

export function usePaper() {
  const [state, setState] = useState<PaperState>(emptyState);
  const [hydrated, setHydrated] = useState(false);
  const stateRef = useRef(state);
  stateRef.current = state;
  const lastPersistKey = useRef<string | null>(null);

  useEffect(() => {
    let alive = true;
    loadRemote().then((s) => {
      if (!alive) return;
      setState(s);
      lastPersistKey.current = persistKeyFor(s);
      setHydrated(true);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    const key = persistKeyFor(state);
    if (lastPersistKey.current === key) return;
    const t = window.setTimeout(() => {
      lastPersistKey.current = key;
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paper: state }),
      }).catch(() => {});
    }, 1200);
    return () => window.clearTimeout(t);
  }, [state, hydrated]);

  const setSettings = useCallback((patch: Partial<Settings>) => {
    setState((s) => ({ ...s, settings: { ...s.settings, ...patch } }));
  }, []);

  const rememberMessage = useCallback((agent: keyof PaperState['lastMessages'], text: string) => {
    setState((s) => ({ ...s, lastMessages: { ...s.lastMessages, [agent]: text } }));
  }, []);

  /** Open a paper position from a decision. Risk-based sizing off current balance. */
  const execute = useCallback((decision: Decision, ticker: Ticker, override?: Partial<Decision>) => {
    const d = { ...decision, ...override };
    if (d.action === 'WAIT') return null;
    const spec = getSymbol(ticker.symbol);
    const notional = Math.max(
      Math.min(stateRef.current.balance * 0.25 * (d.sizeMultiplier || 1), stateRef.current.balance),
      1,
    );
    const qty = notional / d.entry;
    const position: Position = {
      id: uid(),
      symbol: spec.key,
      label: spec.label,
      action: d.action,
      entry: d.entry,
      stop: d.stop,
      target: d.target,
      qty,
      notional,
      sizeMultiplier: d.sizeMultiplier,
      openedAt: Date.now(),
      reasoning: d.reasoning,
      markPrice: ticker.price,
    };
    setState((s) => ({
      ...s,
      positions: [position, ...s.positions],
      records: {
        ...s.records,
        risk: { ...s.records.risk, calls: s.records.risk.calls + 1 },
        [d.action === 'LONG' ? 'bull' : 'bear']: {
          ...s.records[d.action === 'LONG' ? 'bull' : 'bear'],
          calls: s.records[d.action === 'LONG' ? 'bull' : 'bear'].calls + 1,
        },
      },
    }));
    return position;
  }, []);

  const closePosition = useCallback((id: string, exit: number, reason: ClosedTrade['reason']) => {
    setState((s) => {
      const pos = s.positions.find((p) => p.id === id);
      if (!pos) return s;
      const dir = pos.action === 'LONG' ? 1 : -1;
      const pnl = (exit - pos.entry) * pos.qty * dir;
      const pnlPct = ((exit - pos.entry) / pos.entry) * 100 * dir;
      const trade: ClosedTrade = {
        id: pos.id,
        symbol: pos.symbol,
        label: pos.label,
        action: pos.action,
        entry: pos.entry,
        exit,
        qty: pos.qty,
        pnl,
        pnlPct,
        openedAt: pos.openedAt,
        closedAt: Date.now(),
        reason,
      };
      const balance = s.balance + pnl;
      const won = pnl >= 0;
      const winner: 'bull' | 'bear' = pos.action === 'LONG' ? 'bull' : 'bear';
      const loser: 'bull' | 'bear' = pos.action === 'LONG' ? 'bear' : 'bull';
      return {
        ...s,
        balance,
        positions: s.positions.filter((p) => p.id !== id),
        trades: [trade, ...s.trades].slice(0, 200),
        equity: [...s.equity, { t: Date.now(), equity: balance }].slice(-400),
        records: {
          ...s.records,
          [winner]: {
            ...s.records[winner],
            wins: s.records[winner].wins + (won ? 1 : 0),
            losses: s.records[winner].losses + (won ? 0 : 1),
          },
          [loser]: {
            ...s.records[loser],
            wins: s.records[loser].wins + (won ? 0 : 1),
            losses: s.records[loser].losses + (won ? 1 : 0),
          },
          risk: {
            ...s.records.risk,
            wins: s.records.risk.wins + (won ? 1 : 0),
            losses: s.records.risk.losses + (won ? 0 : 1),
          },
        },
      };
    });
  }, []);

  /** Mark open positions to market and auto-close on stop / target. */
  const mark = useCallback(
    (prices: Record<string, number>) => {
      const hits: Array<{ id: string; exit: number; reason: ClosedTrade['reason'] }> = [];
      setState((s) => ({
        ...s,
        positions: s.positions.map((p) => {
          const px = prices[p.symbol];
          if (!px) return p;
          const long = p.action === 'LONG';
          const hitStop = long ? px <= p.stop : px >= p.stop;
          const hitTarget = long ? px >= p.target : px <= p.target;
          if (hitStop) hits.push({ id: p.id, exit: p.stop, reason: 'stop' });
          else if (hitTarget) hits.push({ id: p.id, exit: p.target, reason: 'target' });
          return { ...p, markPrice: px };
        }),
      }));
      hits.forEach((h) => closePosition(h.id, h.exit, h.reason));
      return hits.length;
    },
    [closePosition],
  );

  const reset = useCallback(() => setState(emptyState()), []);

  const stats = useMemo(() => {
    const unrealized = state.positions.reduce((acc, p) => {
      const dir = p.action === 'LONG' ? 1 : -1;
      return acc + (p.markPrice - p.entry) * p.qty * dir;
    }, 0);
    const equity = state.balance + unrealized;
    const wins = state.trades.filter((t) => t.pnl >= 0).length;
    const winRate = state.trades.length ? (wins / state.trades.length) * 100 : 0;
    const rets = state.trades.map((t) => t.pnlPct / 100);
    const mean = rets.length ? rets.reduce((a, b) => a + b, 0) / rets.length : 0;
    const variance = rets.length > 1 ? rets.reduce((a, b) => a + (b - mean) ** 2, 0) / (rets.length - 1) : 0;
    const sd = Math.sqrt(variance);
    const sharpe = sd > 0 ? (mean / sd) * Math.sqrt(252) : 0;
    return {
      unrealized,
      equity,
      totalReturnPct: ((equity - START_BALANCE) / START_BALANCE) * 100,
      winRate,
      sharpe,
      wins,
      losses: state.trades.length - wins,
    };
  }, [state.balance, state.positions, state.trades]);

  const curve = useMemo(() => {
    const live = [...state.equity];
    if (live.length && stats.equity !== live[live.length - 1].equity) {
      live.push({ t: Date.now(), equity: stats.equity });
    }
    return live;
  }, [state.equity, stats.equity]);

  return {
    state,
    hydrated,
    stats,
    curve,
    setSettings,
    execute,
    closePosition,
    mark,
    reset,
    rememberMessage,
  };
}
