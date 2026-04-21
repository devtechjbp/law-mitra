import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#101820",
        charcoal: "#1a1f2e",
        gold: {
          DEFAULT: "#C5B358",
          light: "#d4c46a",
          dark: "#a89640",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "shimmer": "shimmer 2s linear infinite",
        "pulse-gold": "pulse-gold 2.5s ease-in-out infinite",
        "border-run": "border-run 2s linear infinite",
        "float-particle": "float-particle 8s ease-in-out infinite",
        "ticker-scroll": "ticker-scroll 35s linear infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "scale-in": "scale-in 0.3s ease",
        "slide-up": "slide-up 0.8s ease",
        "slide-down": "slide-down 0.3s ease",
        "bot-float": "bot-float 3s ease-in-out infinite",
        "ripple": "ripple 2s ease-out infinite",
        "rotate-slow": "rotate-slow 20s linear infinite",
      },
      boxShadow: {
        "neon-gold": "0 0 20px rgba(197, 179, 88, 0.6), 0 0 40px rgba(197, 179, 88, 0.3)",
        "glass": "0 8px 32px rgba(0, 0, 0, 0.5)",
      },
    },
  },
  plugins: [],
};

export default config;
