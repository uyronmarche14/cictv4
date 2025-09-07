#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

/**
 * Simulate production CSS optimizations on development build
 */

console.log("🎨 Simulating production CSS optimizations...\n");

const buildDir = path.join(process.cwd(), ".next");
const staticDir = path.join(buildDir, "static");

if (!fs.existsSync(staticDir)) {
  console.error("❌ Build directory not found.");
  process.exit(1);
}

// Get all CSS files
const getCSSFiles = (dir) => {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getCSSFiles(fullPath));
    } else if (item.endsWith(".css")) {
      files.push(fullPath);
    }
  }

  return files;
};

const cssFiles = getCSSFiles(staticDir);
let totalOriginalSize = 0;
let totalOptimizedSize = 0;

console.log("🔧 Optimizing CSS files...");
console.log("─".repeat(80));

// Create optimized directory
const optimizedDir = path.join(staticDir, "optimized");
if (!fs.existsSync(optimizedDir)) {
  fs.mkdirSync(optimizedDir, { recursive: true });
}

cssFiles.forEach((file) => {
  const relativePath = path.relative(staticDir, file);
  console.log(`Processing ${relativePath}...`);

  let content = fs.readFileSync(file, "utf8");
  const originalSize = content.length;
  totalOriginalSize += originalSize;

  // Simulate production optimizations
  content = optimizeCSS(content);

  const optimizedSize = content.length;
  totalOptimizedSize += optimizedSize;

  // Write optimized file
  const optimizedFile = path.join(optimizedDir, path.basename(file));
  fs.writeFileSync(optimizedFile, content);

  const savings = (
    ((originalSize - optimizedSize) / originalSize) *
    100
  ).toFixed(1);
  const gzipSize = zlib.gzipSync(content).length;

  console.log(
    `  ${originalSize} → ${optimizedSize} bytes (${savings}% reduction)`
  );
  console.log(`  Gzipped: ${gzipSize} bytes`);
});

console.log("─".repeat(80));

const totalSavings = (
  ((totalOriginalSize - totalOptimizedSize) / totalOriginalSize) *
  100
).toFixed(1);
const totalGzipSize = zlib.gzipSync(
  fs.readFileSync(path.join(optimizedDir, fs.readdirSync(optimizedDir)[0]))
).length;

console.log(
  `Total: ${totalOriginalSize} → ${totalOptimizedSize} bytes (${totalSavings}% reduction)`
);

// Analyze optimized bundle
console.log("\n📊 Optimized CSS Analysis:");
console.log("─".repeat(50));

const optimizedFiles = fs.readdirSync(optimizedDir);
let totalOptimizedGzipSize = 0;

optimizedFiles.forEach((file) => {
  const filePath = path.join(optimizedDir, file);
  const content = fs.readFileSync(filePath);
  const gzipSize = zlib.gzipSync(content).length;
  totalOptimizedGzipSize += gzipSize;

  console.log(
    `${file}: ${(content.length / 1024).toFixed(2)}KB → ${(gzipSize / 1024).toFixed(2)}KB gzipped`
  );
});

console.log("─".repeat(50));
console.log(
  `Total optimized gzipped: ${(totalOptimizedGzipSize / 1024).toFixed(2)}KB`
);

// Check against limit
const cssLimitKB = 8;
const cssLimitBytes = cssLimitKB * 1024;

if (totalOptimizedGzipSize <= cssLimitBytes) {
  console.log(`✅ Optimized CSS is within ${cssLimitKB}KB limit!`);
  console.log(
    `   Remaining: ${((cssLimitBytes - totalOptimizedGzipSize) / 1024).toFixed(2)}KB`
  );
} else {
  console.log(
    `⚠️  Still ${((totalOptimizedGzipSize - cssLimitBytes) / 1024).toFixed(2)}KB over limit`
  );
  console.log("   Consider more aggressive optimizations");
}

console.log("\n✨ Simulation complete!");

/**
 * Optimize CSS content
 */
function optimizeCSS(css) {
  // Remove comments
  css = css.replace(/\/\*[\s\S]*?\*\//g, "");

  // Remove unnecessary whitespace
  css = css.replace(/\s+/g, " ");
  css = css.replace(/;\s*}/g, "}");
  css = css.replace(/{\s*/g, "{");
  css = css.replace(/;\s*/g, ";");
  css = css.replace(/,\s*/g, ",");
  css = css.replace(/:\s*/g, ":");

  // Remove empty rules
  css = css.replace(/[^{}]+{\s*}/g, "");

  // Remove duplicate properties (keep last one)
  css = css.replace(/([^{}]*){([^{}]*)}/g, (match, selector, properties) => {
    if (!properties.trim()) return "";

    const props = {};
    properties.split(";").forEach((prop) => {
      const colonIndex = prop.indexOf(":");
      if (colonIndex > 0) {
        const key = prop.substring(0, colonIndex).trim();
        const value = prop.substring(colonIndex + 1).trim();
        if (key && value) {
          props[key] = value;
        }
      }
    });

    const optimizedProps = Object.entries(props)
      .map(([key, value]) => `${key}:${value}`)
      .join(";");

    return optimizedProps ? `${selector.trim()}{${optimizedProps}}` : "";
  });

  // Remove unused CSS variables (basic detection)
  const usedVars = new Set();
  const varMatches = css.match(/var\(--[^)]+\)/g) || [];
  varMatches.forEach((match) => {
    const varName = match.match(/--[^)]+/)[0];
    usedVars.add(varName);
  });

  // Remove unused CSS custom properties
  css = css.replace(/(--[^:]+):[^;]+;/g, (match, varName) => {
    return usedVars.has(varName) ? match : "";
  });

  // Optimize colors
  css = css.replace(/#([0-9a-f])\1([0-9a-f])\2([0-9a-f])\3/gi, "#$1$2$3");
  css = css.replace(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/g, (match, r, g, b) => {
    const hex =
      "#" +
      [r, g, b].map((x) => parseInt(x).toString(16).padStart(2, "0")).join("");
    return hex.length <= match.length ? hex : match;
  });

  // Remove redundant units
  css = css.replace(/(\d)\.?0+(px|em|rem|%|vh|vw)/g, "$1$2");
  css = css.replace(/0(px|em|rem|%|vh|vw)/g, "0");

  // Optimize calc() expressions
  css = css.replace(/calc\(([^)]+)\)/g, (match, expr) => {
    // Simple calc optimizations
    if (expr.includes("0 +") || expr.includes("+ 0")) {
      return expr.replace(/\s*[+\-]\s*0\s*/g, "");
    }
    return match;
  });

  // Final cleanup
  css = css.trim();

  return css;
}
