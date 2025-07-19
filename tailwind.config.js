// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = { // Lưu ý: Với v3, thường là module.exports, nhưng Vite cũng hiểu export default
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}", // Dòng này rất quan trọng
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}