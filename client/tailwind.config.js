/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gold: {
          dark: "#B0915D",
          light: "#DDC18E",
        },
        
        card: "#2D2D2D",
        side: "#0F0F0F",
        content: "#0F0F0F",
        black: "#000000",
        mainbg: "#f3f4f6",
      },
    },
  },
  plugins: [],
};
