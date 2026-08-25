/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07090E', // Deep Velvet Obsidian
          900: '#0C1018',
          850: '#121722',
          800: '#181F2E',
          750: '#20293D',
          700: '#2A364F',
          600: '#384764',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          vip: '#dfa938',
          champagne: '#f3ce72',
        },
        aviation: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8', // Luminous Electric Cyan
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        radar: {
          500: '#10b981', // Radar Mint
          400: '#34d399',
          300: '#6ee7b7',
        }
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', '"SF Pro Display"', '"Segoe UI"', 'Roboto', 'sans-serif'],
        mono: ['"SF Mono"', 'ui-monospace', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      animation: {
        'radar-sweep': 'radarSweep 4s linear infinite',
        'pulse-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'aurora-drift': 'auroraDrift 8s ease-in-out infinite alternate',
      },
      keyframes: {
        radarSweep: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        auroraDrift: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '100%': { transform: 'translate(5%, 8%) scale(1.15)' },
        }
      }
    },
  },
  plugins: [],
}
