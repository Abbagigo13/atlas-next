'use client';

import { useWatchlist } from '@/lib/atlas/useWatchlist';
import { WATCHLIST_GROUPS } from '@/lib/atlas/watchlist';
import { fmtPct, fmtPrice, getSymbol } from '@/lib/atlas/symbols';

type Props = {
  active: string;
  onSelect: (key: string) => void;
};

const ALL_KEYS = WATCHLIST_GROUPS.flatMap((g) => g.keys);

export default function Watchlist({ active, onSelect }: Props) {
  const tickers = useWatchlist(ALL_KEYS);

  return (
    <div className="glass rounded-2xl p-4">
      {WATCHLIST_GROUPS.map((group) => (
        <div key={group.label} className="mb-3 last:mb-0">
          <p className="mb-2 text-[10px] font-bold tracking-[0.18em] text-muted-foreground">
            {group.label.toUpperCase()}
          </p>
          <div className="flex flex-wrap gap-2">
            {group.keys.map((key) => {
              const spec = getSymbol(key);
              const t = tickers[key];
              const isActive = key === active;
              const up = (t?.change24h ?? 0) >= 0;
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => onSelect(key)}
                  className={`min-w-32 flex-1 rounded-xl border px-3 py-2 text-left transition sm:flex-none ${
                    isActive
                      ? 'border-sky-400/40 bg-sky-400/10'
                      : 'border-white/10 bg-white/2 hover:border-white/20'
                  }`}
                >
                  <p className="text-xs font-bold tracking-tight">{spec.label}</p>
                  {t ? (
                    <div className="mt-1 flex items-baseline gap-1.5">
                      <span className="text-sm font-semibold tabular-nums">{fmtPrice(t.price)}</span>
                      <span className={`text-[11px] font-bold tabular-nums ${up ? 'text-emerald-400' : 'text-rose-400'}`}>
                        {fmtPct(t.change24h)}
                      </span>
                    </div>
                  ) : (
                    <p className="mt-1 text-[11px] text-muted-foreground">loading…</p>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}