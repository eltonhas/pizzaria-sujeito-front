import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--dark-700)',
        foreground: 'var(--dark-900)',
        gray: {
          100: 'var(--gray-100)',
        },
        green: {
          900: 'var(--green-900)',
        },
        red: {
          900: 'var(--red-900)',
        },
      },
    },
  },
  plugins: [],
} satisfies Config
