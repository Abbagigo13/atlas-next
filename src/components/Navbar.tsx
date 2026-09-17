'use client';

import { Menu, Triangle, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const LINKS = [
  { label: 'Features', href: '#features' },
  { label: 'Agents', href: '#agents' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Tech Stack', href: '#tech-stack' },
  { label: 'Dashboard', href: '/dashboard' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  return (
    <>
      <header
        className={[
          'fixed inset-x-0 top-0 z-50 transition-all duration-300',
          scrolled
            ? 'border-b border-white/10 bg-[#0A0E1A]/85 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl'
            : 'border-b border-transparent bg-[#0A0E1A]/35 backdrop-blur-md',
        ].join(' ')}
      >
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:h-18 sm:px-8">
          <a href="#top" className="group flex min-w-0 items-center gap-2.5">
            <span className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-signal/40 bg-signal/10 transition-colors group-hover:border-signal-bright/70">
              <Triangle
                className="h-4 w-4 fill-signal-bright text-signal-bright transition-transform duration-300 group-hover:scale-110"
                strokeWidth={2}
              />
            </span>
            <span className="truncate text-lg font-extrabold tracking-tight sm:text-xl">
              Atlas
            </span>
          </a>

          <ul className="hidden items-center gap-1 lg:flex">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="relative rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2.5">
            <a
              href="/dashboard"
              className="btn-signal hidden rounded-full px-5 py-2.5 text-sm font-semibold text-white sm:inline-flex"
            >
              Enter Atlas
            </a>
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-foreground transition-colors hover:border-signal/40 hover:bg-white/10 lg:hidden"
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={[
          'fixed inset-0 z-[60] flex flex-col bg-[#0A0E1A]/97 backdrop-blur-2xl transition-all duration-300 lg:hidden',
          open
            ? 'pointer-events-auto opacity-100'
            : 'pointer-events-none opacity-0',
        ].join(' ')}
        aria-hidden={!open}
      >
        <div className="flex h-16 items-center justify-between px-5 sm:h-18 sm:px-8">
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 place-items-center rounded-xl border border-signal/40 bg-signal/10">
              <Triangle className="h-4 w-4 fill-signal-bright text-signal-bright" />
            </span>
            <span className="text-lg font-extrabold tracking-tight">Atlas</span>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-signal/40 hover:bg-white/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-1 flex-col justify-center gap-2 px-6 pb-24">
          {LINKS.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="border-b border-white/5 py-4 text-3xl font-bold tracking-tight text-foreground/90 transition-colors hover:text-signal-bright"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/dashboard"
            onClick={() => setOpen(false)}
            className="btn-signal mt-8 rounded-full px-6 py-4 text-center text-base font-semibold text-white"
          >
            Enter Atlas
          </a>
        </nav>
      </div>
    </>
  );
}
