import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: 'var(--color-brand-primary)',
          hover: 'var(--color-brand-primary-hover)',
          secondary: 'var(--color-brand-secondary)',
        },
        ink: {
          heading: 'var(--color-heading)',
          body: 'var(--color-body)',
          muted: 'var(--color-muted)',
        },
        surface: {
          dark: 'var(--color-surface-dark)',
          light: 'var(--color-surface-light)',
        },
        primary: {
          DEFAULT: '#1e40af',
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
      },
      fontFamily: {
        body: ['var(--font-body)', 'Rubik', 'sans-serif'],
        heading: ['var(--font-heading)', 'Raleway', 'sans-serif'],
      },
      maxWidth: {
        site: 'var(--container-max)',
      },
    },
  },
  plugins: [],
}

export default config
