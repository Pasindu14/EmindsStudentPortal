/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['"PT Sans"', "sans-serif"],
    },
  },
  plugins: [require("daisyui")],
};
