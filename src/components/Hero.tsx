'use client';

import { ArrowRight, Bot, Shield, TrendingDown, TrendingUp, Zap } from 'lucide-react';
import { useEffect, useState } from 'react';

const MESSAGES = [
  {
    agent: 'Bull',
    role: 'Long thesis',
    icon: TrendingUp,
    text: 'RSI divergence suggests reversal. Entry at $77,150. Target $77,510.',
    border: 'border-l-emerald-400',
    ring: 'border-emerald-400/40 bg-emerald-400/10 text-emerald-300',
    tint: 'from-emerald-400/10',
  },
  {
    agent: 'Bear',
    role: 'Short thesis',
    icon: TrendingDown,
    text: 'Macro Risk-Off. 24h range tight. Wait for confirmation.',
    border: 'border-l-rose-400',
    ring: 'border-rose-400/40 bg-rose-400/10 text-rose-300',
    tint: 'from-rose-400/10',
  },
  {
    agent: 'Risk',
    role: 'Verdict',
    icon: Shield,
    text: 'Split decision. Recommended: 0.5x size with tight stop.',
    border: 'border-l-amber-300',
    ring: 'border-amber-300/40 bg-amber-300/10 text-amber-200',
    tint: 'from-amber-300/10',
  },
] as const;

export default function Hero() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setActive((prev) => (prev + 1) % MESSAGES.length);
    }, 3000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36 lg:pb-28"
    >
      {/* Aurora background */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 grid-lines" />
        <div className="aurora-drift absolute -top-40 -left-32 h-[34rem] w-[34rem] rounded-full bg-signal/20 blur-[130px]" />
        <div
          className="aurora-drift absolute top-10 -right-24 h-[30rem] w-[30rem] rounded-full bg-brand-soft/50 blur-[130px]"
          style={{ animationDelay: '-6s' }}
        />
        <div
          className="aurora-drift absolute bottom-[-14rem] left-1/3 h-[26rem] w-[26rem] rounded-full bg-signal-bright/10 blur-[120px]"
          style={{ animationDelay: '-11s' }}
        />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-background" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12 xl:gap-16">
        {/* LEFT */}
        <div className="min-w-0">
          <div
            className="rise-in glass inline-flex max-w-full items-center gap-2 rounded-full px-4 py-2"
            style={{ ['--rise-delay' as string]: '0ms' }}
          >
            <span aria-hidden>🤖</span>
            <span className="truncate text-xs font-semibold tracking-wide text-muted-foreground sm:text-sm">
              Bitget AI Base Camp S2 · Agentic Trading
            </span>
          </div>

          <h1 className="mt-6 text-[2.6rem] leading-[1.06] font-extrabold tracking-[-0.035em] sm:text-[3.2rem] lg:text-[clamp(2.35rem,3.1vw,3.55rem)]">
            <span
              className="rise-in block lg:whitespace-nowrap"
              style={{ ['--rise-delay' as string]: '120ms' }}
            >
              Three AI agents debate.
            </span>
            <span
              className="rise-in text-gradient-signal mt-1 block pb-1 lg:whitespace-nowrap"
              style={{ ['--rise-delay' as string]: '240ms' }}
            >
              One makes the call.
            </span>
          </h1>

          <p
            className="rise-in mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            style={{ ['--rise-delay' as string]: '360ms' }}
          >
            Atlas runs a team of autonomous agents that research, argue, and trade —
            fully on autopilot. Watch every decision happen in real time.
          </p>

          <div
            className="rise-in mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ ['--rise-delay' as string]: '480ms' }}
          >
            <a
              href="/dashboard"
              className="btn-signal group inline-flex items-center justify-center gap-2 rounded-full px-7 py-4 text-sm font-semibold text-white sm:text-base"
            >
              Watch Atlas Trade
              <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </a>
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-4 text-sm font-semibold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/50 hover:bg-white/[0.07] sm:text-base"
            >
              How It Works
            </a>
          </div>

          <div
            className="rise-in mt-10 flex items-center gap-3 text-xs font-medium tracking-wide text-muted-foreground sm:text-sm"
            style={{ ['--rise-delay' as string]: '600ms' }}
          >
            <span className="h-px w-8 shrink-0 bg-gradient-to-r from-signal/70 to-transparent" />
            <span className="min-w-0">Powered by Bitget · Qwen AI · Arbitrum</span>
          </div>
        </div>

        {/* RIGHT — animated debate card */}
        <div className="relative min-w-0">
          <div
            className="rise-in relative"
            style={{ ['--rise-delay' as string]: '300ms' }}
          >
            {/* glow */}
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-signal/15 blur-3xl"
            />

            <div className="float-y glass relative rounded-3xl p-5 sm:p-6">
              <div className="hairline-top absolute inset-x-8 top-0 h-px" />

              {/* header */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <span className="pulse-ring-green h-2.5 w-2.5 shrink-0 rounded-full bg-emerald-400" />
                  <span className="truncate text-xs font-bold tracking-[0.18em] text-muted-foreground">
                    LIVE DEBATE
                  </span>
                </div>
                <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-muted-foreground">
                  BTC/USDT
                </span>
              </div>

              {/* cycling messages */}
              <div className="relative mt-5 h-[132px] sm:h-[124px]">
                {MESSAGES.map((m, i) => {
                  const isActive = i === active;
                  return (
                    <div
                      key={m.agent}
                      className={[
                        'absolute inset-0',
                        isActive ? 'msg-enter' : 'msg-exit',
                      ].join(' ')}
                      aria-hidden={!isActive}
                    >
                      <div
                        className={[
                          'h-full rounded-2xl border border-white/10 border-l-2 bg-gradient-to-r to-transparent p-4',
                          m.border,
                          m.tint,
                        ].join(' ')}
                      >
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex min-w-0 items-center gap-2">
                            <span
                              className={`grid h-6 w-6 shrink-0 place-items-center rounded-lg border ${m.ring}`}
                            >
                              <m.icon className="h-3.5 w-3.5" />
                            </span>
                            <span className="truncate text-sm font-bold">
                              {m.agent} Agent
                            </span>
                          </div>
                          <span className="shrink-0 text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                            {m.role}
                          </span>
                        </div>
                        <p className="mt-2.5 text-sm leading-relaxed text-white/80">
                          {m.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* progress dots */}
              <div className="mt-3 flex items-center gap-1.5">
                {MESSAGES.map((m, i) => (
                  <span
                    key={m.agent}
                    className={[
                      'h-1 rounded-full transition-all duration-500',
                      i === active ? 'w-7 bg-signal-bright' : 'w-3 bg-white/15',
                    ].join(' ')}
                  />
                ))}
                <span className="ml-auto flex items-center gap-1 text-[10px] font-medium text-muted-foreground">
                  <span className="typing-dot h-1 w-1 rounded-full bg-signal-bright" />
                  <span
                    className="typing-dot h-1 w-1 rounded-full bg-signal-bright"
                    style={{ animationDelay: '0.15s' }}
                  />
                  <span
                    className="typing-dot h-1 w-1 rounded-full bg-signal-bright"
                    style={{ animationDelay: '0.3s' }}
                  />
                </span>
              </div>

              {/* decision panel */}
              <div className="mt-4 rounded-2xl border border-signal/25 bg-signal/[0.07] p-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[10px] font-bold tracking-[0.18em] text-signal-bright">
                    DECISION
                  </span>
                  <span className="pulse-ring inline-flex shrink-0 items-center gap-1 rounded-full bg-signal-bright/15 px-2.5 py-1 text-[10px] font-bold tracking-wider text-signal-bright">
                    <Zap className="h-3 w-3" />
                    AUTO
                  </span>
                </div>
                <div className="mt-2 flex flex-wrap items-baseline gap-x-2 gap-y-1 font-mono text-sm font-semibold">
                  <span className="rounded-md bg-emerald-400/15 px-2 py-0.5 text-emerald-300">
                    LONG
                  </span>
                  <span className="text-white">$77,150</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-rose-300/90">SL $76,980</span>
                  <span className="text-muted-foreground">·</span>
                  <span className="text-emerald-300/90">TP $77,510</span>
                </div>
              </div>
            </div>

            {/* floating badges */}
            <div
              className="float-y glass absolute -top-5 -left-3 rounded-2xl px-3.5 py-2.5 sm:-left-8"
              style={{ animationDelay: '-2.5s' }}
            >
              <p className="text-[10px] font-medium tracking-wide text-muted-foreground">
                Paper P&amp;L
              </p>
              <p className="font-mono text-base font-bold text-emerald-400">+12.4%</p>
            </div>

            <div
              className="float-y glass absolute -right-2 -bottom-5 flex items-center gap-2 rounded-2xl px-3.5 py-2.5 sm:-right-6"
              style={{ animationDelay: '-4.5s' }}
            >
              <Bot className="h-4 w-4 shrink-0 text-signal-bright" />
              <span className="text-[10px] font-bold tracking-wider text-white/85">
                3 AGENTS ONLINE
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
