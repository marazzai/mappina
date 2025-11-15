/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: '#7B42F6',
        'bg-primary': '#F5F5F7',
        'bg-dark': '#121212',
        'text-primary': '#1D1D1F',
        'text-secondary': '#515152',
        'secondary': '#FFFFFF',
        dark: '#4c1d95',
        music: '#7c3aed', // viola
        food: '#fb923c', // arancione
        art: '#f472b6', // rosa
        sport: '#34d399', // verde
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        glass: '0 4px 32px rgba(123,66,246,0.08)',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
