// @ts-ignore
import config from "@plaventi/tailwind-config/tailwind.config.js";
import { type Config } from "tailwindcss";

export default {
  ...config,
  mode: "jit",
  screens: {
    initial: "0px",
    xs: "520px",
    sm: "768px",
    md: "1024px",
    lg: "1280px",
    xl: "1640px",
  },
  content: ["./src/**/*.html", "./src/**/*.tsx"],
} satisfies Config;
