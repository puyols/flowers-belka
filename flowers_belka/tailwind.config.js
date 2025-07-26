/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
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
        border: "var(--color-border)", /* forest-green-opacity */
        input: "var(--color-input)", /* warm-white */
        ring: "var(--color-ring)", /* deep-forest-green */
        background: "var(--color-background)", /* pure-white */
        foreground: "var(--color-foreground)", /* rich-black */
        primary: {
          DEFAULT: "var(--color-primary)", /* deep-forest-green */
          foreground: "var(--color-primary-foreground)", /* pure-white */
        },
        secondary: {
          DEFAULT: "var(--color-secondary)", /* warm-earth-brown */
          foreground: "var(--color-secondary-foreground)", /* pure-white */
        },
        destructive: {
          DEFAULT: "var(--color-destructive)", /* warm-brown */
          foreground: "var(--color-destructive-foreground)", /* pure-white */
        },
        muted: {
          DEFAULT: "var(--color-muted)", /* warm-white */
          foreground: "var(--color-muted-foreground)", /* clear-gray */
        },
        accent: {
          DEFAULT: "var(--color-accent)", /* soft-gold */
          foreground: "var(--color-accent-foreground)", /* rich-black */
        },
        popover: {
          DEFAULT: "var(--color-popover)", /* pure-white */
          foreground: "var(--color-popover-foreground)", /* rich-black */
        },
        card: {
          DEFAULT: "var(--color-card)", /* pure-white */
          foreground: "var(--color-card-foreground)", /* rich-black */
        },
        success: {
          DEFAULT: "var(--color-success)", /* natural-green */
          foreground: "var(--color-success-foreground)", /* pure-white */
        },
        warning: {
          DEFAULT: "var(--color-warning)", /* amber-tone */
          foreground: "var(--color-warning-foreground)", /* rich-black */
        },
        error: {
          DEFAULT: "var(--color-error)", /* warm-brown */
          foreground: "var(--color-error-foreground)", /* pure-white */
        },
        surface: "var(--color-surface)", /* warm-white */
        "text-primary": "var(--color-text-primary)", /* rich-black */
        "text-secondary": "var(--color-text-secondary)", /* clear-gray */
      },
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'inter': ['Inter', 'sans-serif'],
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
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
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        "petal-float": {
          "0%, 100%": { transform: "translateY(0px) rotate(0deg)" },
          "50%": { transform: "translateY(-10px) rotate(2deg)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-in": "slide-in 0.3s ease-out",
        "petal-float": "petal-float 15s ease-in-out infinite",
      },
      boxShadow: {
        'botanical': '0 4px 16px rgba(45, 90, 61, 0.08)',
        'botanical-sm': '0 2px 8px rgba(45, 90, 61, 0.06)',
        'botanical-lg': '0 12px 24px rgba(45, 90, 61, 0.15)',
      },
      transitionTimingFunction: {
        'botanical': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}