/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // ── EcoleApp 2026 charter (warm purple, DIGISCHOOL) ──
        brand: {
          50: '#FAF5FE',
          100: '#F3E5FB',
          200: '#E7CBF5',
          300: '#D4A2EA',
          400: '#C079DC',
          500: '#AD56C4',
          600: '#9A45B3',
          700: '#7B2D9E',
          800: '#5E2278',
          900: '#431854',
          950: '#2C0F38',
        },
        canvas: 'rgb(var(--color-canvas) / <alpha-value>)',
        surface: 'rgb(var(--color-surface) / <alpha-value>)',
        ink: {
          DEFAULT: 'rgb(var(--color-ink) / <alpha-value>)',
          soft: 'rgb(var(--color-ink-soft) / <alpha-value>)',
          faint: 'rgb(var(--color-ink-faint) / <alpha-value>)',
        },
        line: {
          DEFAULT: 'rgb(var(--color-line) / <alpha-value>)',
          soft: 'rgb(var(--color-line-soft) / <alpha-value>)',
        },
        field: 'rgb(var(--color-field) / <alpha-value>)',
        muted: 'rgb(var(--color-muted) / <alpha-value>)',
        accent: 'rgb(var(--color-accent) / <alpha-value>)',
        success: { DEFAULT: '#22A05E', bg: '#D1FAE5' },
        info: { DEFAULT: '#1081F3', bg: '#EFF4FF' },
        warning: { DEFAULT: '#D97706', bg: '#FEF3C7' },
        danger: { DEFAULT: '#DC2626', bg: '#FEF2F2' },
      },
      fontFamily: {
        sans: ['Nunito', 'system-ui', 'sans-serif'],
        display: ['"Libre Baskerville"', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.07)',
        'card-hover': '0 6px 20px -6px rgba(28,18,48,0.18)',
        pop: '0 12px 32px -12px rgba(28,18,48,0.28)',
      },
      borderRadius: {
        xl: '0.875rem',
        '2xl': '1.125rem',
        '3xl': '1.5rem',
      },
      backgroundImage: {
        'sidebar-gradient': 'linear-gradient(180deg,#7B2D9E 0%,#9845B8 60%,#AD56C4 100%)',
        'brand-gradient': 'linear-gradient(135deg,#7B2D9E 0%,#AD56C4 100%)',
        'auth-gradient': 'linear-gradient(145deg,#7B2D9E 0%,#AD56C4 60%,#C87DE0 100%)',
      },
      transitionTimingFunction: {
        spring: 'cubic-bezier(0.32,0.72,0,1)',
      },
    },
  },
  plugins: [],
};
