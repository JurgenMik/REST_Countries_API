const defaultTheme = require('tailwindcss/defaultTheme');
module.exports = {
  content: ["./src/**/*.{html,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'sans' : ['Nunito Sans', ...defaultTheme.fontFamily.sans],
      }
    },
  },
  plugins: [],
}