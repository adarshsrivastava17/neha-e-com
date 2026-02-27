import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        blush: "#FBE8EC",
        nude: "#EEDBD0",
        ivory: "#FFFDF9",
        gold: "#C9A96A",
        charcoal: "#2F2A2A"
      },
      boxShadow: {
        luxe: "0 10px 35px rgba(201,169,106,0.25)"
      },
      animation: {
        shimmer: "shimmer 2s linear infinite"
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      }
    }
  },
  plugins: []
};

export default config;
