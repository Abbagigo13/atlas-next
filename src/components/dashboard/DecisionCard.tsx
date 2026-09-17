'use client';

import { PencilLine, ShieldCheck, Zap } from 'lucide-react';
import { fmtPrice } from '@/lib/atlas/symbols';
import type { Decision, Ticker } from '@/lib/atlas/types';

type Props = {
  decision: Decision | null;
  ticker: Ticker | null;
  pending: boolean;
  executed: boolean;
  onExecute: () => void;
  onOverride: () => void;
};

const BADGE: Record<Decision['action'], string> = {
  LONG: 'border-emerald-400/40 bg-emerald-400/15 text-emerald-300',
  SHORT: 'border-rose-400/40 bg-rose-400/15 text-rose-300',
  WAIT: 'border-amber-300/40 bg-amber-300/15 text-amber-200',
};

function Cell({ label, value, tone = 'text-white' }: { label: string; value: string; tone?: string }) {
  return (
    <div className="min-w-0 rounded-xl border border-white/8 bg-white/[0.03] p-3">
      <p className="text-[10px] font-bold tracking-[0.16em] text-muted-foreground">{label}</p>
      <p className={`mt-1 truncate font-mono text-sm font-bold ${tone}`}>{value}</p>
    </div>
  );
}

export default function DecisionCard({
  decision,
  ticker,
  pending,
  executed,
  onExecute,
  onOverride,
}: Props) {
  if (!decision) {
    return (
      <div className="glass rounded-3xl p-6">
        <div className="flex items-center gap-2.5">
          <ShieldCheck className="h-4 w-4 text-amber-200" />
          <p className="text-[11px] font-bold tracking-[0.18em] text-muted-foreground">
            DECISION CARD
          </p>
        </div>
        <p className="mt-4 text-sm text-muted-foreground">
          {pending
            ? 'Risk Manager is still weighing the Bull and Bear cases…'
            : 'Run a debate to get a verdict. The Risk Manager returns entry, stop, target, size and reasoning as JSON.'}
        </p>
      </div>
    );
  }

  const rr = Math.min(decision.riskReward, 5);
  const rrPct = Math.min((rr / 4) * 100, 100);
  const ref = ticker?.price ?? decision.entry;

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
      <div className="hairline-top absolute inset-x-10 top-0 h-px" />

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`inline-flex shrink-0 items-center gap-2 rounded-full border px-3.5 py-1.5 text-sm font-extrabold tracking-wide ${BADGE[decision.action]}`}
          >
            {decision.action}
          </span>
          <span className="min-w-0 truncate text-sm font-semibold text-white/85">
            {ticker?.label ?? '—'} · size {decision.sizeMultiplier}x
          </span>
        </div>
        <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-semibold text-muted-foreground">
          conf {decision.confidence}%
        </span>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        <Cell label="ENTRY" value={fmtPrice(decision.entry)} />
        <Cell label="STOP" value={fmtPrice(decision.stop)} tone="text-rose-300" />
        <Cell label="TARGET" value={fmtPrice(decision.target)} tone="text-emerald-300" />
        <Cell label="R:R" value={`${decision.riskReward.toFixed(2)}R`} tone="text-signal-bright" />
      </div>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.16em] text-muted-foreground">
          <span>RISK / REWARD</span>
          <span className="font-mono">{decision.riskReward.toFixed(2)} : 1</span>
        </div>
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/8">
          <div
            className="h-full rounded-full bg-gradient-to-r from-signal to-signal-bright transition-[width] duration-700"
            style={{ width: `${Math.max(rrPct, 4)}%` }}
          />
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
        <p className="text-[10px] font-bold tracking-[0.16em] text-amber-200">RISK MANAGER REASONING</p>
        <p className="mt-2 text-sm leading-relaxed text-white/80">{decision.reasoning}</p>
      </div>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="button"
          onClick={onExecute}
          disabled={decision.action === 'WAIT' || executed}
          className={[
            'group inline-flex flex-1 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold tracking-wide text-white transition-all',
            decision.action === 'WAIT' || executed
              ? 'cursor-not-allowed border border-white/10 bg-white/5 text-muted-foreground'
              : 'btn-signal',
          ].join(' ')}
        >
          <Zap className="h-4 w-4" />
          {executed ? 'PAPER TRADE EXECUTED' : decision.action === 'WAIT' ? 'NOTHING TO EXECUTE' : 'EXECUTE PAPER TRADE'}
        </button>
        <button
          type="button"
          onClick={onOverride}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-5 py-3.5 text-sm font-semibold text-foreground transition-all hover:border-signal/50 hover:bg-white/[0.07]"
        >
          <PencilLine className="h-4 w-4" />
          Manual Override
        </button>
      </div>

      <p className="mt-3 text-[11px] text-muted-foreground">
        Mark price {fmtPrice(ref)} · sizing uses 25% of equity × {decision.sizeMultiplier}x
      </p>
    </div>
  );
}
