/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", ...defaultTheme.fontFamily.sans],
      },
      boxShadow: {
        custom: '0px 3px 13px 0px rgba(276, 276, 276, 0.40)',
      }
    },
  },
  plugins: [],
};
