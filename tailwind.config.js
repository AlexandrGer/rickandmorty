/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.tsx", ".src/components/**/*.tsx"],
  theme: {
    screens: {
      m: "424px",
      sm: "539px",
      md: "767px",
      lg: "1023px",
      xl: "1279px",
    },
  },
  plugins: [],
};
