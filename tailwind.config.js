/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}", "./public/*.{html,js}", "./protected/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
