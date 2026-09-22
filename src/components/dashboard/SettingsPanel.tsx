'use client';

import { Gauge, RotateCcw, ShieldCheck, Zap } from 'lucide-react';
import type { Settings } from '@/lib/atlas/types';

type Props = {
  settings: Settings;
  onChange: (patch: Partial<Settings>) => void;
  onReset: () => void;
  dataSource: string;
  aiSource: string;
};

function Toggle({
  checked,
  onChange,
  label,
  hint,
  icon: Icon,
  disabled = false,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
  hint: string;
  icon: typeof Zap;
  disabled?: boolean;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.02] p-4">
      <div className="flex min-w-0 gap-3">
        <span className="mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-signal-bright">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white/90">{label}</p>
          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{hint}</p>
        </div>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={label}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={[
          'relative h-6 w-11 shrink-0 rounded-full border transition-colors duration-300',
          checked ? 'border-signal/60 bg-signal/40' : 'border-white/12 bg-white/8',
          disabled ? 'cursor-not-allowed opacity-50' : '',
        ].join(' ')}
      >
        <span
          className={[
            'absolute top-0.75 h-[18px] w-[18px] rounded-full transition-transform duration-300',
            checked ? 'translate-x-[22px] bg-signal-bright' : 'translate-x-[3px] bg-white/70',
          ].join(' ')}
        />
      </button>
    </div>
  );
}

export default function SettingsPanel({ settings, onChange, onReset, dataSource, aiSource }: Props) {
  return (
    <div className="flex flex-col gap-5">
      <div className="glass relative overflow-hidden rounded-3xl p-5 sm:p-6">
        <div className="hairline-top absolute inset-x-12 top-0 h-px" />
        <h2 className="text-sm font-bold tracking-wide text-white/85">Execution</h2>

        <div className="mt-4 flex flex-col gap-3">
          <Toggle
            icon={ShieldCheck}
            checked={settings.paperTrading}
            onChange={(v) => onChange({ paperTrading: v })}
            label="Paper trading"
            hint="Always on in this build. Atlas never touches a live exchange account or a wallet — orders are simulated against live prices."
            disabled
          />
          <Toggle
            icon={Zap}
            checked={settings.autoExecute}
            onChange={(v) => onChange({ autoExecute: v })}
            label="Auto-execute verdicts"
            hint="When the Risk Manager returns LONG or SHORT, the Trader fills it on the paper book without waiting for your click."
          />
          <Toggle
            icon={Gauge}
            checked={settings.autoMode}
            onChange={(v) => onChange({ autoMode: v })}
            label="Auto mode"
            hint="Runs a fresh debate on the selected symbol every 5 minutes for as long as this tab stays open."
          />
        </div>
      </div>

      <div className="glass rounded-3xl p-5 sm:p-6">
        <h2 className="text-sm font-bold tracking-wide text-white/85">Agent speed</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          How the debate is delivered to the feed once the agents have answered.
        </p>
        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {(
            [
              { id: 'instant' as const, title: 'Instant', hint: 'All four messages land at once. Fastest read.' },
              { id: 'realistic' as const, title: 'Realistic', hint: '1.5s between agents with typing indicators.' },
            ]
          ).map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange({ speed: opt.id })}
              className={[
                'rounded-2xl border p-4 text-left transition-all',
                settings.speed === opt.id
                  ? 'border-signal/45 bg-signal/10'
                  : 'border-white/8 bg-white/[0.02] hover:border-white/20',
              ].join(' ')}
            >
              <p className="text-sm font-bold text-white/90">{opt.title}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{opt.hint}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="glass rounded-3xl p-5 sm:p-6">
        <h2 className="text-sm font-bold tracking-wide text-white/85">Data & model</h2>
        <dl className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
            <dt className="text-[10px] font-bold tracking-[0.16em] text-muted-foreground">MARKET DATA</dt>
            <dd className="mt-1.5 font-mono text-sm text-white/85">{dataSource}</dd>
            <dd className="mt-1 text-[11px] text-muted-foreground">
              Bitget v3 → Bitget v2 → CoinMarketCap → CoinGecko → mock
            </dd>
          </div>
          <div className="rounded-2xl border border-white/8 bg-white/[0.02] p-4">
            <dt className="text-[10px] font-bold tracking-[0.16em] text-muted-foreground">REASONING</dt>
            <dd className="mt-1.5 font-mono text-sm text-white/85">{aiSource}</dd>
            <dd className="mt-1 text-[11px] text-muted-foreground">
              Set QWEN_API_KEY in .env.local for qwen3.8-max reasoning
            </dd>
          </div>
        </dl>
      </div>

      <div className="glass rounded-3xl p-5 sm:p-6">
        <h2 className="text-sm font-bold tracking-wide text-white/85">Danger zone</h2>
        <p className="mt-1 text-xs text-muted-foreground">
          Wipes the paper book, trade log, equity curve and agent records from this browser.
        </p>
        <button
          type="button"
          onClick={() => {
            if (window.confirm('Reset the paper book to $3,000 and clear all history?')) onReset();
          }}
          className="mt-4 inline-flex items-center gap-2 rounded-full border border-rose-400/35 bg-rose-400/10 px-5 py-3 text-sm font-semibold text-rose-200 transition-colors hover:bg-rose-400/20"
        >
          <RotateCcw className="h-4 w-4" />
          Reset paper account
        </button>
      </div>
    </div>
  );
}
