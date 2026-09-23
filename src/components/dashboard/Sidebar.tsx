'use client';

import {
  Activity,
  BarChart3,
  History,
  MessagesSquare,
  Settings as SettingsIcon,
  Triangle,
  Users,
  Wallet,
  X,
} from 'lucide-react';
import Link from 'next/link';
import type { LucideIcon } from 'lucide-react';

export type PanelId = 'debate' | 'positions' | 'log' | 'history' | 'portfolio' | 'agents' | 'settings';

export const PANELS: Array<{ id: PanelId; label: string; icon: LucideIcon }> = [
  { id: 'debate', label: 'Debate', icon: MessagesSquare },
  { id: 'positions', label: 'Open Positions', icon: Activity },
  { id: 'log', label: 'Trade Log', icon: BarChart3 },
  { id: 'history', label: 'History', icon: History },
  { id: 'portfolio', label: 'Portfolio', icon: Wallet },
  { id: 'agents', label: 'Agents', icon: Users },
  { id: 'settings', label: 'Settings', icon: SettingsIcon },
];

type Props = {
  active: PanelId;
  onSelect: (id: PanelId) => void;
  open: boolean;
  onClose: () => void;
  counts: { positions: number; trades: number };
  equity: string;
  returnPct: string;
  returnUp: boolean;
};

export default function Sidebar({
  active,
  onSelect,
  open,
  onClose,
  counts,
  equity,
  returnPct,
  returnUp,
}: Props) {
  const body = (
    <div className="flex h-full flex-col gap-6 p-5">
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="group flex min-w-0 items-center gap-2.5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-signal/40 bg-signal/10 transition-colors group-hover:border-signal-bright/70">
            <Triangle className="h-4 w-4 fill-signal-bright text-signal-bright" />
          </span>
          <span className="min-w-0">
            <span className="block truncate text-base font-extrabold tracking-tight">Atlas</span>
            <span className="block truncate text-[10px] font-semibold tracking-[0.16em] text-muted-foreground">
              CONTROL ROOM
            </span>
          </span>
        </Link>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close menu"
          className="grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground lg:hidden"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <div className="glass rounded-2xl p-4">
        <p className="text-[10px] font-bold tracking-[0.18em] text-muted-foreground">EQUITY</p>
        <p className="mt-1 font-mono text-xl font-bold text-white">{equity}</p>
        <p className={`mt-0.5 font-mono text-xs font-semibold ${returnUp ? 'text-emerald-400' : 'text-rose-400'}`}>
          {returnPct} all time
        </p>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        {PANELS.map((panel) => {
          const isActive = panel.id === active;
          const badge =
            panel.id === 'positions' ? counts.positions : panel.id === 'log' ? counts.trades : 0;
          return (
            <button
              key={panel.id}
              type="button"
              onClick={() => {
                onSelect(panel.id);
                onClose();
              }}
              className={[
                'group flex items-center gap-3 rounded-xl px-3.5 py-3 text-sm font-semibold transition-all duration-200',
                isActive
                  ? 'border border-signal/35 bg-signal/12 text-white'
                  : 'border border-transparent text-muted-foreground hover:bg-white/5 hover:text-foreground',
              ].join(' ')}
            >
              <panel.icon
                className={`h-4 w-4 shrink-0 ${isActive ? 'text-signal-bright' : 'text-muted-foreground group-hover:text-signal-bright'}`}
              />
              <span className="min-w-0 flex-1 truncate text-left">{panel.label}</span>
              {badge > 0 && (
                <span className="shrink-0 rounded-full bg-white/10 px-2 py-0.5 font-mono text-[10px] font-bold text-white/80">
                  {badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div className="rounded-2xl border border-white/8 bg-white/2 p-4">
        <p className="flex items-center gap-2 text-[11px] font-semibold text-muted-foreground">
          <span className="pulse-ring-green h-1.5 w-1.5 rounded-full bg-emerald-400" />
          Paper book · no real funds
        </p>
        <Link
          href="/"
          className="mt-3 inline-flex text-[11px] font-semibold text-signal-bright hover:underline"
        >
          ← Back to landing page
        </Link>
      </div>
    </div>
  );

  return (
    <>
      <aside className="glass sticky top-0 hidden h-screen w-66 shrink-0 border-r border-white/8 lg:block">
        {body}
      </aside>

      <div
        className={[
          'fixed inset-0 z-70 lg:hidden',
          open ? 'pointer-events-auto' : 'pointer-events-none',
        ].join(' ')}
        aria-hidden={!open}
      >
        <div
          onClick={onClose}
          className={`absolute inset-0 bg-black/65 backdrop-blur-sm transition-opacity duration-300 ${open ? 'opacity-100' : 'opacity-0'}`}
        />
        <div
          className={[
            'absolute inset-y-0 left-0 w-68 max-w-[85vw] border-r border-white/10 bg-[#0b1120]/98 backdrop-blur-2xl transition-transform duration-300',
            open ? 'translate-x-0' : '-translate-x-full',
          ].join(' ')}
        >
          {body}
        </div>
      </div>
    </>
  );
}
