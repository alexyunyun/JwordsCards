/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#1e1e1e',
          text: '#f0f0f0',
          accent: '#4fc3f7'
        }
      },
      fontFamily: {
        'japanese': ['Noto Sans JP', 'sans-serif'],
        'chinese': ['Source Han Sans', 'sans-serif']
      },
      backdropBlur: {
        'glass': '10px'
      }
    },
  },
  plugins: [],
}