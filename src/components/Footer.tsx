import { Github, Triangle, Twitter, Youtube } from 'lucide-react';

const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com', icon: Github },
  { label: 'X (Twitter)', href: 'https://x.com', icon: Twitter },
  { label: 'YouTube', href: 'https://youtube.com', icon: Youtube },
];

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/8 bg-[#080b14]/80">
      <div className="mx-auto w-full max-w-7xl px-5 py-12 sm:px-8 lg:py-14">
        <div className="flex flex-col items-center gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl border border-signal/40 bg-signal/10">
              <Triangle className="h-4 w-4 fill-signal-bright text-signal-bright" />
            </span>
            <p className="min-w-0 text-sm font-semibold text-white/85">
              Atlas ·{' '}
              <span className="font-normal text-muted-foreground">
                Built for Bitget Hackathon S2
              </span>
            </p>
          </div>

          <ul className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={s.label}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-signal/45 hover:bg-signal/10 hover:text-signal-bright"
                >
                  <s.icon className="h-4.5 w-4.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-10 border-t border-white/6 pt-8 text-center">
          <p className="text-xs text-muted-foreground">
            Built with <span className="text-rose-400">❤️</span> using Bitget Agent Hub
            + Qwen
          </p>
          <p className="mt-2 text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Atlas. Paper trading only — not financial
            advice.
          </p>
        </div>
      </div>
    </footer>
  );
}
