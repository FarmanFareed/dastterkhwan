import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "#F6EFE3",
        paperDim: "#EFE5D3",
        ink: "#241C15",
        maroon: "#7A1F2B",
        maroonDark: "#5B141D",
        turmeric: "#C98A1F",
        teal: "#2F4538",
      },
      fontFamily: {
        display: ["var(--font-display)", "serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      maxWidth: {
        prose: "68ch",
      },
    },
  },
  plugins: [],
};
export default config;
