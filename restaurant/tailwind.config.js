/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "#ffc001",
        secondary: "#ff9c01",
        black: "#000000",
        white: "#FFFFFF",
        muted: "#F3F4F6",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        heading: ["Poppins", ...defaultTheme.fontFamily.sans],
      },
      borderRadius: {
        "2xl": "1.5rem",
        "3xl": "2rem",
      },
      boxShadow: {
        "xl-soft": "0 15px 30px rgba(0,0,0,0.15)",
        "glow-primary": "0 0 30px rgba(255,192,1,0.55)",
      },
      keyframes: {
        // matches class: animate-bounce-shadow-black
        "bounce-shadow-black": {
          "0%, 100%": {
            transform: "translateY(0)",
            boxShadow: "0 15px 30px rgba(0,0,0,0.40)",
          },
          "50%": {
            transform: "translateY(-14px)",
            boxShadow: "0 25px 45px rgba(0,0,0,0.55)",
          },
        },
        // matches class: animate-circleBounce
        circleBounce: {
          "0%": { transform: "translate(0, 0)" },
          "25%": { transform: "translate(12px, -12px)" },
          "50%": { transform: "translate(0, -22px)" },
          "75%": { transform: "translate(-12px, -12px)" },
          "100%": { transform: "translate(0, 0)" },
        },
        // handy generics
        "fade-in": {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 },
        },
        "slide-in-left": {
          "0%": { transform: "translateX(-60px)", opacity: 0 },
          "100%": { transform: "translateX(0)", opacity: 1 },
        },
        "spin-slow": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        "bounce-shadow-black": "bounce-shadow-black 4s ease-in-out infinite",
        circleBounce: "circleBounce 10s ease-in-out infinite",
        "fade-in": "fade-in 0.6s ease-out both",
        "slide-in-left": "slide-in-left 0.8s cubic-bezier(.2,.65,.3,1) both",
        "spin-slow": "spin-slow 6s linear infinite",
        "gradient-x": "gradient-x 8s ease infinite",
      },
    },
  },
  plugins: [],
};
