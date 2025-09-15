import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
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
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))",
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
      fontFamily: {
        'heading': ['var(--font-heading)'],
        'orbitron': ['var(--font-orbitron)'],
        'body': ['var(--font-body)'],
      },
      backgroundImage: {
        'gradient-neural': 'var(--gradient-neural)',
        'gradient-glow': 'var(--gradient-glow)',
        'gradient-form': 'var(--gradient-form)',
      },
      boxShadow: {
        'neural': 'var(--shadow-neural)',
        'holographic': 'var(--shadow-holographic)',
        'glow-pulse': 'var(--glow-pulse)',
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
        "neural-pulse": {
          "0%, 100%": { opacity: "0.3" },
          "50%": { opacity: "1" },
        },
        "particle-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "25%": { transform: "translateY(-10px) rotate(90deg)" },
          "50%": { transform: "translateY(-5px) rotate(180deg)" },
          "75%": { transform: "translateY(-15px) rotate(270deg)" },
        },
        "holographic-scan": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
        "glitch": {
          "0%, 100%": { transform: "translateX(0)" },
          "20%": { transform: "translateX(-2px)" },
          "40%": { transform: "translateX(2px)" },
          "60%": { transform: "translateX(-1px)" },
          "80%": { transform: "translateX(1px)" },
        },
        "progress-glow": {
          "0%, 100%": { boxShadow: "0 0 5px hsl(var(--primary))" },
          "50%": { boxShadow: "0 0 20px hsl(var(--primary)), 0 0 30px hsl(var(--primary-glow))" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "neural-pulse": "neural-pulse 3s ease-in-out infinite",
        "particle-float": "particle-float 6s ease-in-out infinite",
        "holographic-scan": "holographic-scan 3s ease-in-out infinite",
        "glitch": "glitch 0.3s ease-in-out",
        "progress-glow": "progress-glow 2s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
