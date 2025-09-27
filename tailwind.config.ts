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
          glow: "hsl(var(--secondary-glow))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          glow: "hsl(var(--accent-glow))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        glass: "hsl(var(--glass))",
        'glass-border': "hsl(var(--glass-border))",
        particle: {
          1: "hsl(var(--particle-1))",
          2: "hsl(var(--particle-2))",
          3: "hsl(var(--particle-3))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      backgroundImage: {
        'gradient-hero': 'var(--gradient-hero)',
        'gradient-glass': 'var(--gradient-glass)',
        'gradient-neon': 'var(--gradient-neon)',
      },
      boxShadow: {
        'glass': 'var(--shadow-glass)',
        'glow-primary': 'var(--glow-primary)',
        'glow-secondary': 'var(--glow-secondary)',
        'glow-accent': 'var(--glow-accent)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'particle-float': 'particle-float 20s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'neon-flicker': 'neon-flicker 1.5s ease-in-out infinite',
        'slide-up': 'slide-up 0.6s ease-out',
        'scale-in': 'scale-in 0.4s ease-out',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
