/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx}", "./components/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FFF9F3",
        beige: "#F5E6D3",
        brown: "#3B2A22",
        gold: "#C89B3C",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
      borderRadius: {
        xl2: "18px",
      },
      boxShadow: {
        soft: "0 4px 20px rgba(59, 42, 34, 0.08)",
        softer: "0 2px 10px rgba(59, 42, 34, 0.05)",
      },
      keyframes: {
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: { shimmer: "shimmer 1.5s infinite" },
    },
  },
  plugins: [],
};
