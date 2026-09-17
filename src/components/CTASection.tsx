import { ArrowRight, Triangle } from 'lucide-react';
import Reveal from './Reveal';

export default function CTASection() {
  return (
    <section id="cta" className="relative scroll-mt-24 overflow-hidden py-24 lg:py-32">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="aurora-drift absolute top-1/2 left-1/2 h-[28rem] w-[46rem] max-w-[95vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-signal/18 blur-[130px]" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-4xl px-5 text-center sm:px-8">
        <Reveal>
          <span className="float-y glass mx-auto grid h-14 w-14 place-items-center rounded-2xl">
            <Triangle className="h-6 w-6 fill-signal-bright text-signal-bright" />
          </span>
        </Reveal>

        <Reveal delay={90}>
          <h2 className="mt-8 text-3xl font-extrabold tracking-[-0.025em] sm:text-5xl lg:text-6xl">
            Ready to watch <span className="text-gradient-signal">AI trade?</span>
          </h2>
        </Reveal>

        <Reveal delay={170}>
          <p className="mt-5 text-base font-medium text-muted-foreground sm:text-lg">
            Free · No signup · Paper trading only
          </p>
        </Reveal>

        <Reveal delay={250}>
          <a
            href="/dashboard"
            className="btn-signal group mt-10 inline-flex items-center justify-center gap-2.5 rounded-full px-9 py-5 text-base font-bold text-white sm:text-lg"
          >
            Enter Atlas
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1.5" />
          </a>
        </Reveal>

        <Reveal delay={330}>
          <p className="mt-6 text-xs text-muted-foreground/80">
            Atlas trades a simulated book. No wallet connection, no real capital.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
