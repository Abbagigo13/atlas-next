'use client';

import { fmtPct, fmtPrice, fmtTime, fmtUsd } from '@/lib/atlas/symbols';
import type { Position } from '@/lib/atlas/types';

type Props = {
  positions: Position[];
  onClose: (id: string, exit: number) => void;
};

export default function PositionsPanel({ positions, onClose }: Props) {
  return (
    <div className="glass relative overflow-hidden rounded-3xl">
      <div className="hairline-top absolute inset-x-12 top-0 h-px" />
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4">
        <h2 className="text-sm font-bold tracking-wide text-white/85">Open positions</h2>
        <span className="font-mono text-[11px] text-muted-foreground">
          {positions.length} live · marked every 15s
        </span>
      </div>

      {positions.length === 0 ? (
        <p className="px-5 py-12 text-center text-sm text-muted-foreground">
          No open paper positions. Execute a verdict from the Debate panel.
        </p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead>
              <tr className="border-b border-white/8 text-[10px] font-bold tracking-[0.14em] text-muted-foreground">
                <th className="px-5 py-3">SYMBOL</th>
                <th className="px-3 py-3">SIDE</th>
                <th className="px-3 py-3">ENTRY</th>
                <th className="px-3 py-3">MARK</th>
                <th className="px-3 py-3">STOP / TARGET</th>
                <th className="px-3 py-3">SIZE</th>
                <th className="px-3 py-3">P&amp;L</th>
                <th className="px-5 py-3 text-right">ACTION</th>
              </tr>
            </thead>
            <tbody>
              {positions.map((p) => {
                const dir = p.action === 'LONG' ? 1 : -1;
                const pnl = (p.markPrice - p.entry) * p.qty * dir;
                const pnlPct = ((p.markPrice - p.entry) / p.entry) * 100 * dir;
                const up = pnl >= 0;
                return (
                  <tr key={p.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.02]">
                    <td className="px-5 py-4">
                      <p className="font-semibold text-white">{p.label}</p>
                      <p className="font-mono text-[11px] text-muted-foreground">{fmtTime(p.openedAt)}</p>
                    </td>
                    <td className="px-3 py-4">
                      <span
                        className={[
                          'rounded-md px-2 py-0.5 font-mono text-[11px] font-bold',
                          p.action === 'LONG'
                            ? 'bg-emerald-400/15 text-emerald-300'
                            : 'bg-rose-400/15 text-rose-300',
                        ].join(' ')}
                      >
                        {p.action}
                      </span>
                    </td>
                    <td className="px-3 py-4 font-mono text-white/85">{fmtPrice(p.entry)}</td>
                    <td className="px-3 py-4 font-mono text-white/85">{fmtPrice(p.markPrice)}</td>
                    <td className="px-3 py-4 font-mono text-[12px]">
                      <span className="text-rose-300/90">{fmtPrice(p.stop)}</span>
                      <span className="text-muted-foreground"> / </span>
                      <span className="text-emerald-300/90">{fmtPrice(p.target)}</span>
                    </td>
                    <td className="px-3 py-4 font-mono text-white/70">
                      {p.sizeMultiplier}x · {fmtUsd(p.notional)}
                    </td>
                    <td className={`px-3 py-4 font-mono font-bold ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {fmtUsd(pnl)}
                      <span className="ml-1 text-[11px] font-semibold opacity-80">{fmtPct(pnlPct)}</span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <button
                        type="button"
                        onClick={() => onClose(p.id, p.markPrice)}
                        className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs font-semibold transition-colors hover:border-rose-400/50 hover:text-rose-300"
                      >
                        Close
                      </button>
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
