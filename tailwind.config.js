/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#7c3aed', // viola elegante
          light: '#a78bfa',
          dark: '#4c1d95',
        },
        music: '#7c3aed', // viola
        food: '#fb923c', // arancione
        art: '#f472b6', // rosa
        sport: '#34d399', // verde
      },
      fontFamily: {
        sans: ['Inter', 'Arial', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
