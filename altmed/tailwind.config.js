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
        
        // Theme primary colors (Orange brand - warm, inviting)
        primary: {
          0: '#ff8400',
          10: '#ff9230',
          20: '#ffa04d',
          30: '#ffae66',
          40: '#ffbb80',
          50: '#ffc999',
          glow: 'rgba(255, 132, 0, 0.4)',
          DEFAULT: '#ff8400',
        },
        
        // Theme surface colors (Deep dark backgrounds)
        surface: {
          0: '#0a0a0a',
          5: '#111111',
          10: '#1a1a1a',
          15: '#222222',
          20: '#2a2a2a',
          25: '#333333',
          30: '#3d3d3d',
          40: '#525252',
          50: '#6b6b6b',
          60: '#858585',
          DEFAULT: '#0a0a0a',
        },
        
        // Theme tonal surface colors (Warm tinted backgrounds)
        'surface-tonal': {
          0: '#1a1510',
          10: '#2a231c',
          20: '#3a3228',
          30: '#4a4235',
          40: '#5a5242',
          50: '#6b6350',
          DEFAULT: '#1a1510',
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
          200: '#a8a8a8',
          300: '#8b8b8b',
          400: '#6b6b6b',
          500: '#525252',
          600: '#333333',
          700: '#1a1a1a',
          800: '#0a0a0a',
          900: '#000000',
        },
        
        // Accent glow colors
        glow: {
          orange: 'rgba(255, 132, 0, 0.5)',
          'orange-soft': 'rgba(255, 132, 0, 0.2)',
          blue: 'rgba(64, 119, 209, 0.5)',
          green: 'rgba(71, 213, 166, 0.5)',
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

