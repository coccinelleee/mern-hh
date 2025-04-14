/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#004AAD",
        secondary: "#FFCA28",
        background: "#F7F7F7",
        textBgLight: "#ADD5FF",
        textBgSoft: "#FFEBC1",
      },
      fontFamily: {
        primary: ['Roboto', 'sans-serif'],     // основной шрифт
        secondary: ['Outfit', 'serif'],        // дополнительный 
      },
    },
  },
  plugins: [],
}
