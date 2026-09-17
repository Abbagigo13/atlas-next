'use client';

import { useEffect, useRef, useState } from 'react';

type Stat = {
  /** Numeric target for the count-up. */
  target: number;
  prefix?: string;
  suffix?: string;
  /** Static string shown instead of a count-up (e.g. "24/7"). */
  literal?: string;
  label: string;
};

const STATS: Stat[] = [
  { target: 3, label: 'AI Agents debating per trade' },
  { target: 24, literal: '24/7', label: 'Autonomous operation' },
  { target: 0, label: 'Real funds at risk' },
  { target: 5, prefix: '<', suffix: 's', label: 'Decision latency' },
];

const DURATION = 1500;

function useCountUp(target: number, start: boolean) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!start) return;

    if (target === 0) {
      setValue(0);
      return;
    }

    let frame = 0;
    const begin = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - begin) / DURATION, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setValue(Math.round(eased * target));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, start]);

  return value;
}

function StatItem({ stat, index }: { stat: Stat; index: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const value = useCountUp(stat.target, inView);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="reveal glass card-lift min-w-0 rounded-3xl p-6 text-center sm:p-7"
      data-visible={inView ? 'true' : 'false'}
      style={{ ['--reveal-delay' as string]: `${index * 100}ms` }}
    >
      <p className="text-gradient-signal text-4xl font-extrabold tracking-tight tabular-nums sm:text-5xl">
        {stat.literal ?? `${stat.prefix ?? ''}${value}${stat.suffix ?? ''}`}
      </p>
      <p className="mx-auto mt-3 max-w-[14rem] text-sm leading-relaxed text-muted-foreground">
        {stat.label}
      </p>
    </div>
  );
}

export default function Stats() {
  return (
    <section className="relative py-20 lg:py-24">
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
