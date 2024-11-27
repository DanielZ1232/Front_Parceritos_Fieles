/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      margin: {
        '-20': '-5rem', // Mueve 5rem (80px) hacia la izquierda
        '-24': '-6rem', // Mueve 6rem (96px) hacia la izquierda
        '-17': '-8rem', // Mueve 8rem (128px) hacia la izquierda
      },
    },
  },
  plugins: [],
}