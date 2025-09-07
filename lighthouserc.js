module.exports = {
  ci: {
    collect: {
      // URLs to test
      url: [
        "http://localhost:3000",
        "http://localhost:3000/about",
        "http://localhost:3000/contact",
      ],
      // Start server automatically
      startServerCommand: "npm run start",
      startServerReadyPattern: "ready on",
      startServerReadyTimeout: 30000,
      // Number of runs per URL
      numberOfRuns: 3,
      // Settings for collection
      settings: {
        // Use desktop preset for consistent results
        preset: "desktop",
        // Disable device emulation for more consistent results
        emulatedFormFactor: "desktop",
        // Network throttling settings
        throttling: {
          rttMs: 40,
          throughputKbps: 10240,
          cpuSlowdownMultiplier: 1,
          requestLatencyMs: 0,
          downloadThroughputKbps: 0,
          uploadThroughputKbps: 0,
        },
        // Skip certain audits that might be flaky in CI
        skipAudits: [
          "screenshot-thumbnails",
          "final-screenshot",
          "largest-contentful-paint-element",
          "layout-shift-elements",
        ],
      },
    },
    assert: {
      // Performance assertions
      assertions: {
        // Core Web Vitals thresholds
        "categories:performance": ["error", { minScore: 0.9 }],
        "categories:accessibility": ["error", { minScore: 0.9 }],
        "categories:best-practices": ["error", { minScore: 0.9 }],
        "categories:seo": ["error", { minScore: 0.9 }],

        // Specific performance metrics
        "first-contentful-paint": ["error", { maxNumericValue: 2000 }],
        "largest-contentful-paint": ["error", { maxNumericValue: 2500 }],
        "cumulative-layout-shift": ["error", { maxNumericValue: 0.1 }],
        "total-blocking-time": ["error", { maxNumericValue: 300 }],
        "speed-index": ["error", { maxNumericValue: 3000 }],

        // Resource optimization
        "unused-css-rules": ["error", { maxNumericValue: 20000 }],
        "unused-javascript": ["error", { maxNumericValue: 40000 }],
        "render-blocking-resources": ["error", { maxNumericValue: 500 }],

        // Image optimization
        "modern-image-formats": ["error", { minScore: 0.8 }],
        "uses-optimized-images": ["error", { minScore: 0.8 }],
        "uses-responsive-images": ["error", { minScore: 0.8 }],

        // Bundle size checks
        "total-byte-weight": ["error", { maxNumericValue: 1600000 }], // 1.6MB
        "dom-size": ["error", { maxNumericValue: 1500 }],
      },
    },
    upload: {
      // Store results locally for now
      target: "filesystem",
      outputDir: "./lighthouse-results",
    },
  },
};
