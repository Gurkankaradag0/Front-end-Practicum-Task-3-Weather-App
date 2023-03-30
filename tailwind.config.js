/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: '#463181',
        secondary: '#7a69a6',
        backdrop: '#030309',
        info: '#A29EAA',
      }
    },
  },
  plugins: [],
}
