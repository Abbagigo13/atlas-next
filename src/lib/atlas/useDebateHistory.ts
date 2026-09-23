'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import type { DebateRecord } from './types';

const KEY = 'atlas.debates.v1';
const MAX = 100;

function load(): DebateRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function useDebateHistory() {
  const [records, setRecords] = useState<DebateRecord[]>([]);
  const hydrated = useRef(false);

  useEffect(() => {
    setRecords(load());
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    try {
      window.localStorage.setItem(KEY, JSON.stringify(records));
    } catch {
      /* quota — ignore */
    }
  }, [records]);

  const add = useCallback((record: DebateRecord) => {
    setRecords((prev) => [record, ...prev].slice(0, MAX));
  }, []);

  return { records, add };
}