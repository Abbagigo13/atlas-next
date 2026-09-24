'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { DebateRecord } from './types';

const MAX = 100;

async function loadRemote(): Promise<DebateRecord[]> {
  try {
    const r = await fetch('/api/state', { cache: 'no-store' });
    if (!r.ok) return [];
    const body = (await r.json()) as { history: DebateRecord[] };
    return Array.isArray(body.history) ? body.history : [];
  } catch {
    return [];
  }
}

export function useDebateHistory() {
  const [records, setRecords] = useState<DebateRecord[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    let alive = true;
    loadRemote().then((r) => {
      if (!alive) return;
      setRecords(r);
      hydrated.current = true;
    });
    return () => {
      alive = false;
    };
  }, []);

  const add = useCallback((record: DebateRecord) => {
    setRecords((prev) => {
      const next = [record, ...prev].slice(0, MAX);
      fetch('/api/state', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history: next }),
      }).catch(() => {});
      return next;
    });
  }, []);

  return { records, add };
}