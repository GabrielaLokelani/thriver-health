/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'rgb(var(--color-primary-50) / <alpha-value>)',
          100: 'rgb(var(--color-primary-100) / <alpha-value>)',
          200: 'rgb(var(--color-primary-200) / <alpha-value>)',
          300: 'rgb(var(--color-primary-300) / <alpha-value>)',
          400: 'rgb(var(--color-primary-400) / <alpha-value>)',
          500: 'rgb(var(--color-primary-500) / <alpha-value>)',
          600: 'rgb(var(--color-primary-600) / <alpha-value>)',
          700: 'rgb(var(--color-primary-700) / <alpha-value>)',
          800: 'rgb(var(--color-primary-800) / <alpha-value>)',
          900: 'rgb(var(--color-primary-900) / <alpha-value>)',
        },
        green: {
          DEFAULT: '#28A745',
          50: '#E3F8E5',
          100: '#C8F1CC',
          200: '#91E399',
          300: '#5AD566',
          400: '#28A745',
          500: '#1E7E34',
          600: '#145523',
          700: '#0A2C12',
          800: '#000000',
          900: '#000000',
        },
        red: {
          DEFAULT: '#DC3545',
          50: '#FCE4E7',
          100: '#F8CAD0',
          200: '#F29BA1',
          300: '#EB6B72',
          400: '#DC3545',
          500: '#BD2130',
          600: '#921925',
          700: '#66121A',
          800: '#3B0A0F',
          900: '#0F0204',
        },
        orange: {
          DEFAULT: '#FD7E14',
          50: '#FFF3E6',
          100: '#FFE7CC',
          200: '#FFCF99',
          300: '#FFB766',
          400: '#FD7E14',
          500: '#DB6A0A',
          600: '#A95208',
          700: '#773A06',
          800: '#452203',
          900: '#130A01',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 3s infinite',
      },
      keyframes: {
        pulse: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: .5 },
        },
        bounce: {
          '0%, 100%': {
            transform: 'translateY(-25%)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
    },
  },
  plugins: [],
} 