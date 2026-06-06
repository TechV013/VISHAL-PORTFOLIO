import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["var(--font-body)", "Inter", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "Fraunces", "Georgia", "serif"],
        serif: ["var(--font-display)", "Fraunces", "Georgia", "serif"],
        mono: ["var(--font-mono)", "JetBrains Mono", "Consolas", "monospace"],
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        bg: "hsl(var(--bg))",
        "bg-2": "hsl(var(--bg-2))",
        "bg-3": "hsl(var(--bg-3))",
        surface: "hsl(var(--surface))",
        "surface-2": "hsl(var(--surface-2))",
        ink: "hsl(var(--ink))",
        "ink-2": "hsl(var(--ink-2))",
        muted: "hsl(var(--muted))",
        dim: "hsl(var(--dim))",
        gold: "hsl(var(--gold))",
        "gold-bright": "hsl(var(--gold-bright))",
        "gold-deep": "hsl(var(--gold-deep))",
        cobalt: "hsl(var(--cobalt))",
        rose: "hsl(var(--rose))",
        emerald: "hsl(var(--emerald))",
        amber: "hsl(var(--amber))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      borderRadius: {
        none: "0",
        sm: "2px",
        DEFAULT: "2px",
        md: "4px",
        lg: "6px",
        xl: "8px",
        "2xl": "12px",
        "3xl": "16px",
        full: "9999px",
      },
      keyframes: {
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "text-rise": {
          from: { opacity: "0", transform: "translateY(110%)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        blink: {
          "0%, 50%": { opacity: "1" },
          "50.01%, 100%": { opacity: "0" },
        },
        "slide-up": {
          from: { opacity: "0", transform: "translateY(24px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in": "fade-in 0.4s ease-out forwards",
        marquee: "marquee 40s linear infinite",
        blink: "blink 1.2s step-end infinite",
        "slide-up": "slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
    },
  },
  plugins: [],
} satisfies Config;
