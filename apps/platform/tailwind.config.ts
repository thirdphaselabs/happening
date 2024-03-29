import type { Config } from "tailwindcss";
import { sky, skyA, skyDark, skyDarkA, slate, slateA } from "@radix-ui/colors";

const config = {
  darkMode: ["class"],
  mode: "jit",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
    "../../packages/ui/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        ...sky,
        ...skyA,
        skyDark1: skyDark.sky1,
        skyDark2: skyDark.sky2,
        skyDark3: skyDark.sky3,
        skyDark4: skyDark.sky4,
        skyDark5: skyDark.sky5,
        skyDark6: skyDark.sky6,
        skyDark7: skyDark.sky7,
        skyDark8: skyDark.sky8,
        skyDark9: skyDark.sky9,
        skyDark10: skyDark.sky10,
        skyDark11: skyDark.sky11,
        skyDark12: skyDark.sky12,
        skyDarkA1: skyDarkA.skyA1,
        skyDarkA2: skyDarkA.skyA2,
        skyDarkA3: skyDarkA.skyA3,
        skyDarkA4: skyDarkA.skyA4,
        skyDarkA5: skyDarkA.skyA5,
        skyDarkA6: skyDarkA.skyA6,
        skyDarkA7: skyDarkA.skyA7,
        skyDarkA8: skyDarkA.skyA8,
        skyDarkA9: skyDarkA.skyA9,
        skyDarkA10: skyDarkA.skyA10,
        skyDarkA11: skyDarkA.skyA11,
        skyDarkA12: skyDarkA.skyA12,
        ...slate,
        ...slateA,
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "caret-blink": {
          "0%,70%,100%": { opacity: "1" },
          "20%,50%": { opacity: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "caret-blink": "caret-blink 1.25s ease-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
