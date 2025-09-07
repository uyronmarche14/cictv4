/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  // Aggressive CSS purging for production
  purge: {
    enabled: process.env.NODE_ENV === "production",
    content: [
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    options: {
      // Minimal safelist - only absolutely necessary classes
      safelist: [
        "dark",
        "light",
        // Only essential animations
        "animate-pulse",
        "animate-spin",
        // Only used dynamic classes
        /^bg-(background|primary|secondary|accent|muted|card)$/,
        /^text-(foreground|primary|secondary|accent|muted)$/,
        /^border-(border|primary|secondary|accent)$/,
        // Essential responsive breakpoints only
        /^(md|lg):(flex|grid|hidden|block)$/,
      ],
      // Aggressive unused removal
      keyframes: true,
      fontFace: true,
      variables: true,
    },
  },
  // Disable unused core plugins to reduce bundle size
  corePlugins: {
    // Disable plugins not used in the project
    container: false,
    float: false,
    clear: false,
    skew: false,
    caretColor: false,
    sepia: false,
    backdropSepia: false,
    backdropHueRotate: false,
    // Keep only essential plugins
    preflight: true,
    accessibility: true,
    pointerEvents: true,
    visibility: true,
    position: true,
    inset: true,
    zIndex: true,
    order: true,
    gridColumn: true,
    gridColumnStart: true,
    gridColumnEnd: true,
    gridRow: true,
    gridRowStart: true,
    gridRowEnd: true,
    margin: true,
    padding: true,
    space: true,
    width: true,
    minWidth: true,
    maxWidth: true,
    height: true,
    minHeight: true,
    maxHeight: true,
    fontSize: true,
    fontWeight: true,
    lineHeight: true,
    textAlign: true,
    textColor: true,
    backgroundColor: true,
    borderRadius: true,
    borderWidth: true,
    borderColor: true,
    display: true,
    flexDirection: true,
    flexWrap: true,
    alignItems: true,
    justifyContent: true,
    gap: true,
    gridTemplateColumns: true,
    gridTemplateRows: true,
  },
  theme: {
    extend: {
      fontFamily: {
        heading: ["Blockletter", "sans-serif"],
      },
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
      },
      borderRadius: {
        lg: "var(--radius-lg)",
        md: "var(--radius-md)",
        sm: "var(--radius-sm)",
        xl: "var(--radius-xl)",
      },
    },
  },
  plugins: [],
};
