/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#09070D',
          primary: '#12101A',
          secondary: '#1A1723',
          elevated: '#24202F',
        },
        storyText: {
          primary: '#FFF8F3',
          secondary: '#CFC6D0',
          muted: '#8F8793',
        },
        roseAccent: {
          DEFAULT: '#EFA6B8',
          soft: '#F6C6D5',
        },
        champagne: {
          DEFAULT: '#E8C98A',
          glow: '#F4DFA8',
        },
        lavender: {
          DEFAULT: '#B9A7D8',
          soft: '#D2C5E8',
        },
        polaroid: {
          frame: '#F5EEE7',
          text: '#332B30',
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
        handwriting: ['"Caveat"', 'cursive'],
      },
      boxShadow: {
        'soft-depth': '0 20px 60px rgba(0, 0, 0, 0.45)',
        'rose-glow': '0 0 40px rgba(239, 166, 184, 0.22)',
        'champagne-glow': '0 0 50px rgba(232, 201, 138, 0.32)',
        'lavender-glow': '0 0 45px rgba(185, 167, 216, 0.25)',
        'polaroid': '0 12px 35px -8px rgba(0, 0, 0, 0.6), 0 4px 12px -2px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'flicker': 'candleFlicker 1.5s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s linear infinite',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-10px) rotate(1deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(8px) rotate(-1.5deg)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.06)' },
        },
        candleFlicker: {
          '0%, 100%': { transform: 'scale(1) skewX(0deg)', opacity: '0.95' },
          '25%': { transform: 'scale(1.08, 0.95) skewX(1.5deg)', opacity: '1' },
          '50%': { transform: 'scale(0.96, 1.05) skewX(-1deg)', opacity: '0.88' },
          '75%': { transform: 'scale(1.04, 0.98) skewX(0.8deg)', opacity: '0.96' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
