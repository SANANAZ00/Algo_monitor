import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          950: "#08170f",
          900: "#0c2219",
          800: "#12332a",
          700: "#1a4a3a",
          600: "#256049",
        },
        gold: { DEFAULT: "#c9a54a", soft: "#e2c677" },
        cream: "#f3e9d2",
        coral: "#ea9372",
        mint: "#86d08f",
        leaf: "#4f9a3b",
      },
      fontFamily: {
        sans: ['"Inter Variable"', "system-ui", "sans-serif"],
        serif: ['"Fraunces Variable"', "Georgia", "serif"],
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-18px) rotate(4deg)" },
        },
        drift: {
          "0%,100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(14px)" },
        },
        flow: {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "200% 50%" },
        },
        ring: {
          "0%": { transform: "scale(.9)", opacity: "0.6" },
          "100%": { transform: "scale(1.6)", opacity: "0" },
        },
      },
      animation: {
        float: "float 7s ease-in-out infinite",
        "float-slow": "float 11s ease-in-out infinite",
        drift: "drift 9s ease-in-out infinite",
        flow: "flow 3s linear infinite",
        ring: "ring 2.4s ease-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
