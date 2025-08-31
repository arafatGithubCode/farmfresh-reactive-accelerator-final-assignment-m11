import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      keyframes: {
        "bounce-skew": {
          "0%": { transform: "translateY(0) skew(0deg, 0deg)" },
          "20%": { transform: "translateY(-12px) skew(-3deg, -3deg)" },
          "40%": { transform: "translateY(0) skew(2deg, 2deg)" },
          "60%": { transform: "translateY(-6px) skew(-2deg, -2deg)" },
          "80%": { transform: "translateY(0) skew(1deg, 1deg)" },
          "100%": { transform: "translateY(0) skew(0deg, 0deg)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        "fade-up": {
          "0%": { transform: "translateY(50px)", opacity: "0" },
          "100%": { transform: "translateY(0px)", opacity: "1" },
        },
      },
      animation: {
        "bounce-skew": "bounce-skew 1s ease-in-out",
        spin: "spin 1s linear infinite",
        "fade-up": "fade-up 500ms ease-in",
      },
      colors: {
        primary: {
          50: "#f0fdf4",
          100: "#dcfce7",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
      },
    },
  },
  plugins: [],
};
export default config;
