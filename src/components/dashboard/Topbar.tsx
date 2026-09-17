'use client';

import { ChevronDown, Menu, Play, RefreshCw, Square, Timer, Zap } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { SYMBOLS, fmtPct, fmtPrice } from '@/lib/atlas/symbols';
import type { Settings, Ticker } from '@/lib/atlas/types';

type Props = {
  symbol: string;
  onSymbol: (key: string) => void;
  ticker: Ticker | null;
  running: boolean;
  onStart: () => void;
  onStop: () => void;
  onRefresh: () => void;
  settings: Settings;
  onSettings: (patch: Partial<Settings>) => void;
  onOpenMenu: () => void;
  title: string;
};

export default function Topbar({
  symbol,
  onSymbol,
  ticker,
  running,
  onStart,
  onStop,
  onRefresh,
  settings,
  onSettings,
  onOpenMenu,
  title,
}: Props) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, []);

  const up = (ticker?.change24h ?? 0) >= 0;

  return (
    <header className="sticky top-0 z-40 border-b border-white/8 bg-[#0A0E1A]/85 backdrop-blur-xl">
      <div className="flex flex-col gap-3 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenMenu}
            aria-label="Open menu"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-signal/40 lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <h1 className="truncate text-base font-bold tracking-tight sm:text-lg">{title}</h1>
            <p className="truncate text-[11px] text-muted-foreground">
              {ticker ? (
                <>
                  <span className="font-mono text-white/80">{fmtPrice(ticker.price)}</span>{' '}
                  <span className={`font-mono ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
                    {fmtPct(ticker.change24h)}
                  </span>{' '}
                  · H {fmtPrice(ticker.high24h)} · L {fmtPrice(ticker.low24h)} · {ticker.source}
                </>
              ) : (
                'loading market data…'
              )}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* symbol dropdown */}
          <div ref={boxRef} className="relative">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.04] px-3.5 py-2.5 text-sm font-semibold transition-colors hover:border-signal/45"
            >
              <span className="font-mono">{symbol}</span>
              <ChevronDown className={`h-4 w-4 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>
            {open && (
              <div className="glass absolute right-0 z-50 mt-2 w-52 overflow-hidden rounded-2xl p-1.5 shadow-2xl">
                {SYMBOLS.map((s) => (
                  <button
                    key={s.key}
                    type="button"
                    onClick={() => {
                      onSymbol(s.key);
                      setOpen(false);
                    }}
                    className={[
                      'flex w-full items-center justify-between gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-colors',
                      s.key === symbol ? 'bg-signal/15 text-white' : 'text-muted-foreground hover:bg-white/5 hover:text-white',
                    ].join(' ')}
                  >
                    <span className="font-mono font-semibold">{s.key}</span>
                    <span className="text-[11px]">{s.kind === 'crypto' ? 'crypto' : 'tokenized'}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* speed */}
          <div className="inline-flex overflow-hidden rounded-xl border border-white/12 bg-white/[0.04]">
            {(['instant', 'realistic'] as const).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => onSettings({ speed: s })}
                className={[
                  'inline-flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold capitalize transition-colors',
                  settings.speed === s ? 'bg-signal/20 text-white' : 'text-muted-foreground hover:text-white',
                ].join(' ')}
              >
                {s === 'instant' ? <Zap className="h-3.5 w-3.5" /> : <Timer className="h-3.5 w-3.5" />}
                {s}
              </button>
            ))}
          </div>

          {/* auto mode */}
          <button
            type="button"
            onClick={() => onSettings({ autoMode: !settings.autoMode })}
            className={[
              'inline-flex items-center gap-2 rounded-xl border px-3.5 py-2.5 text-xs font-bold tracking-wide transition-colors',
              settings.autoMode
                ? 'border-emerald-400/45 bg-emerald-400/12 text-emerald-300'
                : 'border-white/12 bg-white/[0.04] text-muted-foreground hover:text-white',
            ].join(' ')}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${settings.autoMode ? 'pulse-ring-green bg-emerald-400' : 'bg-muted-foreground'}`}
            />
            AUTO {settings.autoMode ? 'ON' : 'OFF'}
          </button>

          <button
            type="button"
            onClick={onRefresh}
            aria-label="Refresh market data"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/12 bg-white/[0.04] text-muted-foreground transition-colors hover:border-signal/45 hover:text-white"
          >
            <RefreshCw className="h-4 w-4" />
          </button>

          {running ? (
            <button
              type="button"
              onClick={onStop}
              className="inline-flex items-center gap-2 rounded-xl border border-rose-400/40 bg-rose-400/12 px-4 py-2.5 text-sm font-bold text-rose-200 transition-colors hover:bg-rose-400/20"
            >
              <Square className="h-4 w-4" />
              Stop
            </button>
          ) : (
            <button
              type="button"
              onClick={onStart}
              className="btn-signal inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold text-white"
            >
              <Play className="h-4 w-4" />
              Start Debate
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
