'use client';

import { useEffect, useState } from 'react';

const KEY = 'atlas.operator';
const SECRET = process.env.NEXT_PUBLIC_OPERATOR_KEY ?? '';

export function useOperator() {
  const [isOperator, setIsOperator] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const provided = params.get('operator');
    if (SECRET && provided === SECRET) {
      window.localStorage.setItem(KEY, '1');
    }
    setIsOperator(window.localStorage.getItem(KEY) === '1');
    setReady(true);
  }, []);

  return { isOperator, ready };
}