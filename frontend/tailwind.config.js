// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e6f2f8',
          100: '#b3d9e8',
          200: '#80c0d8',
          300: '#4da7c8',
          400: '#1a8eb8',
          500: '#184E77',
          600: '#1E6091',
          700: '#164a6f',
          800: '#0e364d',
          900: '#06222b',
        },
        accent: {
          yellow: '#d9ed92',
          light: '#f0f9ff',
        },
      },
      boxShadow: {
        'soft': '0 2px 15px rgba(0, 0, 0, 0.08)',
        'medium': '0 4px 20px rgba(0, 0, 0, 0.12)',
        'large': '0 10px 30px rgba(0, 0, 0, 0.15)',
        'glow': '0 0 20px rgba(24, 78, 119, 0.3)',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'scale-in': {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-in-right': {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'pulse-slow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'zoom-out': {
          '0%': { transform: 'scale(1.15)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 1s ease-out forwards',
        'scale-in': 'scale-in 0.8s ease-out forwards',
        'fade-in': 'fade-in 1.2s ease-out forwards',
        'slide-in-right': 'slide-in-right 0.5s ease-out forwards',
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'zoom-out': 'zoom-out 8s ease-in-out infinite alternate',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #184E77 0%, #1E6091 100%)',
        'gradient-light': 'linear-gradient(135deg, #f0f9ff 0%, #ffffff 100%)',
        'gradient-overlay': 'linear-gradient(to bottom, rgba(24, 78, 119, 0.8), rgba(30, 96, 145, 0.6))',
      },
    },
  },
  plugins: [],
}
