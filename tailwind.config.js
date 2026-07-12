export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b0e14",
        panel: "#131822",
        border: "#232a38",
        accent: "#ff5c5c",
        good: "#4ade80",
        warn: "#facc15",
        bad: "#f87171",
      },
      fontFamily: {
        mono: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [],
};