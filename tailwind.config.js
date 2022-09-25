/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{js,html}",
    "./public/*.{js,html}"
  ],
  theme: {
    extend: {colors: {
      "cyangreen": {
        "50": "#E5FFF9",
        "100": "#CCFFF4",
        "200": "#99FFE9",
        "300": "#66FFDE",
        "400": "#33FFD3",
        "500": "#00FCC6",
        "600": "#00CCA0",
        "700": "#009978",
        "800": "#006650",
        "900": "#003328"
      }
    }
  }
  },
  plugins: [],

}

