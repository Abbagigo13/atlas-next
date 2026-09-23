'use client';

import { fmtPrice, fmtTime, fmtUsd } from '@/lib/atlas/symbols';
import type { ClosedTrade, DebateRecord, Position } from '@/lib/atlas/types';

type Props = {
  records: DebateRecord[];
  positions: Position[];
  trades: ClosedTrade[];
};

function statusFor(record: DebateRecord, positions: Position[], trades: ClosedTrade[]) {
  if (record.decision.action === 'WAIT') return { label: 'No trade', tone: 'text-muted-foreground' };
  const match = (p: { symbol: string; entry: number; action: string }) =>
    p.symbol === record.symbol &&
    p.action === record.decision.action &&
    Math.abs(p.entry - record.decision.entry) < 1e-6;
  const open = positions.find(match);
  if (open) return { label: 'Open', tone: 'text-sky-300' };
  const closed = trades.find(match);
  if (closed) {
    const won = closed.pnl >= 0;
    return { label: `Closed ${won ? '+' : ''}${fmtUsd(closed.pnl)}`, tone: won ? 'text-emerald-400' : 'text-rose-400' };
  }
  return { label: 'Not executed', tone: 'text-muted-foreground' };
}

const ACTION_TONE: Record<string, string> = {
  LONG: 'border-emerald-400/35 bg-emerald-400/12 text-emerald-300',
  SHORT: 'border-rose-400/35 bg-rose-400/12 text-rose-300',
  WAIT: 'border-amber-300/35 bg-amber-300/12 text-amber-200',
};

export default function HistoryPanel({ records, positions, trades }: Props) {
  if (records.length === 0) {
    return (
      <div className="glass rounded-2xl p-8 text-center text-sm text-muted-foreground">
        No debates logged yet — run one from the Debate tab.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <div className="glass rounded-2xl p-4 text-xs text-muted-foreground">
        {records.length} debate{records.length === 1 ? '' : 's'} logged this session
      </div>
      {records.map((r) => {
        const status = statusFor(r, positions, trades);
        return (
          <div key={r.id} className="glass card-lift rounded-2xl p-5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="text-sm font-extrabold tracking-tight">{r.label}</span>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-bold ${ACTION_TONE[r.decision.action]}`}>
                  {r.decision.action}
                </span>
                <span className="text-xs text-muted-foreground">{fmtTime(r.ts)}</span>
              </div>
              <span className={`text-xs font-bold ${status.tone}`}>{status.label}</span>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-3 text-xs sm:grid-cols-4">
              <div>
                <p className="text-muted-foreground">Entry</p>
                <p className="font-semibold tabular-nums">{fmtPrice(r.decision.entry)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Stop</p>
                <p className="font-semibold tabular-nums text-rose-300">{fmtPrice(r.decision.stop)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Target</p>
                <p className="font-semibold tabular-nums text-emerald-300">{fmtPrice(r.decision.target)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Confidence</p>
                <p className="font-semibold tabular-nums">{r.decision.confidence}%</p>
              </div>
            </div>

            <p className="mt-3 text-xs leading-relaxed text-muted-foreground">{r.decision.reasoning}</p>

            <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>{r.source === 'qwen' ? r.model : 'local agents'}</span>
              <span>price at debate: {fmtPrice(r.price)}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}