/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primray': '#464E73',
        'secondry': '#F5A437',
        'thered': '#EE5E54',
      },
    },
    fontFamily: {
      primary: ["Cairo-Regular", "sans-serif"],
    }
  },
  plugins: [],
}

