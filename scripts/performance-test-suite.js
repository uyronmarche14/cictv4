#!/usr/bin/env node

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Comprehensive performance testing suite
 * Runs all performance tests and generates a unified report
 */

console.log("🧪 Starting Performance Test Suite...\n");

// Configuration
const config = {
  resultsDir: path.join(process.cwd(), "performance-results"),
  timestamp: Date.now(),
  tests: {
    bundleAnalysis: true,
    buildProfiling: true,
    coreWebVitals: true,
    lighthouseCI: false, // Disabled by default as it requires server
  },
  thresholds: {
    buildTime: 60000, // 60 seconds
    bundleSize: 1000000, // 1MB
    cssSize: 8192, // 8KB
    lighthouseScore: 90,
    lcp: 2500,
    cls: 0.1,
  },
};

// Test results storage
const testResults = {
  timestamp: config.timestamp,
  startTime: Date.now(),
  tests: {},
  summary: {
    passed: 0,
    failed: 0,
    warnings: 0,
    total: 0,
  },
  recommendations: [],
};

/**
 * Log with timestamp and level
 */
function log(message, level = "INFO") {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] ${message}`);
}

/**
 * Run bundle analysis test
 */
async function runBundleAnalysis() {
  log("📦 Running bundle analysis...");

  try {
    const startTime = Date.now();
    execSync("node scripts/analyze-bundle.js", { stdio: "pipe" });
    const duration = Date.now() - startTime;

    // Read the generated report
    const reportFiles = fs
      .readdirSync(config.resultsDir)
      .filter((file) => file.startsWith("bundle-analysis-"))
      .sort()
      .reverse();

    let bundleData = null;
    if (reportFiles.length > 0) {
      const reportPath = path.join(config.resultsDir, reportFiles[0]);
      bundleData = JSON.parse(fs.readFileSync(reportPath, "utf8"));
    }

    const result = {
      name: "Bundle Analysis",
      status: "passed",
      duration,
      data: bundleData,
      issues: [],
    };

    // Check thresholds
    if (bundleData) {
      if (
        bundleData.bundleSize.javascript.totalBytes >
        config.thresholds.bundleSize
      ) {
        result.issues.push(
          `JavaScript bundle size exceeds threshold: ${(bundleData.bundleSize.javascript.totalBytes / 1024).toFixed(2)}KB > ${(config.thresholds.bundleSize / 1024).toFixed(2)}KB`
        );
        result.status = "warning";
      }

      if (
        bundleData.bundleSize.css &&
        bundleData.bundleSize.css.totalBytes > config.thresholds.cssSize
      ) {
        result.issues.push(
          `CSS bundle size exceeds threshold: ${(bundleData.bundleSize.css.totalBytes / 1024).toFixed(2)}KB > ${(config.thresholds.cssSize / 1024).toFixed(2)}KB`
        );
        result.status = "warning";
      }
    }

    testResults.tests.bundleAnalysis = result;
    log(`✅ Bundle analysis completed in ${(duration / 1000).toFixed(2)}s`);
  } catch (error) {
    testResults.tests.bundleAnalysis = {
      name: "Bundle Analysis",
      status: "failed",
      error: error.message,
      issues: ["Bundle analysis failed to complete"],
    };
    log(`❌ Bundle analysis failed: ${error.message}`, "ERROR");
  }
}

/**
 * Run build profiling test
 */
async function runBuildProfiling() {
  log("⚡ Running build profiling...");

  try {
    const startTime = Date.now();
    execSync("node scripts/profile-build.js", { stdio: "pipe" });
    const duration = Date.now() - startTime;

    // Read the generated profile
    const profileDir = path.join(config.resultsDir, "build-profiles");
    const profileFiles = fs
      .readdirSync(profileDir)
      .filter((file) => file.startsWith("build-profile-"))
      .sort()
      .reverse();

    let profileData = null;
    if (profileFiles.length > 0) {
      const profilePath = path.join(profileDir, profileFiles[0]);
      profileData = JSON.parse(fs.readFileSync(profilePath, "utf8"));
    }

    const result = {
      name: "Build Profiling",
      status: "passed",
      duration,
      data: profileData,
      issues: [],
    };

    // Check thresholds
    if (profileData) {
      if (profileData.buildTime > config.thresholds.buildTime) {
        result.issues.push(
          `Build time exceeds threshold: ${(profileData.buildTime / 1000).toFixed(2)}s > ${(config.thresholds.buildTime / 1000).toFixed(2)}s`
        );
        result.status = "warning";
      }

      if (profileData.warnings && profileData.warnings.length > 0) {
        result.issues.push(...profileData.warnings);
        result.status = "warning";
      }
    }

    testResults.tests.buildProfiling = result;
    log(`✅ Build profiling completed in ${(duration / 1000).toFixed(2)}s`);
  } catch (error) {
    testResults.tests.buildProfiling = {
      name: "Build Profiling",
      status: "failed",
      error: error.message,
      issues: ["Build profiling failed to complete"],
    };
    log(`❌ Build profiling failed: ${error.message}`, "ERROR");
  }
}

/**
 * Run Core Web Vitals test
 */
async function runCoreWebVitals() {
  log("📊 Running Core Web Vitals test...");

  try {
    const startTime = Date.now();
    execSync("node scripts/monitor-core-web-vitals.js", { stdio: "pipe" });
    const duration = Date.now() - startTime;

    // Read the generated results
    const resultFiles = fs
      .readdirSync(config.resultsDir)
      .filter((file) => file.startsWith("core-web-vitals-"))
      .sort()
      .reverse();

    let vitalsData = null;
    if (resultFiles.length > 0) {
      const resultPath = path.join(config.resultsDir, resultFiles[0]);
      vitalsData = JSON.parse(fs.readFileSync(resultPath, "utf8"));
    }

    const result = {
      name: "Core Web Vitals",
      status: "passed",
      duration,
      data: vitalsData,
      issues: [],
    };

    // Check thresholds
    if (vitalsData && vitalsData.summary) {
      for (const [url, summary] of Object.entries(vitalsData.summary)) {
        const { averages, thresholdChecks } = summary;

        if (averages.lcp > config.thresholds.lcp) {
          result.issues.push(
            `LCP exceeds threshold for ${url}: ${averages.lcp.toFixed(0)}ms > ${config.thresholds.lcp}ms`
          );
          result.status = "warning";
        }

        if (averages.cls > config.thresholds.cls) {
          result.issues.push(
            `CLS exceeds threshold for ${url}: ${averages.cls.toFixed(3)} > ${config.thresholds.cls}`
          );
          result.status = "warning";
        }
      }
    }

    testResults.tests.coreWebVitals = result;
    log(
      `✅ Core Web Vitals test completed in ${(duration / 1000).toFixed(2)}s`
    );
  } catch (error) {
    testResults.tests.coreWebVitals = {
      name: "Core Web Vitals",
      status: "failed",
      error: error.message,
      issues: ["Core Web Vitals test failed to complete"],
    };
    log(`❌ Core Web Vitals test failed: ${error.message}`, "ERROR");
  }
}

/**
 * Generate unified performance report
 */
function generateUnifiedReport() {
  log("\n📋 Generating unified performance report...");

  // Calculate summary statistics
  const tests = Object.values(testResults.tests);
  testResults.summary.total = tests.length;
  testResults.summary.passed = tests.filter(
    (t) => t.status === "passed"
  ).length;
  testResults.summary.failed = tests.filter(
    (t) => t.status === "failed"
  ).length;
  testResults.summary.warnings = tests.filter(
    (t) => t.status === "warning"
  ).length;

  // Collect all issues and recommendations
  const allIssues = [];
  tests.forEach((test) => {
    if (test.issues) {
      allIssues.push(
        ...test.issues.map((issue) => ({ test: test.name, issue }))
      );
    }
  });

  // Generate recommendations based on issues
  const recommendations = new Set();

  allIssues.forEach(({ test, issue }) => {
    if (issue.includes("bundle size")) {
      recommendations.add(
        "Implement more aggressive code splitting and tree shaking"
      );
      recommendations.add("Consider lazy loading for non-critical components");
    }
    if (issue.includes("build time")) {
      recommendations.add(
        "Optimize webpack configuration and reduce dependencies"
      );
      recommendations.add("Consider using SWC compiler for faster builds");
    }
    if (issue.includes("LCP")) {
      recommendations.add("Optimize images and implement proper lazy loading");
      recommendations.add("Reduce server response times and implement CDN");
    }
    if (issue.includes("CLS")) {
      recommendations.add("Reserve space for dynamic content and images");
      recommendations.add("Avoid inserting content above existing content");
    }
  });

  testResults.recommendations = Array.from(recommendations);
  testResults.endTime = Date.now();
  testResults.totalDuration = testResults.endTime - testResults.startTime;

  // Display report
  console.log("\n🎯 Performance Test Suite Results");
  console.log("═".repeat(60));
  console.log(`Total Tests: ${testResults.summary.total}`);
  console.log(`Passed: ${testResults.summary.passed} ✅`);
  console.log(`Warnings: ${testResults.summary.warnings} ⚠️`);
  console.log(`Failed: ${testResults.summary.failed} ❌`);
  console.log(
    `Total Duration: ${(testResults.totalDuration / 1000).toFixed(2)}s`
  );

  // Show test details
  console.log("\n📊 Test Details:");
  tests.forEach((test) => {
    const statusIcon =
      test.status === "passed" ? "✅" : test.status === "warning" ? "⚠️" : "❌";
    const duration = test.duration
      ? ` (${(test.duration / 1000).toFixed(2)}s)`
      : "";
    console.log(`   ${statusIcon} ${test.name}${duration}`);

    if (test.issues && test.issues.length > 0) {
      test.issues.forEach((issue) => {
        console.log(`      • ${issue}`);
      });
    }
  });

  // Show recommendations
  if (testResults.recommendations.length > 0) {
    console.log("\n💡 Recommendations:");
    testResults.recommendations.forEach((rec) => {
      console.log(`   • ${rec}`);
    });
  }

  // Save unified report
  const reportFile = path.join(
    config.resultsDir,
    `performance-test-suite-${config.timestamp}.json`
  );
  fs.writeFileSync(reportFile, JSON.stringify(testResults, null, 2));

  console.log(`\n💾 Unified report saved to: ${reportFile}`);

  // Return overall status
  return testResults.summary.failed === 0;
}

/**
 * Main test suite function
 */
async function runTestSuite() {
  try {
    // Ensure results directory exists
    if (!fs.existsSync(config.resultsDir)) {
      fs.mkdirSync(config.resultsDir, { recursive: true });
    }

    log("🚀 Starting performance test suite...");
    log(`Results directory: ${config.resultsDir}`);

    // Run enabled tests
    if (config.tests.bundleAnalysis) {
      await runBundleAnalysis();
    }

    if (config.tests.buildProfiling) {
      await runBuildProfiling();
    }

    if (config.tests.coreWebVitals) {
      await runCoreWebVitals();
    }

    // Generate unified report
    const allTestsPassed = generateUnifiedReport();

    console.log("\n✨ Performance test suite completed!");

    // Exit with appropriate code
    process.exit(allTestsPassed ? 0 : 1);
  } catch (error) {
    log(`❌ Performance test suite failed: ${error.message}`, "ERROR");
    process.exit(1);
  }
}

// Parse command line arguments
const args = process.argv.slice(2);
if (args.includes("--help") || args.includes("-h")) {
  console.log("Performance Test Suite");
  console.log("Usage: node scripts/performance-test-suite.js [options]");
  console.log("");
  console.log("Options:");
  console.log("  --bundle-only     Run only bundle analysis");
  console.log("  --build-only      Run only build profiling");
  console.log("  --vitals-only     Run only Core Web Vitals");
  console.log("  --with-lighthouse Include Lighthouse CI tests");
  console.log("  --help, -h        Show this help message");
  process.exit(0);
}

// Configure tests based on arguments
if (args.includes("--bundle-only")) {
  config.tests = {
    bundleAnalysis: true,
    buildProfiling: false,
    coreWebVitals: false,
    lighthouseCI: false,
  };
} else if (args.includes("--build-only")) {
  config.tests = {
    bundleAnalysis: false,
    buildProfiling: true,
    coreWebVitals: false,
    lighthouseCI: false,
  };
} else if (args.includes("--vitals-only")) {
  config.tests = {
    bundleAnalysis: false,
    buildProfiling: false,
    coreWebVitals: true,
    lighthouseCI: false,
  };
}

if (args.includes("--with-lighthouse")) {
  config.tests.lighthouseCI = true;
}

// Run the test suite
runTestSuite();
