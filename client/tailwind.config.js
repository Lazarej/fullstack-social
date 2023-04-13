/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      robotoL: ["RobotoL", "cursive"],
      robotoR: ["RobotoR", "cursive"],
      robotoB: ["RobotoB", "cursive"],
      monumentR: ["MonumentR", "cursive"],
      monumentB: ["MonumentB", "cursive"],
    },
    colors: {
      primary: "#FE724C",
      white: "rgba(255,255,255,1)",
      greyN: "rgba(0,0,0,0.7)",
      greyL: "rgba(0,0,0,0.25)",
      greyUL: "rgba(0,0,0,0.06)",
    },
  },
  plugins: [],
};
