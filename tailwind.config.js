/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "class", // Redux slice will toggle 'dark' class on <html>
  theme: {
    extend: {
      colors: {
        esblack: "#222222",
        esyellow: "#ffc001",
        eswhite: "#ffffff",
        esorange: "#ec910d",
        esdarkblack: "#1b1922",
        esbrown: "#1b1716",
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
