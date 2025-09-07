#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

/**
 * Critical CSS extraction script
 * Identifies and extracts critical CSS for above-the-fold content
 */

console.log("🎨 Extracting critical CSS...\n");

// Critical CSS selectors for above-the-fold content
const criticalSelectors = [
  // Base styles
  "html",
  "body",
  "*",

  // Layout components
  ".max-w-7xl",
  ".container",
  ".mx-auto",
  ".px-4",
  ".px-6",
  ".px-8",

  // Navigation (always above-the-fold)
  "nav",
  ".navbar",
  ".navigation",
  "[data-navigation]",

  // Hero section (above-the-fold)
  ".hero",
  "[data-hero]",
  ".hero-content",
  ".hero-title",
  ".hero-subtitle",
  ".hero-cta",

  // Theme-related (critical for preventing flash)
  ".dark",
  ".light",
  "[data-theme]",

  // Typography (critical for layout)
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "p",

  // Button styles (often above-the-fold)
  ".btn",
  ".button",
  "[role='button']",

  // Grid and flexbox (layout critical)
  ".grid",
  ".flex",
  ".grid-cols-1",
  ".grid-cols-2",
  ".grid-cols-3",
  ".flex-col",
  ".flex-row",
  ".items-center",
  ".justify-center",
  ".justify-between",

  // Spacing (layout critical)
  ".space-y-4",
  ".space-y-6",
  ".space-y-8",
  ".gap-4",
  ".gap-6",
  ".gap-8",

  // Background and text colors (theme critical)
  ".bg-background",
  ".bg-primary",
  ".bg-secondary",
  ".bg-accent",
  ".text-foreground",
  ".text-primary",
  ".text-secondary",
  ".text-accent",

  // Border radius (visual consistency)
  ".rounded",
  ".rounded-lg",
  ".rounded-xl",

  // Responsive utilities (critical for mobile)
  ".sm\\:",
  ".md\\:",
  ".lg\\:",
  ".xl\\:",
  ".2xl\\:",
];

// Function to extract critical CSS from built CSS files
const extractCriticalCSS = () => {
  const buildDir = path.join(process.cwd(), ".next");
  const staticDir = path.join(buildDir, "static");
  const cssDir = path.join(staticDir, "css");

  if (!fs.existsSync(cssDir)) {
    console.error("❌ CSS directory not found. Run build first.");
    return;
  }

  const cssFiles = fs
    .readdirSync(cssDir)
    .filter((file) => file.endsWith(".css"));

  if (cssFiles.length === 0) {
    console.error("❌ No CSS files found.");
    return;
  }

  let criticalCSS = "";
  let totalOriginalSize = 0;

  cssFiles.forEach((file) => {
    const filePath = path.join(cssDir, file);
    const cssContent = fs.readFileSync(filePath, "utf8");
    totalOriginalSize += cssContent.length;

    console.log(`📄 Processing ${file}...`);

    // Extract critical CSS rules
    const lines = cssContent.split("\n");
    let inCriticalRule = false;
    let currentRule = "";
    let braceCount = 0;

    for (const line of lines) {
      const trimmedLine = line.trim();

      // Check if this line starts a critical rule
      if (!inCriticalRule) {
        const isCritical = criticalSelectors.some((selector) => {
          // Handle class selectors
          if (selector.startsWith(".")) {
            return trimmedLine.includes(selector);
          }
          // Handle element selectors
          if (selector.match(/^[a-z]+$/)) {
            return new RegExp(`\\b${selector}\\b`).test(trimmedLine);
          }
          // Handle attribute selectors
          if (selector.includes("[")) {
            return trimmedLine.includes(selector);
          }
          // Handle responsive selectors
          if (selector.includes("\\:")) {
            return trimmedLine.includes(selector.replace("\\:", ":"));
          }
          return false;
        });

        if (isCritical && trimmedLine.includes("{")) {
          inCriticalRule = true;
          currentRule = line;
          braceCount =
            (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;
        }
      } else {
        currentRule += "\n" + line;
        braceCount +=
          (line.match(/{/g) || []).length - (line.match(/}/g) || []).length;

        if (braceCount <= 0) {
          criticalCSS += currentRule + "\n";
          inCriticalRule = false;
          currentRule = "";
          braceCount = 0;
        }
      }
    }
  });

  // Write critical CSS to file
  const criticalCSSPath = path.join(cssDir, "critical.css");
  fs.writeFileSync(criticalCSSPath, criticalCSS);

  const criticalSize = criticalCSS.length;
  const compressionRatio = (
    ((totalOriginalSize - criticalSize) / totalOriginalSize) *
    100
  ).toFixed(1);

  console.log("\n📊 Critical CSS Extraction Results:");
  console.log("─".repeat(50));
  console.log(`Original CSS Size: ${(totalOriginalSize / 1024).toFixed(2)} KB`);
  console.log(`Critical CSS Size: ${(criticalSize / 1024).toFixed(2)} KB`);
  console.log(`Size Reduction: ${compressionRatio}%`);
  console.log(`Critical CSS saved to: ${criticalCSSPath}`);

  // Generate inline critical CSS for layout
  const inlineCriticalPath = path.join(process.cwd(), "src/app/critical.css");
  fs.writeFileSync(inlineCriticalPath, criticalCSS);
  console.log(`Inline critical CSS saved to: ${inlineCriticalPath}`);

  console.log("\n💡 Usage Instructions:");
  console.log("1. Include critical.css inline in your HTML head");
  console.log("2. Load the full CSS asynchronously");
  console.log("3. Use preload hints for better performance");

  return {
    originalSize: totalOriginalSize,
    criticalSize: criticalSize,
    compressionRatio: parseFloat(compressionRatio),
  };
};

// Run the extraction
try {
  const results = extractCriticalCSS();
  if (results) {
    console.log("\n✅ Critical CSS extraction completed successfully!");
  }
} catch (error) {
  console.error("❌ Critical CSS extraction failed:", error.message);
  process.exit(1);
}
