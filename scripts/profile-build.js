#!/usr/bin/env node

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Next.js build profiling script
 * Profiles build performance and provides detailed timing information
 */

console.log("⚡ Starting Next.js build profiling...\n");

// Configuration
const config = {
  profileDir: path.join(process.cwd(), "performance-results", "build-profiles"),
  timestamp: Date.now(),
  enableWebpackAnalyzer: process.env.ANALYZE === "true",
};

// Ensure profile directory exists
if (!fs.existsSync(config.profileDir)) {
  fs.mkdirSync(config.profileDir, { recursive: true });
}

/**
 * Run build with profiling enabled
 */
function runProfiledBuild() {
  console.log("📦 Running profiled build...");

  const startTime = Date.now();

  try {
    // Set environment variables for profiling
    const env = {
      ...process.env,
      NEXT_TELEMETRY_DISABLED: "1",
      NODE_ENV: "production",
      // Enable Next.js build profiling
      NEXT_BUILD_PROFILE: "1",
      // Enable webpack profiling
      WEBPACK_PROFILE: "1",
    };

    // Run build with profiling
    const buildCommand = "next build --profile";
    console.log(`Running: ${buildCommand}`);

    const output = execSync(buildCommand, {
      encoding: "utf8",
      env,
      stdio: "pipe",
    });

    const buildTime = Date.now() - startTime;

    console.log(`✅ Build completed in ${(buildTime / 1000).toFixed(2)}s`);

    return {
      success: true,
      buildTime,
      output,
      timestamp: config.timestamp,
    };
  } catch (error) {
    const buildTime = Date.now() - startTime;

    console.error(`❌ Build failed after ${(buildTime / 1000).toFixed(2)}s`);
    console.error(error.message);

    return {
      success: false,
      buildTime,
      error: error.message,
      timestamp: config.timestamp,
    };
  }
}

/**
 * Analyze build output and extract performance metrics
 */
function analyzeBuildOutput(buildResult) {
  console.log("\n📊 Analyzing build performance...");

  const analysis = {
    buildTime: buildResult.buildTime,
    success: buildResult.success,
    timestamp: buildResult.timestamp,
    metrics: {},
    warnings: [],
    recommendations: [],
  };

  if (!buildResult.success) {
    analysis.warnings.push("Build failed - check error logs");
    return analysis;
  }

  const output = buildResult.output;

  // Extract compilation time
  const compileTimeMatch = output.match(
    /Compiled successfully in (\d+(?:\.\d+)?)\s*s/
  );
  if (compileTimeMatch) {
    analysis.metrics.compilationTime = parseFloat(compileTimeMatch[1]) * 1000;
  }

  // Extract page generation times
  const pageGenMatch = output.match(
    /Generated static pages \((\d+(?:\.\d+)?)\s*s\)/
  );
  if (pageGenMatch) {
    analysis.metrics.staticGenerationTime = parseFloat(pageGenMatch[1]) * 1000;
  }

  // Extract bundle sizes from output
  const bundleSizeRegex =
    /(\S+)\s+(\d+(?:\.\d+)?)\s*(B|kB|MB)\s+(\d+(?:\.\d+)?)\s*(B|kB|MB)/g;
  const bundles = [];
  let match;

  while ((match = bundleSizeRegex.exec(output)) !== null) {
    const [, route, size, sizeUnit, gzipSize, gzipUnit] = match;
    bundles.push({
      route,
      size: convertToBytes(parseFloat(size), sizeUnit),
      gzipSize: convertToBytes(parseFloat(gzipSize), gzipUnit),
    });
  }

  analysis.metrics.bundles = bundles;

  // Calculate total bundle size
  const totalSize = bundles.reduce((sum, bundle) => sum + bundle.size, 0);
  const totalGzipSize = bundles.reduce(
    (sum, bundle) => sum + bundle.gzipSize,
    0
  );

  analysis.metrics.totalBundleSize = totalSize;
  analysis.metrics.totalGzipSize = totalGzipSize;

  // Performance analysis
  if (analysis.metrics.compilationTime > 30000) {
    analysis.warnings.push("Compilation time is slow (>30s)");
    analysis.recommendations.push(
      "Consider optimizing webpack configuration or reducing dependencies"
    );
  }

  if (totalSize > 1000000) {
    // 1MB
    analysis.warnings.push("Total bundle size is large (>1MB)");
    analysis.recommendations.push(
      "Implement more aggressive code splitting and tree shaking"
    );
  }

  if (totalGzipSize > 500000) {
    // 500KB gzipped
    analysis.warnings.push("Total gzipped bundle size is large (>500KB)");
    analysis.recommendations.push(
      "Optimize bundle size and enable better compression"
    );
  }

  // Check for large individual bundles
  const largeBundles = bundles.filter((bundle) => bundle.gzipSize > 100000); // 100KB
  if (largeBundles.length > 0) {
    analysis.warnings.push(
      `${largeBundles.length} bundle(s) are large (>100KB gzipped)`
    );
    analysis.recommendations.push("Split large bundles into smaller chunks");
  }

  return analysis;
}

/**
 * Convert size string to bytes
 */
function convertToBytes(size, unit) {
  switch (unit) {
    case "B":
      return size;
    case "kB":
      return size * 1024;
    case "MB":
      return size * 1024 * 1024;
    default:
      return size;
  }
}

/**
 * Generate performance report
 */
function generateReport(analysis) {
  console.log("\n📋 Build Performance Report");
  console.log("═".repeat(60));

  console.log(`Build Status: ${analysis.success ? "✅ Success" : "❌ Failed"}`);
  console.log(`Total Build Time: ${(analysis.buildTime / 1000).toFixed(2)}s`);

  if (analysis.metrics.compilationTime) {
    console.log(
      `Compilation Time: ${(analysis.metrics.compilationTime / 1000).toFixed(2)}s`
    );
  }

  if (analysis.metrics.staticGenerationTime) {
    console.log(
      `Static Generation: ${(analysis.metrics.staticGenerationTime / 1000).toFixed(2)}s`
    );
  }

  if (analysis.metrics.totalBundleSize) {
    console.log(
      `Total Bundle Size: ${(analysis.metrics.totalBundleSize / 1024).toFixed(2)} KB`
    );
    console.log(
      `Total Gzipped Size: ${(analysis.metrics.totalGzipSize / 1024).toFixed(2)} KB`
    );
  }

  // Show warnings
  if (analysis.warnings.length > 0) {
    console.log("\n⚠️  Warnings:");
    analysis.warnings.forEach((warning) => console.log(`   • ${warning}`));
  }

  // Show recommendations
  if (analysis.recommendations.length > 0) {
    console.log("\n💡 Recommendations:");
    analysis.recommendations.forEach((rec) => console.log(`   • ${rec}`));
  }

  // Show top 5 largest bundles
  if (analysis.metrics.bundles && analysis.metrics.bundles.length > 0) {
    console.log("\n📦 Largest Bundles (Top 5):");
    const sortedBundles = analysis.metrics.bundles
      .sort((a, b) => b.gzipSize - a.gzipSize)
      .slice(0, 5);

    sortedBundles.forEach((bundle) => {
      const sizeKB = (bundle.gzipSize / 1024).toFixed(2);
      console.log(`   ${bundle.route.padEnd(30)} ${sizeKB.padStart(8)} KB`);
    });
  }

  // Save detailed report
  const reportFile = path.join(
    config.profileDir,
    `build-profile-${config.timestamp}.json`
  );
  fs.writeFileSync(reportFile, JSON.stringify(analysis, null, 2));

  console.log(`\n💾 Detailed report saved to: ${reportFile}`);

  return analysis;
}

/**
 * Check for webpack profile files
 */
function checkWebpackProfiles() {
  console.log("\n🔍 Checking for webpack profile files...");

  const profileFiles = [
    ".next/trace",
    ".next/webpack-stats.json",
    ".next/build-manifest.json",
  ];

  const foundProfiles = profileFiles.filter((file) => fs.existsSync(file));

  if (foundProfiles.length > 0) {
    console.log("📊 Found webpack profile files:");
    foundProfiles.forEach((file) => {
      const stats = fs.statSync(file);
      console.log(`   ${file} (${(stats.size / 1024).toFixed(2)} KB)`);
    });

    console.log("\n💡 You can analyze these files with:");
    console.log("   • webpack-bundle-analyzer .next/webpack-stats.json");
    console.log("   • @next/bundle-analyzer (already configured)");
  } else {
    console.log("ℹ️  No webpack profile files found");
    console.log("   Run with WEBPACK_PROFILE=1 to generate profile data");
  }
}

/**
 * Main profiling function
 */
async function profileBuild() {
  try {
    // Clean previous build
    console.log("🧹 Cleaning previous build...");
    try {
      execSync("rm -rf .next", { stdio: "pipe" });
    } catch {
      // Ignore cleanup errors
    }

    // Run profiled build
    const buildResult = runProfiledBuild();

    // Analyze results
    const analysis = analyzeBuildOutput(buildResult);

    // Generate report
    generateReport(analysis);

    // Check for additional profile files
    checkWebpackProfiles();

    console.log("\n✨ Build profiling complete!");

    // Exit with appropriate code
    if (!analysis.success || analysis.warnings.length > 0) {
      process.exit(1);
    }
  } catch (error) {
    console.error("❌ Build profiling failed:", error.message);
    process.exit(1);
  }
}

// Run the profiling
profileBuild();
