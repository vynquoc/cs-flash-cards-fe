/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        prim: {
          500: "#164863",
          400: "#427D9D",
          300: "#9BBEC8",
          200: "DDF2FD",
        },
      },
    },
  },
  plugins: [],
};
