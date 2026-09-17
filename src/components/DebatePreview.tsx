import { ArrowRight, Clock, Shield, TrendingDown, TrendingUp } from 'lucide-react';
import Reveal from './Reveal';

const THREAD = [
  {
    agent: 'Bull Agent',
    time: '14:02:11',
    icon: TrendingUp,
    align: 'left' as const,
    bubble: 'border-emerald-400/25 bg-emerald-400/[0.07]',
    iconClass: 'border-emerald-400/35 bg-emerald-400/12 text-emerald-300',
    label: 'text-emerald-300',
    body: 'BTC just reclaimed the 4h VWAP with rising volume and RSI divergence off the $76,900 sweep. Funding is flat, order book shows thinning asks to $77,510. This is a clean long: entry $77,150, target $77,510.',
    confidence: 'Conviction 72%',
  },
  {
    agent: 'Bear Agent',
    time: '14:02:14',
    icon: TrendingDown,
    align: 'right' as const,
    bubble: 'border-rose-400/25 bg-rose-400/[0.07]',
    iconClass: 'border-rose-400/35 bg-rose-400/12 text-rose-300',
    label: 'text-rose-300',
    body: 'Disagree on size. Macro is Risk-Off — DXY bid, equities fading into the close. The 24h range is only 0.9% wide, so a reclaim inside chop is not a breakout. Wait for a close above $77,400 before committing.',
    confidence: 'Conviction 58%',
  },
  {
    agent: 'Risk Manager',
    time: '14:02:17',
    icon: Shield,
    align: 'left' as const,
    bubble: 'border-amber-300/25 bg-amber-300/[0.07]',
    iconClass: 'border-amber-300/35 bg-amber-300/12 text-amber-200',
    label: 'text-amber-200',
    body: 'Both cases hold. Bull has the structure, Bear has the regime. Verdict: take the long at half size — 0.5x with a tight stop under the sweep low. Risk 0.22% of book, R:R 2.1. Green-lit.',
    confidence: 'Verdict · LONG 0.5x',
  },
] as const;

export default function DebatePreview() {
  return (
    <section
      id="debate"
      className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-24 -left-20 h-80 w-80 rounded-full bg-signal/10 blur-[120px]" />
        <div className="absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-brand-soft/40 blur-[120px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.22em] text-signal-bright">
              TRANSPARENCY
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              No <span className="text-gradient-signal">black boxes</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Every trade comes with the full reasoning trail. You see exactly why the
              decision was made.
            </p>
          </Reveal>
        </div>

        <Reveal delay={120} className="mx-auto mt-14 max-w-4xl lg:mt-16">
          <div className="glass relative overflow-hidden rounded-3xl">
            <div className="hairline-top absolute inset-x-12 top-0 h-px" />

            {/* chat header */}
            <div className="flex items-center justify-between gap-3 border-b border-white/8 px-5 py-4 sm:px-7">
              <div className="flex min-w-0 items-center gap-3">
                <span className="inline-flex shrink-0 items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1">
                  <span className="pulse-ring-green h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  <span className="text-[10px] font-bold tracking-[0.16em] text-emerald-300">
                    LIVE
                  </span>
                </span>
                <span className="truncate text-sm font-semibold text-white/85">
                  Debate #1,284 · BTC/USDT · 4h
                </span>
              </div>
              <span className="hidden shrink-0 items-center gap-1.5 font-mono text-xs text-muted-foreground sm:flex">
                <Clock className="h-3.5 w-3.5" />
                4.1s
              </span>
            </div>

            {/* thread */}
            <div className="flex flex-col gap-5 px-4 py-6 sm:px-7 sm:py-8">
              {THREAD.map((m) => (
                <div
                  key={m.agent}
                  className={[
                    'flex w-full min-w-0 gap-3',
                    m.align === 'right' ? 'sm:flex-row-reverse' : '',
                  ].join(' ')}
                >
                  <span
                    className={`mt-1 grid h-9 w-9 shrink-0 place-items-center rounded-xl border ${m.iconClass}`}
                  >
                    <m.icon className="h-4.5 w-4.5" strokeWidth={2.2} />
                  </span>

                  <div
                    className={[
                      'min-w-0 flex-1 rounded-2xl border p-4 sm:max-w-[85%] sm:p-5',
                      m.bubble,
                    ].join(' ')}
                  >
                    <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
                      <span className={`text-sm font-bold ${m.label}`}>
                        {m.agent}
                      </span>
                      <span className="font-mono text-[11px] text-muted-foreground">
                        {m.time}
                      </span>
                    </div>
                    <p className="mt-2.5 text-sm leading-relaxed text-white/80">
                      {m.body}
                    </p>
                    <span className="mt-3 inline-flex rounded-md border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[11px] font-medium text-muted-foreground">
                      {m.confidence}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* execute row */}
            <div className="flex flex-col gap-4 border-t border-white/8 bg-signal/[0.05] px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-7">
              <div className="min-w-0">
                <p className="text-[10px] font-bold tracking-[0.18em] text-signal-bright">
                  FINAL ORDER
                </p>
                <p className="mt-1.5 flex flex-wrap items-baseline gap-x-2 font-mono text-sm font-semibold">
                  <span className="rounded-md bg-emerald-400/15 px-2 py-0.5 text-emerald-300">
                    LONG 0.5x
                  </span>
                  <span className="text-white">$77,150</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-rose-300/90">SL $76,980</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-emerald-300/90">TP $77,510</span>
                </p>
              </div>
              <a
                href="/dashboard"
                className="btn-signal group inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3.5 text-sm font-bold tracking-wide text-white"
              >
                EXECUTE PAPER TRADE
                <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
