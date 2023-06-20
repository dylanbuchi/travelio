/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      screens: {
        xs: "23rem",
        "max-height-813px": {
          raw: " (max-height: 813px)",
        },
        "mobile-tablet-landscape": {
          raw: "(orientation: landscape) and (hover: none) and (pointer: coarse) and (max-width: 1023px)",
        },
      },
    },
  },
  plugins: [],
};
