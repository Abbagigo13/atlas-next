'use client';

import { fmtPct, fmtPrice, fmtUsd } from '@/lib/atlas/symbols';
import type { ClosedTrade } from '@/lib/atlas/types';

const REASON: Record<ClosedTrade['reason'], string> = {
  target: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
  stop: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
  manual: 'border-white/12 bg-white/5 text-muted-foreground',
};

export default function TradeLogPanel({ trades }: { trades: ClosedTrade[] }) {
  const realized = trades.reduce((a, t) => a + t.pnl, 0);

  return (
    <div className="glass relative overflow-hidden rounded-3xl">
      <div className="hairline-top absolute inset-x-12 top-0 h-px" />
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4">
        <h2 className="text-sm font-bold tracking-wide text-white/85">Trade log</h2>
        <span className="font-mono text-[11px] text-muted-foreground">
          {trades.length} closed · realized{' '}
          <span className={realized >= 0 ? 'text-emerald-400' : 'text-rose-400'}>{fmtUsd(realized)}</span>
        </span>
      </div>

      {trades.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-muted-foreground">
          No closed trades yet. Positions land here when a stop or target is hit, or when you close them.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[42rem] text-left text-sm">
            <thead>
              <tr className="border-b border-white/8 text-[10px] font-bold tracking-[0.14em] text-muted-foreground">
                <th className="px-5 py-3">CLOSED</th>
                <th className="px-3 py-3">SYMBOL</th>
                <th className="px-3 py-3">SIDE</th>
                <th className="px-3 py-3">ENTRY → EXIT</th>
                <th className="px-3 py-3">EXIT REASON</th>
                <th className="px-5 py-3 text-right">P&amp;L</th>
              </tr>
            </thead>
            <tbody>
              {trades.map((t) => {
                const up = t.pnl >= 0;
                return (
                  <tr key={t.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-4 font-mono text-[12px] text-muted-foreground">
                      {new Date(t.closedAt).toLocaleString('en-GB', { hour12: false })}
                    </td>
                    <td className="px-3 py-4 font-semibold text-white">{t.label}</td>
                    <td className="px-3 py-4">
                      <span
                        className={[
                          'rounded-md px-2 py-0.5 font-mono text-[11px] font-bold',
                          t.action === 'LONG'
                            ? 'bg-emerald-400/15 text-emerald-300'
                            : 'bg-rose-400/15 text-rose-300',
                        ].join(' ')}
                      >
                        {t.action}
                      </span>
                    </td>
                    <td className="px-3 py-4 font-mono text-white/80">
                      {fmtPrice(t.entry)} → {fmtPrice(t.exit)}
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={`rounded-full border px-2.5 py-0.5 text-[10px] font-bold tracking-wider uppercase ${REASON[t.reason]}`}
                      >
                        {t.reason}
                      </span>
                    </td>
                    <td className={`px-5 py-4 text-right font-mono font-bold ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {fmtUsd(t.pnl)}
                      <span className="ml-1 text-[11px] font-semibold opacity-80">{fmtPct(t.pnlPct)}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
