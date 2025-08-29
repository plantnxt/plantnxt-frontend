/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // enables `.dark`
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        primary: {
          DEFAULT: "#007C91",
          900: "hsl(193 100% 22%)", // #00566E Darkest — sidebar active, hover
          800: "hsl(193 100% 25%)", // #006778 Darker base
          700: "hsl(193 100% 28%)", // #007C91 base
          600: "hsl(193 100% 32%)", // #008FA1 Lighter — hover CTA
          500: "hsl(193 70% 40%)",  // #22A1B3 Border, subtle UI fills
          400: "hsl(193 60% 50%)",  // #4CB7C6 Tags, soft backgrounds
          300: "hsl(193 50% 65%)",  // #7DD1DB Light backgrounds
          200: "hsl(193 50% 80%)",  // #A7E5EA Very light
          100: "hsl(193 50% 90%)",  // #D2F4F6 Subtle background tint
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
        success: {
          DEFAULT: "hsl(var(--success))",
          foreground: "hsl(var(--success-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-family-base)", "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
