/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          light: '#FDF8EF',
          DEFAULT: '#FAF0DC',
          dark: '#F0E4C8',
        },
        'leaf-green': {
          light: '#6B8E4E',
          DEFAULT: '#4A7C3F',
        },
        golden: {
          DEFAULT: '#C5A44E',
          dark: '#A08530',
        },
        'warm-brown': {
          light: '#8B7355',
          DEFAULT: '#6B4E2E',
        },
        'dark-green': {
          light: '#2D4A2D',
          DEFAULT: '#1A3A1A',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans Telugu"', 'sans-serif'],
        serif: ['"Tiro Telugu"', 'serif'],
      },
      backgroundImage: {
        'hero-texture': "url('/images/hero_background_1785512169900.png')",
      }
    },
  },
  plugins: [],
}
