/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  plugins: [
    require('preline/plugin'),
    require("daisyui"),
  ],
}