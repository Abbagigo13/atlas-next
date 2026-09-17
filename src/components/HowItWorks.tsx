import { Activity, CheckCircle2, MessagesSquare, Radio } from 'lucide-react';
import Reveal from './Reveal';

const STEPS = [
  {
    n: '01',
    title: 'Market Event',
    icon: Radio,
    description: 'New candle closes, news breaks, or volume spikes.',
  },
  {
    n: '02',
    title: 'Agents Debate',
    icon: MessagesSquare,
    description: 'Bull, Bear, and Risk argue in parallel — visible in your feed.',
  },
  {
    n: '03',
    title: 'Decision Made',
    icon: CheckCircle2,
    description: 'Risk Manager returns a verdict: LONG, SHORT, or WAIT.',
  },
  {
    n: '04',
    title: 'Trade Executed',
    icon: Activity,
    description: 'Paper trade placed automatically with full reasoning logged.',
  },
] as const;

export default function HowItWorks() {
  return (
    <section
      id="how-it-works"
      className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-[26rem] w-[52rem] max-w-[90vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/35 blur-[140px]" />
      </div>

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.22em] text-signal-bright">
              HOW IT WORKS
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              From market event to{' '}
              <span className="text-gradient-signal">executed trade</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Four steps. Fully autonomous. Every decision logged.
            </p>
          </Reveal>
        </div>

        {/* Desktop / tablet: horizontal */}
        <div className="relative mt-16 hidden md:block">
          <div
            aria-hidden
            className="line-flow absolute top-7 right-[12.5%] left-[12.5%] h-px rounded-full"
          />
          <div className="relative grid grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 130} className="min-w-0">
                <div className="group flex flex-col items-center text-center">
                  <span className="relative grid h-14 w-14 shrink-0 place-items-center rounded-full border border-signal/35 bg-[#0d1424] text-sm font-bold text-signal-bright shadow-[0_0_0_6px_rgba(10,14,26,0.9)] transition-all duration-400 group-hover:border-signal-bright group-hover:bg-signal/15">
                    {step.n}
                  </span>
                  <span className="mt-6 grid h-9 w-9 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-colors duration-300 group-hover:border-signal/40 group-hover:text-signal-bright">
                    <step.icon className="h-4 w-4" />
                  </span>
                  <h3 className="mt-4 text-lg font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p className="mx-auto mt-2 max-w-[16rem] text-sm leading-relaxed text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile: vertical */}
        <div className="relative mt-12 md:hidden">
          <div
            aria-hidden
            className="line-flow-vertical absolute top-6 bottom-6 left-7 w-px"
          />
          <div className="flex flex-col gap-8">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 110}>
                <div className="flex min-w-0 items-start gap-5">
                  <span className="relative z-10 grid h-14 w-14 shrink-0 place-items-center rounded-full border border-signal/35 bg-[#0d1424] text-sm font-bold text-signal-bright shadow-[0_0_0_6px_rgba(10,14,26,0.9)]">
                    {step.n}
                  </span>
                  <div className="min-w-0 pt-1.5">
                    <div className="flex items-center gap-2">
                      <step.icon className="h-4 w-4 shrink-0 text-signal-bright" />
                      <h3 className="truncate text-lg font-bold tracking-tight">
                        {step.title}
                      </h3>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
