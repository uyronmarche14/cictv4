#!/usr/bin/env node

import { execSync } from "child_process";
import fs from "fs";
import path from "path";

/**
 * Enhanced bundle analysis script for monitoring performance
 * Includes detailed analysis, thresholds, and CI integration
 */

console.warn("🔍 Starting enhanced bundle analysis...\n");

// Build the application
console.warn("📦 Building application...");
try {
  execSync("npm run build", { stdio: "inherit" });
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}

// Analyze bundle sizes
console.warn("\n📊 Analyzing bundle sizes...");

const buildDir = path.join(process.cwd(), ".next");
const staticDir = path.join(buildDir, "static");

if (!fs.existsSync(staticDir)) {
  console.error(
    "❌ Build directory not found. Make sure the build completed successfully."
  );
  process.exit(1);
}

// Get all JavaScript files
const getJSFiles = (dir) => {
  const files = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...getJSFiles(fullPath));
    } else if (item.endsWith(".js")) {
      files.push(fullPath);
    }
  }

  return files;
};

const jsFiles = getJSFiles(staticDir);
let totalSize = 0;

console.warn("\n📋 JavaScript Bundle Analysis:");
console.warn("─".repeat(60));

jsFiles.forEach((file) => {
  const stat = fs.statSync(file);
  const size = stat.size;
  totalSize += size;

  const relativePath = path.relative(staticDir, file);
  const sizeKB = (size / 1024).toFixed(2);

  console.warn(`${relativePath.padEnd(40)} ${sizeKB.padStart(8)} KB`);
});

console.warn("─".repeat(60));
console.warn(`Total JavaScript Size: ${(totalSize / 1024).toFixed(2)} KB`);

// Check CSS files
const cssDir = path.join(staticDir, "css");
if (fs.existsSync(cssDir)) {
  const cssFiles = fs
    .readdirSync(cssDir)
    .filter((file) => file.endsWith(".css"));
  let totalCSSSize = 0;

  console.warn("\n🎨 CSS Bundle Analysis:");
  console.warn("─".repeat(60));

  cssFiles.forEach((file) => {
    const filePath = path.join(cssDir, file);
    const stat = fs.statSync(filePath);
    const size = stat.size;
    totalCSSSize += size;

    const sizeKB = (size / 1024).toFixed(2);
    console.warn(`${file.padEnd(40)} ${sizeKB.padStart(8)} KB`);
  });

  console.warn("─".repeat(60));
  console.warn(`Total CSS Size: ${(totalCSSSize / 1024).toFixed(2)} KB`);

  // Check CSS size limit
  const cssLimitKB = 8;
  const cssLimitBytes = cssLimitKB * 1024;

  if (totalCSSSize > cssLimitBytes) {
    console.warn(`⚠️  CSS bundle size exceeds ${cssLimitKB}KB limit`);
    console.warn(`   Current: ${(totalCSSSize / 1024).toFixed(2)}KB`);
    console.warn(`   Limit: ${cssLimitKB}KB`);
    console.warn(
      `   Overage: ${((totalCSSSize - cssLimitBytes) / 1024).toFixed(2)}KB`
    );
  } else {
    console.warn(`✅ CSS bundle size is within ${cssLimitKB}KB limit`);
    console.warn(`   Current: ${(totalCSSSize / 1024).toFixed(2)}KB`);
    console.warn(
      `   Remaining: ${((cssLimitBytes - totalCSSSize) / 1024).toFixed(2)}KB`
    );
  }

  // Analyze CSS compression ratio
  const gzipRatio = 0.3; // Approximate gzip compression ratio for CSS
  const estimatedGzipSize = totalCSSSize * gzipRatio;
  console.warn(
    `📦 Estimated gzipped CSS size: ${(estimatedGzipSize / 1024).toFixed(2)}KB`
  );

  if (estimatedGzipSize > cssLimitBytes) {
    console.warn(
      `⚠️  Estimated gzipped CSS size may exceed ${cssLimitKB}KB limit`
    );
  }
}

// Performance recommendations
console.warn("\n💡 Performance Recommendations:");
console.warn("─".repeat(60));

if (totalSize > 500 * 1024) {
  console.warn("🚨 JavaScript bundle is very large (>500KB)");
  console.warn("   Consider more aggressive code splitting");
} else if (totalSize > 250 * 1024) {
  console.warn("⚠️  JavaScript bundle is getting large (>250KB)");
  console.warn("   Monitor bundle growth carefully");
} else {
  console.warn("✅ JavaScript bundle size looks good");
}

console.warn("\n🎯 Next steps:");
console.warn('   • Run "npm run build:analyze" for detailed analysis');
console.warn("   • Check Core Web Vitals in production");
console.warn("   • Monitor bundle size in CI/CD pipeline");

// Generate performance report
const performanceReport = {
  timestamp: new Date().toISOString(),
  bundleSize: {
    javascript: {
      totalBytes: totalSize,
      totalKB: (totalSize / 1024).toFixed(2),
      files: jsFiles.length,
    },
    css:
      cssDir && fs.existsSync(cssDir)
        ? {
            totalBytes: totalCSSSize,
            totalKB: (totalCSSSize / 1024).toFixed(2),
            estimatedGzipKB: ((totalCSSSize * 0.3) / 1024).toFixed(2),
            withinLimit: totalCSSSize <= 8 * 1024,
          }
        : null,
  },
  thresholds: {
    jsLargeBundle: totalSize > 500 * 1024,
    jsWarningBundle: totalSize > 250 * 1024,
    cssOverLimit: cssDir && fs.existsSync(cssDir) && totalCSSSize > 8 * 1024,
  },
  recommendations: [],
};

// Add recommendations based on analysis
if (performanceReport.thresholds.jsLargeBundle) {
  performanceReport.recommendations.push(
    "JavaScript bundle is very large (>500KB) - implement aggressive code splitting"
  );
} else if (performanceReport.thresholds.jsWarningBundle) {
  performanceReport.recommendations.push(
    "JavaScript bundle is getting large (>250KB) - monitor growth carefully"
  );
}

if (performanceReport.thresholds.cssOverLimit) {
  performanceReport.recommendations.push(
    "CSS bundle exceeds 8KB limit - optimize CSS and enable purging"
  );
}

// Save performance report
const reportsDir = path.join(process.cwd(), "performance-results");
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir, { recursive: true });
}

const reportFile = path.join(reportsDir, `bundle-analysis-${Date.now()}.json`);
fs.writeFileSync(reportFile, JSON.stringify(performanceReport, null, 2));

console.warn(`\n💾 Performance report saved to: ${reportFile}`);

// Exit with appropriate code for CI
const hasIssues =
  performanceReport.thresholds.jsLargeBundle ||
  performanceReport.thresholds.cssOverLimit;
if (hasIssues) {
  console.error("\n❌ Bundle analysis found performance issues");
  process.exit(1);
} else {
  console.warn("\n✅ Bundle analysis passed all checks");
}

console.warn("\n✨ Bundle analysis complete!");
