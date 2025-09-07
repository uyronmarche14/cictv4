#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Enhanced bundle analysis script for monitoring performance
 * Includes detailed analysis, thresholds, and CI integration
 */

console.log("🔍 Starting enhanced bundle analysis...\n");

// Build the application
console.log("📦 Building application...");
try {
  execSync("npm run build", { stdio: "inherit" });
} catch (error) {
  console.error("❌ Build failed:", error.message);
  process.exit(1);
}

// Analyze bundle sizes
console.log("\n📊 Analyzing bundle sizes...");

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

console.log("\n📋 JavaScript Bundle Analysis:");
console.log("─".repeat(60));

jsFiles.forEach((file) => {
  const stat = fs.statSync(file);
  const size = stat.size;
  totalSize += size;

  const relativePath = path.relative(staticDir, file);
  const sizeKB = (size / 1024).toFixed(2);

  console.log(`${relativePath.padEnd(40)} ${sizeKB.padStart(8)} KB`);
});

console.log("─".repeat(60));
console.log(`Total JavaScript Size: ${(totalSize / 1024).toFixed(2)} KB`);

// Check CSS files
const cssDir = path.join(staticDir, "css");
if (fs.existsSync(cssDir)) {
  const cssFiles = fs
    .readdirSync(cssDir)
    .filter((file) => file.endsWith(".css"));
  let totalCSSSize = 0;

  console.log("\n🎨 CSS Bundle Analysis:");
  console.log("─".repeat(60));

  cssFiles.forEach((file) => {
    const filePath = path.join(cssDir, file);
    const stat = fs.statSync(filePath);
    const size = stat.size;
    totalCSSSize += size;

    const sizeKB = (size / 1024).toFixed(2);
    console.log(`${file.padEnd(40)} ${sizeKB.padStart(8)} KB`);
  });

  console.log("─".repeat(60));
  console.log(`Total CSS Size: ${(totalCSSSize / 1024).toFixed(2)} KB`);

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
    console.log(`✅ CSS bundle size is within ${cssLimitKB}KB limit`);
    console.log(`   Current: ${(totalCSSSize / 1024).toFixed(2)}KB`);
    console.log(
      `   Remaining: ${((cssLimitBytes - totalCSSSize) / 1024).toFixed(2)}KB`
    );
  }

  // Analyze CSS compression ratio
  const gzipRatio = 0.3; // Approximate gzip compression ratio for CSS
  const estimatedGzipSize = totalCSSSize * gzipRatio;
  console.log(
    `📦 Estimated gzipped CSS size: ${(estimatedGzipSize / 1024).toFixed(2)}KB`
  );

  if (estimatedGzipSize > cssLimitBytes) {
    console.warn(
      `⚠️  Estimated gzipped CSS size may exceed ${cssLimitKB}KB limit`
    );
  }
}

// Performance recommendations
console.log("\n💡 Performance Recommendations:");
console.log("─".repeat(60));

if (totalSize > 500 * 1024) {
  console.log("🚨 JavaScript bundle is very large (>500KB)");
  console.log("   Consider more aggressive code splitting");
} else if (totalSize > 250 * 1024) {
  console.log("⚠️  JavaScript bundle is getting large (>250KB)");
  console.log("   Monitor bundle growth carefully");
} else {
  console.log("✅ JavaScript bundle size looks good");
}

console.log("\n🎯 Next steps:");
console.log('   • Run "npm run build:analyze" for detailed analysis');
console.log("   • Check Core Web Vitals in production");
console.log("   • Monitor bundle size in CI/CD pipeline");

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

console.log(`\n💾 Performance report saved to: ${reportFile}`);

// Exit with appropriate code for CI
const hasIssues =
  performanceReport.thresholds.jsLargeBundle ||
  performanceReport.thresholds.cssOverLimit;
if (hasIssues) {
  console.log("\n❌ Bundle analysis found performance issues");
  process.exit(1);
} else {
  console.log("\n✅ Bundle analysis passed all checks");
}

console.log("\n✨ Bundle analysis complete!");
