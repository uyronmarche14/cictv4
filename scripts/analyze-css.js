#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

/**
 * CSS analysis script for monitoring CSS bundle sizes
 */

console.log("🎨 Starting CSS analysis...\n");

const buildDir = path.join(process.cwd(), ".next");
const staticDir = path.join(buildDir, "static");

if (!fs.existsSync(staticDir)) {
  console.error("❌ Build directory not found. Run development server first.");
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
let totalSize = 0;
let totalGzipSize = 0;

console.log("🎨 CSS Bundle Analysis:");
console.log("─".repeat(80));
console.log(
  "File".padEnd(50) +
    "Size".padStart(10) +
    "Gzipped".padStart(10) +
    "Ratio".padStart(10)
);
console.log("─".repeat(80));

const cssAnalysis = [];

cssFiles.forEach((file) => {
  const stat = fs.statSync(file);
  const size = stat.size;
  const content = fs.readFileSync(file);
  const gzipSize = zlib.gzipSync(content).length;

  totalSize += size;
  totalGzipSize += gzipSize;

  const relativePath = path.relative(staticDir, file);
  const sizeKB = (size / 1024).toFixed(2);
  const gzipKB = (gzipSize / 1024).toFixed(2);
  const ratio = ((gzipSize / size) * 100).toFixed(1);

  console.log(
    relativePath.substring(0, 48).padEnd(50) +
      `${sizeKB}KB`.padStart(10) +
      `${gzipKB}KB`.padStart(10) +
      `${ratio}%`.padStart(10)
  );

  cssAnalysis.push({
    file: relativePath,
    size: size,
    gzipSize: gzipSize,
    sizeKB: parseFloat(sizeKB),
    gzipKB: parseFloat(gzipKB),
    ratio: parseFloat(ratio),
  });
});

console.log("─".repeat(80));
console.log(
  "TOTAL".padEnd(50) +
    `${(totalSize / 1024).toFixed(2)}KB`.padStart(10) +
    `${(totalGzipSize / 1024).toFixed(2)}KB`.padStart(10) +
    `${((totalGzipSize / totalSize) * 100).toFixed(1)}%`.padStart(10)
);

// Check CSS size limit
const cssLimitKB = 8;
const cssLimitBytes = cssLimitKB * 1024;

console.log("\n📊 CSS Size Analysis:");
console.log("─".repeat(50));

if (totalGzipSize > cssLimitBytes) {
  console.log(`❌ CSS bundle size exceeds ${cssLimitKB}KB gzipped limit`);
  console.log(`   Current gzipped: ${(totalGzipSize / 1024).toFixed(2)}KB`);
  console.log(`   Limit: ${cssLimitKB}KB`);
  console.log(
    `   Overage: ${((totalGzipSize - cssLimitBytes) / 1024).toFixed(2)}KB`
  );
} else {
  console.log(`✅ CSS bundle size is within ${cssLimitKB}KB gzipped limit`);
  console.log(`   Current gzipped: ${(totalGzipSize / 1024).toFixed(2)}KB`);
  console.log(
    `   Remaining: ${((cssLimitBytes - totalGzipSize) / 1024).toFixed(2)}KB`
  );
}

console.log(`📦 Raw CSS size: ${(totalSize / 1024).toFixed(2)}KB`);
console.log(`🗜️  Gzipped size: ${(totalGzipSize / 1024).toFixed(2)}KB`);
console.log(
  `📉 Compression ratio: ${((totalGzipSize / totalSize) * 100).toFixed(1)}%`
);

// Identify largest files
console.log("\n🔍 Largest CSS Files (by gzipped size):");
console.log("─".repeat(50));

const sortedFiles = cssAnalysis
  .sort((a, b) => b.gzipSize - a.gzipSize)
  .slice(0, 5);

sortedFiles.forEach((file, index) => {
  console.log(`${index + 1}. ${file.file}`);
  console.log(
    `   Size: ${file.sizeKB}KB → ${file.gzipKB}KB (${file.ratio}% compression)`
  );
});

// Optimization recommendations
console.log("\n💡 Optimization Recommendations:");
console.log("─".repeat(50));

if (totalGzipSize > cssLimitBytes) {
  console.log("🚨 CSS bundle is too large. Consider:");
  console.log("   • Enable CSS purging in production");
  console.log("   • Remove unused CSS classes");
  console.log("   • Split CSS into critical and non-critical");
  console.log("   • Use CSS-in-JS for component-specific styles");

  // Check for specific issues
  const largestFile = sortedFiles[0];
  if (largestFile && largestFile.gzipKB > 20) {
    console.log(
      `   • ${largestFile.file} is very large (${largestFile.gzipKB}KB)`
    );
    console.log("     Consider splitting this file or removing unused styles");
  }
} else {
  console.log("✅ CSS bundle size looks good");
  console.log("   • Continue monitoring bundle growth");
  console.log("   • Consider implementing critical CSS for better performance");
}

// Check for development vs production
if (process.env.NODE_ENV !== "production") {
  console.log("\n⚠️  Note: This analysis is from development build");
  console.log(
    "   Production builds may have different sizes due to optimizations"
  );
}

console.log("\n🎯 Next steps:");
console.log("   • Run production build for accurate size analysis");
console.log("   • Implement critical CSS extraction");
console.log("   • Monitor CSS bundle size in CI/CD pipeline");
console.log("   • Use CSS purging to remove unused styles");

console.log("\n✨ CSS analysis complete!");

// Export results for other scripts
module.exports = {
  totalSize,
  totalGzipSize,
  cssAnalysis,
  withinLimit: totalGzipSize <= cssLimitBytes,
  limitKB: cssLimitKB,
};
