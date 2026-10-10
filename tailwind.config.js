/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        atelier: {
          bg: '#FFF8FA',
          bgSecondary: '#FDF2F5',
          blush: '#FCE7ED',
          border: '#FBCFE8',
          accent: '#DB2777',
          heading: '#291D22',
          body: '#4E3C44',
          white: '#FFFFFF',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['"DM Sans"', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-gentle': 'floatGentle 4s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'drift-petal': 'driftPetal 14s linear infinite',
        'sparkle': 'sparkle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1.5deg)' },
        },
        floatGentle: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.6', transform: 'scale(0.95)' },
        },
        driftPetal: {
          '0%': { transform: 'translate(0, -10vh) rotate(0deg)', opacity: '0' },
          '15%': { opacity: '0.8' },
          '85%': { opacity: '0.8' },
          '100%': { transform: 'translate(60px, 110vh) rotate(360deg)', opacity: '0' },
        },
        sparkle: {
          '0%, 100%': { opacity: '0.2', transform: 'scale(0.8)' },
          '50%': { opacity: '1', transform: 'scale(1.2)' },
        }
      }
    },
  },
  plugins: [],
}
