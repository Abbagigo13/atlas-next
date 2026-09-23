'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { AgentId, DebateMessage, DebateResult, Decision, Ticker } from './types';

const ORDER: AgentId[] = ['bull', 'bear', 'risk', 'trader'];

export type DebateStatus = 'idle' | 'thinking' | 'streaming' | 'done' | 'error';

export function useDebate(speed: 'instant' | 'realistic') {
  const [status, setStatus] = useState<DebateStatus>('idle');
  const [messages, setMessages] = useState<DebateMessage[]>([]);
  const [typing, setTyping] = useState<AgentId | null>(null);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [meta, setMeta] = useState<{ source: string; model: string; latencyMs: number; fellBack: boolean } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const runId = useRef(0);
  const timers = useRef<number[]>([]);

  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };

  useEffect(() => clearTimers, []);

  const stop = useCallback(() => {
    runId.current += 1;
    clearTimers();
    setTyping(null);
    setStatus((s) => (s === 'idle' ? 'idle' : 'done'));
  }, []);

  const run = useCallback(
    async (ticker: Ticker): Promise<DebateResult | null> => {
      runId.current += 1;
      const id = runId.current;
      clearTimers();
      setMessages([]);
      setDecision(null);
      setError(null);
      setStatus('thinking');
      setTyping('bull');

      try {
        const res = await fetch('/api/debate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ticker }),
        });
        if (!res.ok) throw new Error(`debate ${res.status}`);
        const data = (await res.json()) as DebateResult;
        if (id !== runId.current) return null;

                setMeta({ source: data.source, model: data.model, latencyMs: data.latencyMs, fellBack: data.fellBack });
        const ordered = [...data.messages].sort(
          (a, b) => ORDER.indexOf(a.agent) - ORDER.indexOf(b.agent),
        );

        if (speed === 'instant') {
          setMessages(ordered);
          setDecision(data.decision);
          setTyping(null);
          setStatus('done');
          return data;
        }

                setStatus('streaming');
        let cumulative = 0;
        ordered.forEach((msg, i) => {
          const delta =
            i === 0 ? 350 : Math.min(Math.max(msg.ts - ordered[i - 1].ts, 400), 3000);
          cumulative += delta;
          const t = window.setTimeout(() => {
            if (id !== runId.current) return;
            setMessages((prev) => [...prev, msg]);
            const next = ordered[i + 1];
            setTyping(next ? next.agent : null);
            if (msg.agent === 'risk') setDecision(data.decision);
            if (!next) setStatus('done');
          }, cumulative);
          timers.current.push(t);
        });
        return data;
      } catch (e) {
        if (id !== runId.current) return null;
        setError(e instanceof Error ? e.message : 'debate failed');
        setStatus('error');
        setTyping(null);
        return null;
      }
    },
    [speed],
  );

  const running = status === 'thinking' || status === 'streaming';

  return { status, running, messages, typing, decision, meta, error, run, stop };
}
