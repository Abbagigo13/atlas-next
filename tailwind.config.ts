import type { Config } from 'tailwindcss';

/**
 * Tailwind CSS v4 is CSS-first: the design tokens live in the `@theme` block
 * inside `src/app/globals.css`. This file only declares content sources so
 * editors / tooling that still expect a config object keep working.
 */
const config: Config = {
  content: [
    './src/app/**/*.{ts,tsx,mdx}',
    './src/components/**/*.{ts,tsx,mdx}',
  ],
};

export default config;
