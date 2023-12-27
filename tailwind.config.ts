import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['var(--font-geist-mono)', ...fontFamily.mono],
        sans: ['var(--font-geist-sans)', ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
export default config;
