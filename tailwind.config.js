/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#FFF5F8',
        surface: {
          DEFAULT: '#FFFFFF',
          soft: '#FFF9FB',
          elevated: '#FFFFFF',
        },
        primary: {
          DEFAULT: '#D81B60',
          strong: '#B80058',
          dark: '#880E4F',
          soft: '#FFD6E4',
          light: '#FFEAF2',
        },
        lavender: {
          DEFAULT: '#7E57C2',
          soft: '#EDE7F6',
          strong: '#512DA8',
        },
        peach: {
          DEFAULT: '#E64A19',
          soft: '#FBE9E7',
          strong: '#BF360C',
        },
        yellow: {
          DEFAULT: '#F57F17',
          soft: '#FFF8E1',
          strong: '#E65100',
        },
        sky: {
          DEFAULT: '#0288D1',
          soft: '#E1F5FE',
          strong: '#01579B',
        },
        storyText: {
          primary: '#1A0D18',
          secondary: '#381E30',
          muted: '#5C354E',
          light: '#7E516E',
        },
        polaroid: {
          frame: '#FFFFFF',
          border: '#F48FB1',
          text: '#1A0D18',
        }
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'Alexandria', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['Alexandria', 'Inter', 'Tajawal', 'system-ui', 'sans-serif'],
        arabic: ['"Alexandria"', '"Amiri"', '"Tajawal"', 'sans-serif'],
        handwriting: ['"Amiri"', '"Caveat"', 'cursive'],
      },
      boxShadow: {
        'soft-pink': '0 8px 25px -4px rgba(216, 27, 96, 0.3), 0 4px 10px -2px rgba(216, 27, 96, 0.15)',
        'card': '0 12px 35px -8px rgba(26, 13, 24, 0.16), 0 4px 10px -2px rgba(26, 13, 24, 0.08)',
        'card-hover': '0 20px 45px -10px rgba(216, 27, 96, 0.35), 0 8px 16px -3px rgba(26, 13, 24, 0.12)',
        'pill': '0 4px 16px rgba(184, 0, 88, 0.15)',
        'cake': '0 20px 40px -10px rgba(216, 27, 96, 0.3)',
      },
      animation: {
        'float-slow': 'floatSlow 6s ease-in-out infinite',
        'float-reverse': 'floatReverse 7s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'flicker': 'candleFlicker 1.4s ease-in-out infinite alternate',
      },
      keyframes: {
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(-8px) rotate(1deg)' },
        },
        floatReverse: {
          '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
          '50%': { transform: 'translateY(6px) rotate(-1deg)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.6', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.04)' },
        },
        candleFlicker: {
          '0%, 100%': { transform: 'scale(1) skewX(0deg)', opacity: '0.95' },
          '25%': { transform: 'scale(1.06, 0.96) skewX(1.2deg)', opacity: '1' },
          '50%': { transform: 'scale(0.96, 1.04) skewX(-1deg)', opacity: '0.9' },
          '75%': { transform: 'scale(1.03, 0.98) skewX(0.8deg)', opacity: '0.98' },
        }
      }
    },
  },
  plugins: [],
}
