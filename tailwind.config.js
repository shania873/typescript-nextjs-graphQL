/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    animation: ["responsive", "hover", "focus"],
  },
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      xs: "320px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    container: {
      center: true,
    },
    extend: {
      colors: {
        "regal-blue": "#00A4C6",
        "regal-blue-gradient":
          "linear-gradient(180deg, rgba(0,105,176,1) 0%, rgba(23,154,244,1) 100%)",
        "regal-blue-50": "#039fe3",
        "button-blue": "#0077c8",
        "custom-gradientcolor1": "rgba(0,105,176,1)",
        "custom-gradientcolor2": "rgba(23,154,244,1)",
        "custom-opacity-blue": "rgb(0 255 255 / 50%)",
        "custom-orangeBrun": "#d1623b",
        "blue-menu": "#069edc",
        "bordeau-videoBouton": "#c81682",
      },
      keyframes: {
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
      },
      animation: {
        "fade-in": "fade-in 0.5s ease-out",
      },
    },
  },
  plugins: [],
};
