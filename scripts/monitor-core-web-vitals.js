#!/usr/bin/env node

const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Core Web Vitals monitoring script
 * Measures and reports on Core Web Vitals metrics
 */

console.log("📊 Starting Core Web Vitals monitoring...\n");

// Configuration
const config = {
  urls: [
    "http://localhost:3000",
    "http://localhost:3000/about",
    "http://localhost:3000/contact",
  ],
  thresholds: {
    lcp: 2500, // Largest Contentful Paint (ms)
    fid: 100, // First Input Delay (ms)
    cls: 0.1, // Cumulative Layout Shift
    fcp: 1800, // First Contentful Paint (ms)
    ttfb: 600, // Time to First Byte (ms)
    tbt: 200, // Total Blocking Time (ms)
  },
  runs: 3,
};

// Results storage
const results = {
  timestamp: new Date().toISOString(),
  runs: [],
  summary: {},
};

/**
 * Run Lighthouse audit for a specific URL
 */
function runLighthouseAudit(url, runNumber) {
  console.log(`🔍 Running audit ${runNumber} for ${url}...`);

  try {
    const command = `npx lighthouse ${url} --output=json --quiet --chrome-flags="--headless --no-sandbox"`;
    const output = execSync(command, { encoding: "utf8" });
    const report = JSON.parse(output);

    // Extract Core Web Vitals metrics
    const metrics = {
      url,
      run: runNumber,
      lcp: report.audits["largest-contentful-paint"]?.numericValue || 0,
      fid: report.audits["max-potential-fid"]?.numericValue || 0, // Approximation
      cls: report.audits["cumulative-layout-shift"]?.numericValue || 0,
      fcp: report.audits["first-contentful-paint"]?.numericValue || 0,
      ttfb: report.audits["server-response-time"]?.numericValue || 0,
      tbt: report.audits["total-blocking-time"]?.numericValue || 0,
      performanceScore: report.categories.performance?.score * 100 || 0,
    };

    return metrics;
  } catch (error) {
    console.error(`❌ Failed to run audit for ${url}:`, error.message);
    return null;
  }
}

/**
 * Calculate average metrics across runs
 */
function calculateAverages(runs) {
  const metrics = [
    "lcp",
    "fid",
    "cls",
    "fcp",
    "ttfb",
    "tbt",
    "performanceScore",
  ];
  const averages = {};

  for (const metric of metrics) {
    const values = runs.map((run) => run[metric]).filter((val) => val !== null);
    averages[metric] =
      values.length > 0 ? values.reduce((a, b) => a + b, 0) / values.length : 0;
  }

  return averages;
}

/**
 * Check if metrics meet thresholds
 */
function checkThresholds(averages) {
  const checks = {
    lcp: {
      value: averages.lcp,
      threshold: config.thresholds.lcp,
      pass: averages.lcp <= config.thresholds.lcp,
    },
    fid: {
      value: averages.fid,
      threshold: config.thresholds.fid,
      pass: averages.fid <= config.thresholds.fid,
    },
    cls: {
      value: averages.cls,
      threshold: config.thresholds.cls,
      pass: averages.cls <= config.thresholds.cls,
    },
    fcp: {
      value: averages.fcp,
      threshold: config.thresholds.fcp,
      pass: averages.fcp <= config.thresholds.fcp,
    },
    ttfb: {
      value: averages.ttfb,
      threshold: config.thresholds.ttfb,
      pass: averages.ttfb <= config.thresholds.ttfb,
    },
    tbt: {
      value: averages.tbt,
      threshold: config.thresholds.tbt,
      pass: averages.tbt <= config.thresholds.tbt,
    },
  };

  return checks;
}

/**
 * Format metrics for display
 */
function formatMetric(value, unit = "ms") {
  if (unit === "ms") {
    return `${Math.round(value)}ms`;
  } else if (unit === "score") {
    return `${Math.round(value)}/100`;
  } else {
    return value.toFixed(3);
  }
}

/**
 * Main monitoring function
 */
async function monitorCoreWebVitals() {
  console.log("🚀 Starting server for testing...");

  // Check if server is already running
  let serverProcess = null;
  try {
    execSync("curl -f http://localhost:3000 > /dev/null 2>&1");
    console.log("✅ Server is already running");
  } catch {
    console.log("📦 Building application...");
    execSync("npm run build", { stdio: "inherit" });

    console.log("🚀 Starting server...");
    const { spawn } = require("child_process");
    serverProcess = spawn("npm", ["run", "start"], {
      stdio: "pipe",
      detached: false,
    });

    // Wait for server to be ready
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error("Server startup timeout"));
      }, 30000);

      const checkServer = setInterval(() => {
        try {
          execSync("curl -f http://localhost:3000 > /dev/null 2>&1");
          clearInterval(checkServer);
          clearTimeout(timeout);
          resolve();
        } catch {
          // Server not ready yet
        }
      }, 1000);
    });

    console.log("✅ Server is ready");
  }

  try {
    // Run audits for each URL
    for (const url of config.urls) {
      console.log(`\n📋 Testing ${url}...`);

      for (let run = 1; run <= config.runs; run++) {
        const metrics = runLighthouseAudit(url, run);
        if (metrics) {
          results.runs.push(metrics);
        }
      }
    }

    // Calculate summaries for each URL
    for (const url of config.urls) {
      const urlRuns = results.runs.filter((run) => run.url === url);
      if (urlRuns.length > 0) {
        const averages = calculateAverages(urlRuns);
        const thresholdChecks = checkThresholds(averages);

        results.summary[url] = {
          averages,
          thresholdChecks,
          runsCount: urlRuns.length,
        };
      }
    }

    // Display results
    console.log("\n📊 Core Web Vitals Results");
    console.log("═".repeat(80));

    for (const [url, summary] of Object.entries(results.summary)) {
      console.log(`\n🌐 ${url}`);
      console.log("─".repeat(60));

      const { averages, thresholdChecks } = summary;

      console.log(
        `LCP (Largest Contentful Paint): ${formatMetric(averages.lcp)} ${thresholdChecks.lcp.pass ? "✅" : "❌"}`
      );
      console.log(
        `FID (First Input Delay):        ${formatMetric(averages.fid)} ${thresholdChecks.fid.pass ? "✅" : "❌"}`
      );
      console.log(
        `CLS (Cumulative Layout Shift):  ${formatMetric(averages.cls, "cls")} ${thresholdChecks.cls.pass ? "✅" : "❌"}`
      );
      console.log(
        `FCP (First Contentful Paint):   ${formatMetric(averages.fcp)} ${thresholdChecks.fcp.pass ? "✅" : "❌"}`
      );
      console.log(
        `TTFB (Time to First Byte):      ${formatMetric(averages.ttfb)} ${thresholdChecks.ttfb.pass ? "✅" : "❌"}`
      );
      console.log(
        `TBT (Total Blocking Time):      ${formatMetric(averages.tbt)} ${thresholdChecks.tbt.pass ? "✅" : "❌"}`
      );
      console.log(
        `Performance Score:              ${formatMetric(averages.performanceScore, "score")}`
      );
    }

    // Overall assessment
    console.log("\n🎯 Overall Assessment");
    console.log("─".repeat(60));

    let allPassed = true;
    let totalFailures = 0;

    for (const [url, summary] of Object.entries(results.summary)) {
      const failures = Object.values(summary.thresholdChecks).filter(
        (check) => !check.pass
      );
      totalFailures += failures.length;
      if (failures.length > 0) {
        allPassed = false;
        console.log(
          `❌ ${url}: ${failures.length} metric(s) failed thresholds`
        );
      } else {
        console.log(`✅ ${url}: All metrics passed thresholds`);
      }
    }

    if (allPassed) {
      console.log(
        "\n🎉 All Core Web Vitals metrics are within acceptable thresholds!"
      );
    } else {
      console.log(
        `\n⚠️  ${totalFailures} metric(s) failed thresholds across all URLs`
      );
      console.log(
        "Consider optimizing performance to improve user experience."
      );
    }

    // Save results to file
    const resultsDir = path.join(process.cwd(), "performance-results");
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }

    const resultsFile = path.join(
      resultsDir,
      `core-web-vitals-${Date.now()}.json`
    );
    fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    console.log(`\n💾 Results saved to: ${resultsFile}`);

    // Exit with appropriate code
    process.exit(allPassed ? 0 : 1);
  } finally {
    // Clean up server process
    if (serverProcess) {
      console.log("\n🛑 Stopping server...");
      serverProcess.kill("SIGTERM");
    }
  }
}

// Run the monitoring
monitorCoreWebVitals().catch((error) => {
  console.error("❌ Core Web Vitals monitoring failed:", error.message);
  process.exit(1);
});
