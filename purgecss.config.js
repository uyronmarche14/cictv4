module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  css: [".next/static/**/*.css"],
  output: ".next/static/optimized/",

  // Aggressive purging options
  defaultExtractor: (content) => {
    // Extract all possible class names, including dynamic ones
    const broadMatches = content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
    const innerMatches = content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
    return broadMatches.concat(innerMatches);
  },

  // Safelist only essential classes
  safelist: {
    standard: [
      // Theme classes
      "dark",
      "light",

      // Essential layout classes
      "max-w-7xl",
      "mx-auto",
      "px-4",
      "px-6",
      "px-8",

      // Essential display classes
      "flex",
      "flex-col",
      "grid",
      "hidden",
      "block",

      // Essential spacing
      "space-y-4",
      "space-y-6",
      "gap-4",
      "gap-6",

      // Essential colors
      "bg-background",
      "bg-primary",
      "bg-secondary",
      "bg-accent",
      "text-foreground",
      "text-primary",
      "text-secondary",
      "text-accent",

      // Essential animations
      "animate-pulse",
    ],

    // Dynamic classes that might be generated
    deep: [
      /^bg-(primary|secondary|accent|muted|card)$/,
      /^text-(primary|secondary|accent|muted)-foreground$/,
      /^border-(primary|secondary|accent)$/,
    ],

    // Responsive variants for essential classes only
    greedy: [/^(sm|md|lg):(flex|grid|hidden|block|px-\d+)$/],
  },

  // Remove unused keyframes and font-faces
  keyframes: true,
  fontFace: true,
  variables: true,

  // Aggressive whitespace removal
  rejected: true,
  rejectedCss: ".next/static/rejected.css", // For debugging
};
