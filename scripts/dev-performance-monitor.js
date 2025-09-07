#!/usr/bin/env node

const { spawn, execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

/**
 * Development performance monitoring tool
 * Monitors development server performance and provides real-time insights
 */

console.log("🔧 Starting development performance monitor...\n");

// Configuration
const config = {
  port: 3000,
  monitorInterval: 5000, // 5 seconds
  logFile: path.join(
    process.cwd(),
    "performance-results",
    "dev-performance.log"
  ),
  metricsFile: path.join(
    process.cwd(),
    "performance-results",
    "dev-metrics.json"
  ),
  thresholds: {
    memoryUsageMB: 500,
    cpuUsagePercent: 80,
    buildTimeMs: 10000,
    hotReloadMs: 3000,
  },
};

// Ensure results directory exists
const resultsDir = path.dirname(config.logFile);
if (!fs.existsSync(resultsDir)) {
  fs.mkdirSync(resultsDir, { recursive: true });
}

// Performance metrics storage
const metrics = {
  startTime: Date.now(),
  builds: [],
  hotReloads: [],
  memoryUsage: [],
  cpuUsage: [],
  warnings: [],
};

/**
 * Log message with timestamp
 */
function log(message, level = "INFO") {
  const timestamp = new Date().toISOString();
  const logEntry = `[${timestamp}] [${level}] ${message}`;

  console.log(logEntry);

  // Append to log file
  fs.appendFileSync(config.logFile, logEntry + "\n");
}

/**
 * Get system performance metrics
 */
function getSystemMetrics() {
  try {
    // Get memory usage
    const memInfo = execSync(
      'node -e "console.log(JSON.stringify(process.memoryUsage()))"',
      { encoding: "utf8" }
    );
    const memory = JSON.parse(memInfo.trim());

    // Get CPU usage (approximate)
    const cpuUsage = process.cpuUsage();

    return {
      timestamp: Date.now(),
      memory: {
        rss: memory.rss,
        heapTotal: memory.heapTotal,
        heapUsed: memory.heapUsed,
        external: memory.external,
        rssMB: (memory.rss / 1024 / 1024).toFixed(2),
        heapUsedMB: (memory.heapUsed / 1024 / 1024).toFixed(2),
      },
      cpu: {
        user: cpuUsage.user,
        system: cpuUsage.system,
      },
    };
  } catch (error) {
    log(`Failed to get system metrics: ${error.message}`, "ERROR");
    return null;
  }
}

/**
 * Monitor development server output
 */
function monitorDevServer() {
  log("Starting Next.js development server...");

  const devProcess = spawn("npm", ["run", "dev"], {
    stdio: "pipe",
    env: { ...process.env, FORCE_COLOR: "0" },
  });

  let buildStartTime = null;
  let isBuilding = false;

  // Monitor stdout
  devProcess.stdout.on("data", (data) => {
    const output = data.toString();

    // Detect build start
    if (output.includes("Compiling") && !isBuilding) {
      buildStartTime = Date.now();
      isBuilding = true;
      log("Build started");
    }

    // Detect build completion
    if (output.includes("Compiled successfully") && isBuilding) {
      const buildTime = Date.now() - buildStartTime;
      isBuilding = false;

      metrics.builds.push({
        timestamp: Date.now(),
        duration: buildTime,
        success: true,
      });

      log(`Build completed in ${buildTime}ms`);

      // Check build time threshold
      if (buildTime > config.thresholds.buildTimeMs) {
        const warning = `Slow build detected: ${buildTime}ms (threshold: ${config.thresholds.buildTimeMs}ms)`;
        log(warning, "WARN");
        metrics.warnings.push({
          timestamp: Date.now(),
          type: "slow_build",
          message: warning,
          value: buildTime,
        });
      }
    }

    // Detect build errors
    if (output.includes("Failed to compile") && isBuilding) {
      const buildTime = Date.now() - buildStartTime;
      isBuilding = false;

      metrics.builds.push({
        timestamp: Date.now(),
        duration: buildTime,
        success: false,
      });

      log(`Build failed after ${buildTime}ms`, "ERROR");
    }

    // Detect hot reload
    if (output.includes("Fast Refresh")) {
      const hotReloadTime = Date.now();
      metrics.hotReloads.push({
        timestamp: hotReloadTime,
      });

      log("Hot reload triggered");
    }

    // Log server output (filtered)
    const lines = output
      .split("\n")
      .filter(
        (line) =>
          line.trim() &&
          !line.includes("webpack compiled") &&
          !line.includes("event - build page")
      );

    lines.forEach((line) => {
      if (line.trim()) {
        log(`DEV: ${line.trim()}`);
      }
    });
  });

  // Monitor stderr
  devProcess.stderr.on("data", (data) => {
    const error = data.toString();
    log(`DEV ERROR: ${error}`, "ERROR");
  });

  // Handle process exit
  devProcess.on("exit", (code) => {
    log(
      `Development server exited with code ${code}`,
      code === 0 ? "INFO" : "ERROR"
    );
  });

  return devProcess;
}

/**
 * Start system monitoring
 */
function startSystemMonitoring() {
  log("Starting system performance monitoring...");

  const monitorInterval = setInterval(() => {
    const systemMetrics = getSystemMetrics();

    if (systemMetrics) {
      metrics.memoryUsage.push(systemMetrics.memory);
      metrics.cpuUsage.push(systemMetrics.cpu);

      // Check memory threshold
      const memoryMB = parseFloat(systemMetrics.memory.rssMB);
      if (memoryMB > config.thresholds.memoryUsageMB) {
        const warning = `High memory usage: ${memoryMB}MB (threshold: ${config.thresholds.memoryUsageMB}MB)`;
        log(warning, "WARN");
        metrics.warnings.push({
          timestamp: Date.now(),
          type: "high_memory",
          message: warning,
          value: memoryMB,
        });
      }

      // Log current metrics
      log(
        `Memory: ${systemMetrics.memory.rssMB}MB, Heap: ${systemMetrics.memory.heapUsedMB}MB`
      );
    }
  }, config.monitorInterval);

  return monitorInterval;
}

/**
 * Generate performance summary
 */
function generateSummary() {
  const runtime = Date.now() - metrics.startTime;
  const runtimeMinutes = (runtime / 1000 / 60).toFixed(2);

  log("\n📊 Development Performance Summary");
  log("═".repeat(50));
  log(`Runtime: ${runtimeMinutes} minutes`);
  log(`Total Builds: ${metrics.builds.length}`);
  log(`Successful Builds: ${metrics.builds.filter((b) => b.success).length}`);
  log(`Failed Builds: ${metrics.builds.filter((b) => !b.success).length}`);
  log(`Hot Reloads: ${metrics.hotReloads.length}`);
  log(`Warnings: ${metrics.warnings.length}`);

  // Build performance
  if (metrics.builds.length > 0) {
    const successfulBuilds = metrics.builds.filter((b) => b.success);
    if (successfulBuilds.length > 0) {
      const avgBuildTime =
        successfulBuilds.reduce((sum, b) => sum + b.duration, 0) /
        successfulBuilds.length;
      const maxBuildTime = Math.max(...successfulBuilds.map((b) => b.duration));
      const minBuildTime = Math.min(...successfulBuilds.map((b) => b.duration));

      log(`Average Build Time: ${avgBuildTime.toFixed(0)}ms`);
      log(`Max Build Time: ${maxBuildTime}ms`);
      log(`Min Build Time: ${minBuildTime}ms`);
    }
  }

  // Memory usage
  if (metrics.memoryUsage.length > 0) {
    const avgMemory =
      metrics.memoryUsage.reduce((sum, m) => sum + parseFloat(m.rssMB), 0) /
      metrics.memoryUsage.length;
    const maxMemory = Math.max(
      ...metrics.memoryUsage.map((m) => parseFloat(m.rssMB))
    );

    log(`Average Memory Usage: ${avgMemory.toFixed(2)}MB`);
    log(`Peak Memory Usage: ${maxMemory.toFixed(2)}MB`);
  }

  // Warnings summary
  if (metrics.warnings.length > 0) {
    log("\n⚠️  Performance Warnings:");
    const warningTypes = {};
    metrics.warnings.forEach((w) => {
      warningTypes[w.type] = (warningTypes[w.type] || 0) + 1;
    });

    Object.entries(warningTypes).forEach(([type, count]) => {
      log(`   ${type}: ${count} occurrences`);
    });
  }

  // Save metrics to file
  fs.writeFileSync(config.metricsFile, JSON.stringify(metrics, null, 2));
  log(`\n💾 Metrics saved to: ${config.metricsFile}`);
}

/**
 * Main monitoring function
 */
function startMonitoring() {
  log("🚀 Development Performance Monitor Started");
  log(`Monitoring on port ${config.port}`);
  log(`Log file: ${config.logFile}`);
  log(`Metrics file: ${config.metricsFile}`);
  log("Press Ctrl+C to stop monitoring\n");

  // Start development server monitoring
  const devProcess = monitorDevServer();

  // Start system monitoring
  const monitorInterval = startSystemMonitoring();

  // Handle graceful shutdown
  process.on("SIGINT", () => {
    log("\n🛑 Stopping performance monitor...");

    // Stop monitoring
    clearInterval(monitorInterval);

    // Stop dev server
    devProcess.kill("SIGTERM");

    // Generate summary
    generateSummary();

    log("✨ Performance monitoring stopped");
    process.exit(0);
  });

  // Handle uncaught errors
  process.on("uncaughtException", (error) => {
    log(`Uncaught exception: ${error.message}`, "ERROR");
    generateSummary();
    process.exit(1);
  });
}

// Start monitoring
startMonitoring();
