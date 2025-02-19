/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: [
    // apps content
    `app/**/*.{js,ts,jsx,tsx}`,
    `src/**/*.{js,ts,jsx,tsx}`,
    `./pages/**/*.{js,ts,jsx,tsx}`,
    `./components/**/*.{js,ts,jsx,tsx}`,
    // packages content
    "../../packages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
