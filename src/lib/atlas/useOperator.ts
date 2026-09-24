'use client';

import { useEffect, useState } from 'react';

const KEY = 'atlas.operator';

export function useOperator() {
  const [isOperator, setIsOperator] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('operator') === '1') {
      window.localStorage.setItem(KEY, '1');
    }
    setIsOperator(window.localStorage.getItem(KEY) === '1');
    setReady(true);
  }, []);

  return { isOperator, ready };
}