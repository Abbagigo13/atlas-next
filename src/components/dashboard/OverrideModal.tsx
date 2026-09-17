'use client';

import { X } from 'lucide-react';
import { useEffect, useState } from 'react';
import type { Action, Decision } from '@/lib/atlas/types';

type Props = {
  open: boolean;
  decision: Decision | null;
  onClose: () => void;
  onConfirm: (patch: Partial<Decision>) => void;
};

const ACTIONS: Action[] = ['LONG', 'SHORT', 'WAIT'];

export default function OverrideModal({ open, decision, onClose, onConfirm }: Props) {
  const [action, setAction] = useState<Action>('LONG');
  const [entry, setEntry] = useState('');
  const [stop, setStop] = useState('');
  const [target, setTarget] = useState('');
  const [size, setSize] = useState('');

  useEffect(() => {
    if (!decision) return;
    setAction(decision.action);
    setEntry(String(decision.entry));
    setStop(String(decision.stop));
    setTarget(String(decision.target));
    setSize(String(decision.sizeMultiplier || 0.5));
  }, [decision, open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!open || !decision) return null;

  const nums = { entry: Number(entry), stop: Number(stop), target: Number(target), size: Number(size) };
  const valid =
    Number.isFinite(nums.entry) &&
    Number.isFinite(nums.stop) &&
    Number.isFinite(nums.target) &&
    Number.isFinite(nums.size) &&
    nums.entry > 0 &&
    nums.stop > 0 &&
    nums.target > 0 &&
    nums.size > 0 &&
    nums.stop !== nums.entry;
  const rr = valid ? Math.abs(nums.target - nums.entry) / Math.abs(nums.entry - nums.stop) : 0;

  const field = (label: string, value: string, set: (v: string) => void, step = 'any') => (
    <label className="block min-w-0">
      <span className="text-[10px] font-bold tracking-[0.16em] text-muted-foreground">{label}</span>
      <input
        type="number"
        step={step}
        value={value}
        onChange={(e) => set(e.target.value)}
        className="mt-1.5 w-full rounded-xl border border-white/12 bg-[#0b1120] px-3 py-2.5 font-mono text-sm text-white outline-none transition-colors focus:border-signal/60"
      />
    </label>
  );

  return (
    <div className="fixed inset-0 z-[80] grid place-items-center px-4 py-8">
      <div onClick={onClose} className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Manual override"
        className="glass relative w-full max-w-lg overflow-hidden rounded-3xl p-6"
      >
        <div className="hairline-top absolute inset-x-10 top-0 h-px" />
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-bold tracking-tight">Manual override</h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Edit the order before it hits the paper book. The agents keep their verdict on record.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="mt-5 flex gap-2">
          {ACTIONS.map((a) => (
            <button
              key={a}
              type="button"
              onClick={() => setAction(a)}
              className={[
                'flex-1 rounded-xl border px-3 py-2.5 text-sm font-bold transition-colors',
                action === a
                  ? a === 'LONG'
                    ? 'border-emerald-400/50 bg-emerald-400/15 text-emerald-300'
                    : a === 'SHORT'
                      ? 'border-rose-400/50 bg-rose-400/15 text-rose-300'
                      : 'border-amber-300/50 bg-amber-300/15 text-amber-200'
                  : 'border-white/10 bg-white/[0.03] text-muted-foreground hover:text-foreground',
              ].join(' ')}
            >
              {a}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-3">
          {field('ENTRY', entry, setEntry)}
          {field('STOP LOSS', stop, setStop)}
          {field('TAKE PROFIT', target, setTarget)}
          {field('SIZE MULTIPLIER', size, setSize, '0.1')}
        </div>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-white/8 bg-white/[0.02] px-4 py-3">
          <span className="text-[10px] font-bold tracking-[0.16em] text-muted-foreground">
            RESULTING R:R
          </span>
          <span className="font-mono text-sm font-bold text-signal-bright">
            {valid ? `${rr.toFixed(2)}R` : 'invalid'}
          </span>
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
          <button
            type="button"
            disabled={!valid || action === 'WAIT'}
            onClick={() =>
              onConfirm({
                action,
                entry: nums.entry,
                stop: nums.stop,
                target: nums.target,
                sizeMultiplier: nums.size,
                riskReward: Number(rr.toFixed(2)),
              })
            }
            className={[
              'flex-1 rounded-full px-6 py-3.5 text-sm font-bold text-white transition-all',
              !valid || action === 'WAIT'
                ? 'cursor-not-allowed border border-white/10 bg-white/5 text-muted-foreground'
                : 'btn-signal',
            ].join(' ')}
          >
            Execute override
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-white/15 bg-white/[0.03] px-6 py-3.5 text-sm font-semibold transition-colors hover:bg-white/[0.07]"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
