/**
 * Bundle size monitoring utilities
 */

export interface BundleStats {
  totalSize: number;
  gzippedSize: number;
  chunks: Array<{
    name: string;
    size: number;
    gzippedSize: number;
  }>;
}

/**
 * Log bundle size information in development
 */
export function logBundleInfo() {
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    // Log performance metrics
    window.addEventListener("load", () => {
      setTimeout(() => {
        const navigation = performance.getEntriesByType(
          "navigation"
        )[0] as PerformanceNavigationTiming;
        const resources = performance.getEntriesByType(
          "resource"
        ) as PerformanceResourceTiming[];

        console.group("📦 Bundle Performance Metrics");

        // Calculate total JavaScript size
        const jsResources = resources.filter(
          (resource) =>
            resource.name.includes(".js") &&
            !resource.name.includes("hot-update")
        );

        const totalJSSize = jsResources.reduce((total, resource) => {
          return total + (resource.transferSize || 0);
        }, 0);

        console.log(`🚀 Total JS Bundle Size: ${formatBytes(totalJSSize)}`);
        console.log(
          `⏱️ DOM Content Loaded: ${navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart}ms`
        );
        console.log(
          `🎯 Load Complete: ${navigation.loadEventEnd - navigation.loadEventStart}ms`
        );

        // Log individual chunks
        console.group("📋 Individual Chunks");
        jsResources.forEach((resource) => {
          const size = resource.transferSize || 0;
          const name = resource.name.split("/").pop() || resource.name;
          console.log(`${name}: ${formatBytes(size)}`);
        });
        console.groupEnd();

        console.groupEnd();
      }, 1000);
    });
  }
}

/**
 * Format bytes to human readable format
 */
function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
}

/**
 * Monitor Core Web Vitals related to bundle size
 */
export function monitorWebVitals() {
  if (typeof window === "undefined") return;

  // Monitor First Contentful Paint
  const observer = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (
        entry.entryType === "paint" &&
        entry.name === "first-contentful-paint"
      ) {
        console.log(
          `🎨 First Contentful Paint: ${entry.startTime.toFixed(2)}ms`
        );
      }

      if (entry.entryType === "largest-contentful-paint") {
        console.log(
          `🖼️ Largest Contentful Paint: ${entry.startTime.toFixed(2)}ms`
        );
      }
    }
  });

  observer.observe({ entryTypes: ["paint", "largest-contentful-paint"] });
}

/**
 * Check if bundle size exceeds recommended limits
 */
export function checkBundleLimits() {
  if (process.env.NODE_ENV === "production") return;

  window.addEventListener("load", () => {
    setTimeout(() => {
      const resources = performance.getEntriesByType(
        "resource"
      ) as PerformanceResourceTiming[];
      const jsResources = resources.filter(
        (resource) =>
          resource.name.includes(".js") && !resource.name.includes("hot-update")
      );

      const totalSize = jsResources.reduce((total, resource) => {
        return total + (resource.transferSize || 0);
      }, 0);

      // Recommended limits
      const WARNING_LIMIT = 250 * 1024; // 250KB
      const ERROR_LIMIT = 500 * 1024; // 500KB

      if (totalSize > ERROR_LIMIT) {
        console.error(
          `🚨 Bundle size (${formatBytes(totalSize)}) exceeds recommended limit of ${formatBytes(ERROR_LIMIT)}`
        );
      } else if (totalSize > WARNING_LIMIT) {
        console.warn(
          `⚠️ Bundle size (${formatBytes(totalSize)}) is approaching the recommended limit of ${formatBytes(ERROR_LIMIT)}`
        );
      } else {
        console.log(
          `✅ Bundle size (${formatBytes(totalSize)}) is within recommended limits`
        );
      }
    }, 2000);
  });
}
