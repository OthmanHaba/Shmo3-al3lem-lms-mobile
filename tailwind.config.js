/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
    fontFamily: {
      primary: ["Cairo-Regular", "sans-serif"],
    }
  },
  plugins: [],
}

