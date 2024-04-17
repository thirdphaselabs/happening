// @ts-ignore
import config from "@plaventi/tailwind-config/tailwind.config.js";
import { type Config } from "tailwindcss";

export default {
  ...config,
  mode: "jit",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}",
  ],
  screens: {
    initial: "0px",
    xs: "520px",
    sm: "768px",
    md: "1024px",
    lg: "1280px",
    xl: "1640px",
  },
  theme: {
    extend: {
      colors: {
        "brand-navy": "#0C1324",
        "sky-transparent": "rgba(33, 188, 226, 0.4)",
        white15: "rgba(255, 255, 255, 0.15)",
      },
    },
  },
} satisfies Config;
