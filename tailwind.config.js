/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#262a33',
        'secondary': '#43ffaf',
        'caret': '#43ffaf',
        'sub': '#526777',
        'sub-alt': '#1f232c',
        'tertiary': '#e5f7ef',
        'error': '#ff5f5f',
        'error-extra': '#d22a2a'
      },
      fontFamily: {
        lexend: ["LEXEND"],
      },
    },
  },
  plugins: [],
}