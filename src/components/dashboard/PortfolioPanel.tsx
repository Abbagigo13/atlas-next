'use client';

import { useMemo } from 'react';
import { START_BALANCE, type EquityPoint } from '@/lib/atlas/types';
import { fmtPct, fmtUsd } from '@/lib/atlas/symbols';

type Props = {
  curve: EquityPoint[];
  equity: number;
  totalReturnPct: number;
  winRate: number;
  sharpe: number;
  wins: number;
  losses: number;
  unrealized: number;
  balance: number;
};

function StatCard({
  label,
  value,
  sub,
  tone = 'text-gradient-signal',
}: {
  label: string;
  value: string;
  sub: string;
  tone?: string;
}) {
  return (
    <div className="glass card-lift min-w-0 rounded-2xl p-5">
      <p className="text-[10px] font-bold tracking-[0.18em] text-muted-foreground">{label}</p>
      <p className={`mt-2 truncate text-3xl font-extrabold tracking-tight tabular-nums ${tone}`}>{value}</p>
      <p className="mt-1 truncate text-xs text-muted-foreground">{sub}</p>
    </div>
  );
}

export default function PortfolioPanel({
  curve,
  equity,
  totalReturnPct,
  winRate,
  sharpe,
  wins,
  losses,
  unrealized,
  balance,
}: Props) {
  const chart = useMemo(() => {
    const W = 720;
    const H = 240;
    const pad = 8;
    const pts = curve.length > 1 ? curve : [...curve, { t: Date.now(), equity: curve[0]?.equity ?? START_BALANCE }];
    const values = pts.map((p) => p.equity);
    const min = Math.min(...values, START_BALANCE);
    const max = Math.max(...values, START_BALANCE);
    const span = max - min || Math.max(max * 0.02, 1);
    const x = (i: number) => pad + (i / Math.max(pts.length - 1, 1)) * (W - pad * 2);
    const y = (v: number) => H - pad - ((v - min) / span) * (H - pad * 2);
    const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(i).toFixed(1)},${y(p.equity).toFixed(1)}`).join(' ');
    const area = `${line} L${x(pts.length - 1).toFixed(1)},${H - pad} L${x(0).toFixed(1)},${H - pad} Z`;
    return { W, H, line, area, baseY: y(START_BALANCE), up: values[values.length - 1] >= START_BALANCE };
  }, [curve]);

  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="TOTAL RETURN"
          value={fmtPct(totalReturnPct)}
          sub={`${fmtUsd(equity)} equity · start ${fmtUsd(START_BALANCE, 0)}`}
          tone={totalReturnPct >= 0 ? 'text-emerald-400' : 'text-rose-400'}
        />
        <StatCard label="WIN RATE" value={`${winRate.toFixed(1)}%`} sub={`${wins}W / ${losses}L closed`} />
        <StatCard
          label="SHARPE"
          value={sharpe.toFixed(2)}
          sub="annualised from closed-trade returns"
        />
      </div>

      <div className="glass relative overflow-hidden rounded-3xl p-5">
        <div className="hairline-top absolute inset-x-12 top-0 h-px" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-sm font-bold tracking-wide text-white/85">Equity curve</h2>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted-foreground">
            <span>cash {fmtUsd(balance)}</span>
            <span className={unrealized >= 0 ? 'text-emerald-400' : 'text-rose-400'}>
              unrealized {fmtUsd(unrealized)}
            </span>
            <span>{curve.length} marks</span>
          </div>
        </div>

        <svg
          viewBox={`0 0 ${chart.W} ${chart.H}`}
          className="mt-4 h-56 w-full"
          preserveAspectRatio="none"
          role="img"
          aria-label="Equity curve"
        >
          <defs>
            <linearGradient id="atlas-eq" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#35D0E2" stopOpacity="0.35" />
              <stop offset="100%" stopColor="#35D0E2" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[0.25, 0.5, 0.75].map((f) => (
            <line
              key={f}
              x1="0"
              x2={chart.W}
              y1={chart.H * f}
              y2={chart.H * f}
              stroke="rgba(136,153,187,0.12)"
              strokeDasharray="4 6"
            />
          ))}
          <line
            x1="0"
            x2={chart.W}
            y1={chart.baseY}
            y2={chart.baseY}
            stroke="rgba(136,153,187,0.45)"
            strokeDasharray="2 4"
          />
          <path d={chart.area} fill="url(#atlas-eq)" />
          <path
            d={chart.line}
            fill="none"
            stroke={chart.up ? '#35D0E2' : '#fb7185'}
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <p className="mt-2 text-[11px] text-muted-foreground">
          Dashed line marks the {fmtUsd(START_BALANCE, 0)} starting balance. Curve extends on every close and
          mark-to-market tick.
        </p>
      </div>
    </div>
  );
}
