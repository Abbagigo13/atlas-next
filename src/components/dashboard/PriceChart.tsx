'use client';

import { useMemo, useState } from 'react';
import { useCandles } from '@/lib/atlas/useCandles';
import { fmtPrice, fmtPct } from '@/lib/atlas/symbols';
import type { CandleInterval, Ticker } from '@/lib/atlas/types';

type Props = {
  symbol: string;
  symbolLabel: string;
  ticker: Ticker | null;
};

const INTERVALS: { id: CandleInterval; label: string }[] = [
  { id: '15m', label: '15m' },
  { id: '1h', label: '1H' },
  { id: '4h', label: '4H' },
  { id: '1d', label: '1D' },
];

export default function PriceChart({ symbol, symbolLabel, ticker }: Props) {
  const [interval, setInterval] = useState<CandleInterval>('15m');
  const { candles, source, loading } = useCandles(symbol, interval);

  const chart = useMemo(() => {
    const W = 760;
    const H = 260;
    const padL = 8;
    const padR = 8;
    const padY = 14;
    if (candles.length === 0) return null;

    const highs = candles.map((c) => c.h);
    const lows = candles.map((c) => c.l);
    const max = Math.max(...highs);
    const min = Math.min(...lows);
    const span = max - min || max * 0.01 || 1;

    const slot = (W - padL - padR) / candles.length;
    const bodyW = Math.max(2, Math.min(10, slot * 0.6));

    const y = (v: number) => padY + (1 - (v - min) / span) * (H - padY * 2);
    const x = (i: number) => padL + i * slot + slot / 2;

    const bars = candles.map((c, i) => {
      const up = c.c >= c.o;
      return {
        cx: x(i),
        wickTop: y(c.h),
        wickBottom: y(c.l),
        bodyTop: y(Math.max(c.o, c.c)),
        bodyHeight: Math.max(1, y(Math.min(c.o, c.c)) - y(Math.max(c.o, c.c))),
        up,
      };
    });

    const last = candles[candles.length - 1];
    return { W, H, bars, bodyW, lastY: y(last.c) };
  }, [candles]);

  return (
    <div className="glass card-lift rounded-2xl p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-[10px] font-bold tracking-[0.18em] text-muted-foreground">PRICE CHART</p>
          <div className="mt-1 flex items-baseline gap-2">
            <span className="text-lg font-extrabold tracking-tight">{symbolLabel}</span>
            {ticker && (
              <span className="text-sm font-semibold tabular-nums text-muted-foreground">
                {fmtPrice(ticker.price)}{' '}
                <span className={ticker.change24h >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
                  {fmtPct(ticker.change24h)}
                </span>
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-white/10 bg-white/[0.03] p-1">
          {INTERVALS.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => setInterval(opt.id)}
              className={`rounded-full px-3 py-1 text-xs font-bold transition ${
                interval === opt.id ? 'bg-sky-400/20 text-sky-300' : 'text-muted-foreground hover:text-white'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-4">
        {!chart ? (
          <div className="flex h-[260px] items-center justify-center text-sm text-muted-foreground">
            {loading ? 'Loading chart…' : 'No chart data'}
          </div>
        ) : (
          <svg viewBox={`0 0 ${chart.W} ${chart.H}`} className="h-[260px] w-full">
            {[0, 0.25, 0.5, 0.75, 1].map((f) => (
              <line
                key={f}
                x1={0}
                x2={chart.W}
                y1={14 + f * (chart.H - 28)}
                y2={14 + f * (chart.H - 28)}
                stroke="rgba(255,255,255,0.06)"
                strokeWidth={1}
              />
            ))}
            <line
              x1={0}
              x2={chart.W}
              y1={chart.lastY}
              y2={chart.lastY}
              stroke="rgba(56,189,248,0.5)"
              strokeDasharray="4 4"
              strokeWidth={1}
            />
            {chart.bars.map((b, i) => (
              <g key={i}>
                <line
                  x1={b.cx}
                  x2={b.cx}
                  y1={b.wickTop}
                  y2={b.wickBottom}
                  stroke={b.up ? '#34d399' : '#fb7185'}
                  strokeWidth={1}
                />
                <rect
                  x={b.cx - chart.bodyW / 2}
                  y={b.bodyTop}
                  width={chart.bodyW}
                  height={b.bodyHeight}
                  fill={b.up ? '#34d399' : '#fb7185'}
                  opacity={0.9}
                  rx={1}
                />
              </g>
            ))}
          </svg>
        )}
      </div>

      <div className="mt-2 flex items-center justify-between text-[10px] text-muted-foreground">
        <span>{candles.length > 0 ? `${candles.length} candles` : ''}</span>
        <span>{source ? `source: ${source}` : ''}</span>
      </div>
    </div>
  );
}