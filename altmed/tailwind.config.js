/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Base colors
        dark: '#000000',
        light: '#ffffff',
        
        // Theme primary colors (Orange brand)
        primary: {
          0: '#ff8400',
          10: '#ff9230',
          20: '#ffa04d',
          30: '#ffae66',
          40: '#ffbb80',
          50: '#ffc999',
          DEFAULT: '#ff8400',
        },
        
        // Theme surface colors (Dark backgrounds)
        surface: {
          0: '#121212',
          10: '#282828',
          20: '#3f3f3f',
          30: '#575757',
          40: '#717171',
          50: '#8b8b8b',
          DEFAULT: '#121212',
        },
        
        // Theme tonal surface colors (Warm tinted backgrounds)
        'surface-tonal': {
          0: '#271d15',
          10: '#3c322a',
          20: '#514841',
          30: '#686059',
          40: '#807872',
          50: '#98918d',
          DEFAULT: '#271d15',
        },
        
        // Success colors (Green)
        success: {
          0: '#22946e',
          10: '#47d5a6',
          20: '#9ae8ce',
          DEFAULT: '#22946e',
        },
        
        // Warning colors (Yellow/Gold)
        warning: {
          0: '#a87a2a',
          10: '#d7ac61',
          20: '#ecd7b2',
          DEFAULT: '#a87a2a',
        },
        
        // Danger colors (Red)
        danger: {
          0: '#9c2121',
          10: '#d94a4a',
          20: '#eb9e9e',
          DEFAULT: '#9c2121',
        },
        
        // Info colors (Blue)
        info: {
          0: '#21498a',
          10: '#4077d1',
          20: '#92b2e5',
          DEFAULT: '#21498a',
        },
        
        // Compatibility aliases
        orange: {
          400: '#ff8400',
          500: '#ff8400',
          600: '#ff9230',
        },
        electric: {
          400: '#4077d1',
          500: '#21498a',
        },
        lime: {
          400: '#47d5a6',
          500: '#22946e',
        },
        warm: {
          300: '#8b8b8b',
          400: '#717171',
          600: '#3f3f3f',
          700: '#282828',
          800: '#121212',
          900: '#000000',
        },
      },
      fontFamily: {
        'tech': ['JetBrains Mono', 'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', 'monospace'],
        'modern': ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        'display': ['Inter', 'SF Pro Display', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'ripple': 'ripple 0.6s linear',
        'fade-in': 'fade-in 0.5s ease-out',
        'slide-up': 'slide-up 0.5s ease-out',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'scan': 'scan 3s linear infinite',
        'matrix': 'matrix 20s linear infinite',
        'cyber-pulse': 'cyber-pulse 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px #0ea5e9, 0 0 10px #0ea5e9, 0 0 15px #0ea5e9' },
          '100%': { boxShadow: '0 0 10px #0ea5e9, 0 0 20px #0ea5e9, 0 0 30px #0ea5e9' },
        },
        scan: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        matrix: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'cyber-pulse': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}

