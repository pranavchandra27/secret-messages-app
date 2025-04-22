import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        brown: "#5D4037",   // deep, warm brown
        cream: "#FFFFFF",   // pure white
        accent: "#C8A2C8",   // light lavender
      },
      spacing: {
        18: "4.5rem",       // extra gap for breathing
      },
    },
  },
  plugins: [],
} satisfies Config;
