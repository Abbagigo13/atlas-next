import { Shield, TrendingDown, TrendingUp } from 'lucide-react';
import Reveal from './Reveal';

const AGENTS = [
  {
    name: 'Bull Agent',
    tag: 'Optimist',
    icon: TrendingUp,
    description:
      'Finds the long case. Scans for breakouts, momentum shifts, and oversold bounces with technical + sentiment confluence.',
    accent: 'from-emerald-400 to-emerald-400/0',
    iconClass: 'border-emerald-400/35 bg-emerald-400/12 text-emerald-300',
    tagClass: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300',
    glow: 'bg-emerald-400/10',
  },
  {
    name: 'Bear Agent',
    tag: 'Skeptic',
    icon: TrendingDown,
    description:
      'Finds the short case. Watches for exhaustion, resistance rejections, and macro Risk-Off signals.',
    accent: 'from-rose-400 to-rose-400/0',
    iconClass: 'border-rose-400/35 bg-rose-400/12 text-rose-300',
    tagClass: 'border-rose-400/30 bg-rose-400/10 text-rose-300',
    glow: 'bg-rose-400/10',
  },
  {
    name: 'Risk Manager',
    tag: 'Judge',
    icon: Shield,
    description:
      'Arbitrates the debate. Weighs both cases, sizes the trade, and either green-lights or vetoes.',
    accent: 'from-amber-300 to-amber-300/0',
    iconClass: 'border-amber-300/35 bg-amber-300/12 text-amber-200',
    tagClass: 'border-amber-300/30 bg-amber-300/10 text-amber-200',
    glow: 'bg-amber-300/10',
  },
] as const;

export default function AgentTeam() {
  return (
    <section
      id="agents"
      className="relative scroll-mt-24 py-24 lg:py-32"
    >
      <span id="features" className="absolute -top-24 block h-px w-px" aria-hidden />

      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.22em] text-signal-bright">
              MEET THE TEAM
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              Three agents. <span className="text-gradient-signal">One decision.</span>
            </h2>
          </Reveal>
          <Reveal delay={160}>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              Each agent has one job. Together, they make better decisions than any
              single model.
            </p>
          </Reveal>
        </div>

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {AGENTS.map((agent, i) => (
            <Reveal
              key={agent.name}
              delay={i * 120}
              className={i === 2 ? 'sm:col-span-2 lg:col-span-1' : ''}
            >
              <article className="glass card-lift group relative h-full overflow-hidden rounded-3xl p-6 sm:p-7">
                <span
                  aria-hidden
                  className={`absolute inset-x-0 top-0 h-px bg-gradient-to-r ${agent.accent}`}
                />
                <span
                  aria-hidden
                  className={`absolute -top-16 -right-16 h-40 w-40 rounded-full blur-3xl transition-opacity duration-500 ${agent.glow} opacity-0 group-hover:opacity-100`}
                />

                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl border ${agent.iconClass} transition-transform duration-500 group-hover:scale-110`}
                >
                  <agent.icon className="h-6 w-6" strokeWidth={2.2} />
                </span>

                <h3 className="mt-6 text-xl font-bold tracking-tight sm:text-2xl">
                  {agent.name}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground sm:text-[15px]">
                  {agent.description}
                </p>

                <span
                  className={`mt-6 inline-flex items-center rounded-full border px-3 py-1 text-[11px] font-bold tracking-wider uppercase ${agent.tagClass}`}
                >
                  {agent.tag}
                </span>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
