import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Atlas — Three AI agents debate. One makes the call.',
  description:
    'Atlas runs a team of autonomous AI agents that research, argue, and trade — fully on autopilot. Built for the Bitget AI Base Camp Hackathon S2, Track: Agentic Trading.',
  keywords: [
    'Atlas',
    'AI trading agents',
    'multi-agent system',
    'Bitget',
    'Agentic Trading',
    'Qwen',
    'paper trading',
    'autonomous agents',
  ],
  authors: [{ name: 'Atlas' }],
  openGraph: {
    title: 'Atlas — Three AI agents debate. One makes the call.',
    description:
      'An autonomous multi-agent trading system. Bull, Bear and a Risk Manager debate every trade in real time. You watch.',
    type: 'website',
    siteName: 'Atlas',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Atlas — Three AI agents debate. One makes the call.',
    description:
      'An autonomous multi-agent trading system built for Bitget AI Base Camp S2.',
  },
};

export const viewport: Viewport = {
  themeColor: '#0A0E1A',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="bg-background text-foreground font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
