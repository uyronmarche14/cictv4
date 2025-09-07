const config = {
  plugins: [
    "@tailwindcss/postcss",
    // CSS optimization plugins for production
    ...(process.env.NODE_ENV === "production"
      ? [
          // PurgeCSS for aggressive unused CSS removal
          [
            "@fullhuman/postcss-purgecss",
            {
              content: [
                "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
                "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
              ],
              defaultExtractor: (content) => {
                // Extract all possible class names
                const broadMatches =
                  content.match(/[^<>"'`\s]*[^<>"'`\s:]/g) || [];
                const innerMatches =
                  content.match(/[^<>"'`\s.()]*[^<>"'`\s.():]/g) || [];
                return broadMatches.concat(innerMatches);
              },
              safelist: {
                standard: [
                  "dark",
                  "light",
                  "max-w-7xl",
                  "mx-auto",
                  "px-4",
                  "px-6",
                  "px-8",
                  "flex",
                  "flex-col",
                  "grid",
                  "hidden",
                  "block",
                  "space-y-4",
                  "space-y-6",
                  "gap-4",
                  "gap-6",
                  "bg-background",
                  "bg-primary",
                  "text-foreground",
                  "text-primary",
                  "animate-pulse",
                  "rounded",
                  "rounded-lg",
                ],
                deep: [
                  /^bg-(primary|secondary|accent|muted|card)$/,
                  /^text-(primary|secondary|accent|muted)-foreground$/,
                  /^border-(primary|secondary|accent)$/,
                ],
                greedy: [/^(sm|md|lg):(flex|grid|hidden|block|px-\d+)$/],
              },
              keyframes: true,
              fontFace: true,
              variables: true,
            },
          ],
          // CSSnano for final optimization
          [
            "cssnano",
            {
              preset: [
                "advanced",
                {
                  // Aggressive optimization
                  discardComments: { removeAll: true },
                  mergeLonghand: true,
                  mergeRules: true,
                  calc: true,
                  colormin: true,
                  discardUnused: true,
                  minifyFontValues: true,
                  minifyGradients: true,
                  minifySelectors: true,
                  normalizeWhitespace: true,
                  reduceTransforms: true,
                  convertValues: true,
                  zindex: false,
                  // Advanced optimizations
                  autoprefixer: false, // We'll add autoprefixer separately
                  discardDuplicates: true,
                  discardEmpty: true,
                  mergeIdents: true,
                  reduceIdents: true,
                  svgo: true,
                },
              ],
            },
          ],
          // Autoprefixer for browser compatibility
          [
            "autoprefixer",
            {
              overrideBrowserslist: [
                "> 1%",
                "last 2 versions",
                "not dead",
                "not ie 11",
              ],
            },
          ],
        ]
      : []),
  ],
};

export default config;
