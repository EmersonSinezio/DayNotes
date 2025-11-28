/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      colors: {
        brand: "#6C5DD3",
        brandDark: "#5b4ec2",
        pastelBlue: "#E2EAFE",
        pastelOrange: "#FFF0D9",
        pastelPink: "#FBE4F0",
        pastelCyan: "#D6F3F5",
      },
      animation: {
        "fade-up": "fadeUp 0.8s ease-out forwards",
        "pop-in": "popIn 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        popIn: {
          "0%": {
            opacity: "0",
            transform: "scale(0.9) translateY(10px)",
          },
          "100%": { opacity: "1", transform: "scale(1) translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
