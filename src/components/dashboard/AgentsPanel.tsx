'use client';

import { AGENTS, type AgentRecord, type PaperState } from '@/lib/atlas/types';

type Props = {
  records: PaperState['records'];
  lastMessages: PaperState['lastMessages'];
};

const PROFILES: Array<{
  id: 'bull' | 'bear' | 'risk';
  personality: string;
  mandate: string;
}> = [
  {
    id: 'bull',
    personality: 'Optimist · conviction long',
    mandate:
      'Scans for breakouts, momentum shifts and oversold bounces. Must name an entry, an invalidation and a target in every argument.',
  },
  {
    id: 'bear',
    personality: 'Skeptic · conviction short / avoid',
    mandate:
      'Attacks the long thesis on specifics — exhaustion, resistance rejections, macro Risk-Off — and states what would change its mind.',
  },
  {
    id: 'risk',
    personality: 'Judge · arbitrates and sizes',
    mandate:
      'Weighs both cases and returns strict JSON: action, entry, stop, target, sizeMultiplier, confidence, reasoning. Can veto with WAIT.',
  },
];

function record(r: AgentRecord) {
  const total = r.wins + r.losses;
  const pct = total ? (r.wins / total) * 100 : 0;
  return { total, pct };
}

export default function AgentsPanel({ records, lastMessages }: Props) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      {PROFILES.map((profile) => {
        const a = AGENTS[profile.id];
        const r = records[profile.id];
        const { total, pct } = record(r);
        const sample = lastMessages[profile.id];
        return (
          <article key={profile.id} className="glass card-lift relative flex flex-col overflow-hidden rounded-3xl p-6">
            <span aria-hidden className={`absolute inset-x-0 top-0 h-px ${a.dot} opacity-60`} />
            <div className="flex items-center gap-3">
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl border text-lg ${a.chip}`}>
                {a.emoji}
              </span>
              <div className="min-w-0">
                <h3 className="truncate text-lg font-bold tracking-tight">{a.name}</h3>
                <p className="truncate text-[11px] font-semibold text-muted-foreground">{profile.personality}</p>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center">
                <p className="font-mono text-lg font-bold text-emerald-400">{r.wins}</p>
                <p className="text-[10px] font-bold tracking-wider text-muted-foreground">WINS</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center">
                <p className="font-mono text-lg font-bold text-rose-400">{r.losses}</p>
                <p className="text-[10px] font-bold tracking-wider text-muted-foreground">LOSSES</p>
              </div>
              <div className="rounded-xl border border-white/8 bg-white/[0.03] p-3 text-center">
                <p className="font-mono text-lg font-bold text-white">{r.calls}</p>
                <p className="text-[10px] font-bold tracking-wider text-muted-foreground">CALLS</p>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex items-center justify-between text-[10px] font-bold tracking-[0.14em] text-muted-foreground">
                <span>HIT RATE</span>
                <span className="font-mono">{total ? `${pct.toFixed(0)}%` : 'n/a'}</span>
              </div>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-white/8">
                <div
                  className={`h-full rounded-full ${a.dot} transition-[width] duration-700`}
                  style={{ width: `${total ? Math.max(pct, 3) : 0}%` }}
                />
              </div>
            </div>

            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">{profile.mandate}</p>

            <div className="mt-4 flex-1 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
              <p className="text-[10px] font-bold tracking-[0.16em] text-muted-foreground">LATEST MESSAGE</p>
              <p className="mt-2 text-xs leading-relaxed text-white/75">
                {sample ?? 'No message yet — run a debate and this agent will speak.'}
              </p>
            </div>
          </article>
        );
      })}
    </div>
  );
}
