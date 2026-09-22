'use client';

import { useEffect, useRef } from 'react';
import { AGENTS, type DebateMessage, type AgentId } from '@/lib/atlas/types';
import { fmtTime } from '@/lib/atlas/symbols';

type Props = {
  messages: DebateMessage[];
  typing: AgentId | null;
  status: string;
  meta: { source: string; model: string; latencyMs: number } | null;
  error: string | null;
  symbolLabel: string;
};

function Typing({ agent }: { agent: AgentId }) {
  const a = AGENTS[agent];
  return (
    <div className="flex items-center gap-3">
      <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border text-sm ${a.chip}`}>
        {a.emoji}
      </span>
      <div className="flex items-center gap-2 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3">
        <span className={`text-xs font-semibold ${a.text}`}>{a.name} is thinking</span>
        <span className="flex items-center gap-1">
          <span className={`typing-dot h-1.5 w-1.5 rounded-full ${a.dot}`} />
          <span className={`typing-dot h-1.5 w-1.5 rounded-full ${a.dot}`} style={{ animationDelay: '0.15s' }} />
          <span className={`typing-dot h-1.5 w-1.5 rounded-full ${a.dot}`} style={{ animationDelay: '0.3s' }} />
        </span>
      </div>
    </div>
  );
}

export default function DebatePanel({ messages, typing, status, meta, error, symbolLabel }: Props) {
  const endRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  }, [messages.length, typing]);

  const live = status === 'thinking' || status === 'streaming';

  return (
    <div className="glass relative flex min-h-[26rem] flex-col overflow-hidden rounded-3xl">
      <div className="hairline-top absolute inset-x-12 top-0 h-px" />

      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/8 px-5 py-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={[
              'inline-flex shrink-0 items-center gap-2 rounded-full border px-2.5 py-1',
              live
                ? 'border-emerald-400/30 bg-emerald-400/10'
                : 'border-white/10 bg-white/5',
            ].join(' ')}
          >
            <span
              className={[
                'h-1.5 w-1.5 rounded-full',
                live ? 'pulse-ring-green bg-emerald-400' : 'bg-muted-foreground',
              ].join(' ')}
            />
            <span
              className={`text-[10px] font-bold tracking-[0.16em] ${live ? 'text-emerald-300' : 'text-muted-foreground'}`}
            >
              {live ? 'LIVE' : 'IDLE'}
            </span>
          </span>
          <span className="truncate text-sm font-semibold text-white/85">
            Debate feed · {symbolLabel}
          </span>
        </div>
        {meta && (
          <span className="shrink-0 font-mono text-[11px] text-muted-foreground">
            {meta.source === 'qwen' ? `qwen3.8-max · ${(meta.latencyMs / 1000).toFixed(1)}s` : `${meta.model} · ${(meta.latencyMs / 1000).toFixed(1)}s`}
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 py-5 sm:px-5">
        {messages.length === 0 && !typing && (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 py-10 text-center">
            <p className="text-sm font-semibold text-white/80">No debate running</p>
            <p className="max-w-sm text-xs leading-relaxed text-muted-foreground">
              Pick a symbol and hit <span className="font-semibold text-signal-bright">Start Debate</span>.
              Bull, Bear, Risk Manager and Trader will each take the floor in order.
            </p>
          </div>
        )}

        {messages.map((m, i) => {
          const a = AGENTS[m.agent];
          return (
            <div key={`${m.agent}-${i}`} className="rise-in flex min-w-0 gap-3">
              <span className={`grid h-9 w-9 shrink-0 place-items-center rounded-xl border text-sm ${a.chip}`}>
                {a.emoji}
              </span>
              <div className={`min-w-0 flex-1 rounded-2xl border p-4 ${a.border}`}>
                <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                  <span className={`text-sm font-bold ${a.text}`}>{a.name}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">
                    {a.role} · {fmtTime(m.ts)}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-white/80">{m.text}</p>
              </div>
            </div>
          );
        })}

        {typing && <Typing agent={typing} />}

        {error && (
          <p className="rounded-2xl border border-rose-400/30 bg-rose-400/10 p-4 text-sm text-rose-200">
            {error} — the local agent team will be used on the next run.
          </p>
        )}

        <div ref={endRef} />
      </div>
    </div>
  );
}
