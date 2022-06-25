/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        primary: ['Josefin Sans', 'sans-serif'],
      },
      colors: {
        primary: '#131324',
        secondary: '#00000076',
        regborder: '#4e0eff',
        regfocus: '#997af0',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      borderWidth: {
        custom: '0.4rem',
      },
    },
  },
  plugins: [],
}
