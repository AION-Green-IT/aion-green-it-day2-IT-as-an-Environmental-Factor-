import type { Config } from "tailwindcss";

// Brand tokens — section 3 of the build prompt.
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#231A45",
        purple: "#5624D0",
        lilac: "#EEE9F9",
        ink: "#1B1230",
        ash: "#6B6484",
        paper: "#FFFFFF",
        line: "#D9D3EA",
        good: "#2F9E5A",
        warn: "#C0721D",
        danger: "#B33A3A",
        // Area tag colours — neutral in feel, not good/bad.
        cat: {
          operations: "#F1B24A",
          procurement: "#6E8DC1",
          use: "#B389D6",
          replacement: "#6FB56A",
          storage: "#3F3552",
        },
      },
      fontFamily: {
        sans: ['Calibri', 'Segoe UI', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      fontSize: {
        h1: ["32px", { lineHeight: "40px", fontWeight: "600" }],
        h2: ["24px", { lineHeight: "32px", fontWeight: "600" }],
        h3: ["18px", { lineHeight: "26px", fontWeight: "600" }],
        body: ["16px", { lineHeight: "24px" }],
        caption: ["13px", { lineHeight: "18px" }],
        readout: ["18px", { lineHeight: "24px", fontWeight: "600" }],
      },
      boxShadow: {
        sm: "0 1px 2px rgba(35,26,69,0.06)",
        lg: "0 12px 32px rgba(35,26,69,0.18)",
      },
    },
  },
  plugins: [],
};

export default config;
