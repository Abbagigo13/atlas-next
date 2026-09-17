import {
  Bot,
  Brain,
  Code2,
  LineChart,
  Palette,
  Rocket,
} from 'lucide-react';
import Reveal from './Reveal';

const STACK = [
  { label: 'Bitget Agent Hub', icon: Bot },
  { label: 'Qwen API (qwen-plus)', icon: Brain },
  { label: 'Next.js 16', icon: Rocket },
  { label: 'TypeScript', icon: Code2 },
  { label: 'Tailwind CSS v4', icon: Palette },
  { label: 'Paper Trading', icon: LineChart },
] as const;

export default function TechStack() {
  return (
    <section id="tech-stack" className="relative scroll-mt-24 py-24 lg:py-32">
      <div className="mx-auto w-full max-w-3xl px-5 sm:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal>
            <p className="text-xs font-bold tracking-[0.22em] text-signal-bright">
              TECH STACK
            </p>
          </Reveal>
          <Reveal delay={80}>
            <h2 className="mt-4 text-3xl font-extrabold tracking-[-0.02em] sm:text-4xl lg:text-5xl">
              Built on tools{' '}
              <span className="text-gradient-signal">traders trust</span>
            </h2>
          </Reveal>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3 sm:gap-4">
          {STACK.map((item, i) => (
            <Reveal key={item.label} delay={i * 70}>
              <span className="glass card-lift inline-flex min-w-0 items-center gap-2.5 rounded-full px-5 py-3">
                <item.icon className="h-4 w-4 shrink-0 text-signal-bright" />
                <span className="truncate text-sm font-semibold text-white/85">
                  {item.label}
                </span>
              </span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
