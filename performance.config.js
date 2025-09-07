/**
 * Performance monitoring configuration
 * Centralized configuration for all performance tools
 */

module.exports = {
  // Bundle analysis configuration
  bundle: {
    thresholds: {
      javascript: {
        maxSizeKB: 1000, // 1MB
        warningSizeKB: 500, // 500KB
      },
      css: {
        maxSizeKB: 8, // 8KB
        warningSizeKB: 6, // 6KB
      },
      individual: {
        maxChunkKB: 250, // 250KB per chunk
        warningChunkKB: 150, // 150KB per chunk
      },
    },
    analyzer: {
      enabled: process.env.ANALYZE === "true",
      openAnalyzer: process.env.ANALYZE === "true",
      generateStatsFile: true,
    },
  },

  // Build profiling configuration
  build: {
    thresholds: {
      maxBuildTimeMs: 60000, // 60 seconds
      warningBuildTimeMs: 30000, // 30 seconds
      maxCompilationTimeMs: 30000, // 30 seconds
      warningCompilationTimeMs: 15000, // 15 seconds
    },
    profiling: {
      enabled:
        process.env.NODE_ENV === "development" ||
        process.env.PROFILE === "true",
      webpackProfile: process.env.WEBPACK_PROFILE === "true",
      saveProfiles: true,
    },
  },

  // Core Web Vitals configuration
  coreWebVitals: {
    thresholds: {
      lcp: 2500, // Largest Contentful Paint (ms)
      fid: 100, // First Input Delay (ms)
      cls: 0.1, // Cumulative Layout Shift
      fcp: 1800, // First Contentful Paint (ms)
      ttfb: 600, // Time to First Byte (ms)
      tbt: 200, // Total Blocking Time (ms)
    },
    testing: {
      runs: 3,
      urls: [
        "http://localhost:3000",
        "http://localhost:3000/about",
        "http://localhost:3000/contact",
      ],
      timeout: 30000,
    },
  },

  // Lighthouse CI configuration
  lighthouse: {
    thresholds: {
      performance: 90,
      accessibility: 90,
      bestPractices: 90,
      seo: 90,
    },
    settings: {
      preset: "desktop",
      emulatedFormFactor: "desktop",
      throttling: {
        rttMs: 40,
        throughputKbps: 10240,
        cpuSlowdownMultiplier: 1,
      },
    },
  },

  // Development monitoring configuration
  development: {
    monitoring: {
      enabled: process.env.NODE_ENV === "development",
      interval: 5000, // 5 seconds
      memoryThresholdMB: 500,
      cpuThresholdPercent: 80,
      buildTimeThresholdMs: 10000,
      hotReloadThresholdMs: 3000,
    },
    logging: {
      level: process.env.LOG_LEVEL || "INFO",
      saveToFile: true,
      maxLogSizeMB: 10,
    },
  },

  // Results and reporting configuration
  reporting: {
    outputDir: "./performance-results",
    formats: ["json", "html"],
    retention: {
      days: 30,
      maxFiles: 100,
    },
    notifications: {
      enabled: false,
      webhook: process.env.PERFORMANCE_WEBHOOK,
      thresholdFailures: true,
    },
  },

  // CI/CD integration configuration
  ci: {
    enabled: process.env.CI === "true",
    failOnThresholds: true,
    generateReports: true,
    uploadResults: false,
    compareBaseline: false,
  },
};
