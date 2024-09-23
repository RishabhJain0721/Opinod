/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        League: ["League Spartan", "sans-serif"],
        Poppins: ["Poppins"],
        Playfair: ["Playfair Display"],
      },
    },
  },
  plugins: [],
};
