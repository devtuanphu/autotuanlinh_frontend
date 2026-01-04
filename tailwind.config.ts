import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "brand-dark": {
          DEFAULT: "#172122", // Màu chính của header và footer
          light: "#1F2F2F",
          lighter: "#273D3D",
        },
        "brand-accent": {
          DEFAULT: "#3D8F9E", // Màu teal/green sáng của logo
          light: "#4DAFBE",
          dark: "#2D7F8E",
        },
        "brand-gold": {
          DEFAULT: "#C4A650",
          light: "#D4B660",
          dark: "#B59A45",
        },
        "brand-red": "#D30000",
      },
      fontFamily: {
        sans: ["var(--font-roboto)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
