"use client";

import { useEffect } from "react";

/**
 * Performance monitoring component for development
 */
export function PerformanceMonitor() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    // Monitor bundle loading performance
    const monitorBundlePerformance = () => {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();

        entries.forEach((entry) => {
          if (entry.entryType === "resource" && entry.name.includes(".js")) {
            const resource = entry as PerformanceResourceTiming;
            const size = resource.transferSize || 0;
            const loadTime = resource.responseEnd - resource.requestStart;

            if (size > 100 * 1024) {
              // Log chunks larger than 100KB
              console.warn(
                `📦 Large JS chunk loaded: ${entry.name.split("/").pop()}\n   Size: ${(size / 1024).toFixed(2)}KB\n   Load time: ${loadTime.toFixed(2)}ms`
              );
            }
          }
        });
      });

      observer.observe({ entryTypes: ["resource"] });

      return () => observer.disconnect();
    };

    // Monitor Core Web Vitals
    const monitorWebVitals = () => {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          switch (entry.entryType) {
            case "paint":
              if (entry.name === "first-contentful-paint") {
                console.warn(`🎨 FCP: ${entry.startTime.toFixed(2)}ms`);
              }
              break;
            case "largest-contentful-paint":
              console.warn(`🖼️ LCP: ${entry.startTime.toFixed(2)}ms`);
              break;
            case "layout-shift":
              const cls = entry as PerformanceEntry & { value: number };
              if (cls.value > 0.1) {
                console.warn(
                  `⚠️ Layout shift detected: ${cls.value.toFixed(4)}`
                );
              }
              break;
          }
        });
      });

      observer.observe({
        entryTypes: ["paint", "largest-contentful-paint", "layout-shift"],
      });

      return () => observer.disconnect();
    };

    // Start monitoring
    const cleanup1 = monitorBundlePerformance();
    const cleanup2 = monitorWebVitals();

    // Log initial bundle info after load
    window.addEventListener("load", () => {
      setTimeout(() => {
        const resources = performance.getEntriesByType(
          "resource"
        ) as PerformanceResourceTiming[];
        const jsResources = resources.filter(
          (r) => r.name.includes(".js") && !r.name.includes("hot-update")
        );

        const totalSize = jsResources.reduce(
          (sum, r) => sum + (r.transferSize || 0),
          0
        );

        if (totalSize > 500 * 1024) {
          console.warn("🚨 Bundle Performance Summary\nBundle size is very large (>500KB)\n" +
            `Total JS Size: ${(totalSize / 1024).toFixed(2)}KB\nJS Chunks: ${jsResources.length}`);
        } else if (totalSize > 250 * 1024) {
          console.warn("⚠️ Bundle Performance Summary\nBundle size is getting large (>250KB)\n" +
            `Total JS Size: ${(totalSize / 1024).toFixed(2)}KB\nJS Chunks: ${jsResources.length}`);
        } else {
          console.warn("✅ Bundle Performance Summary\nBundle size looks good\n" +
            `Total JS Size: ${(totalSize / 1024).toFixed(2)}KB\nJS Chunks: ${jsResources.length}`);
        }
      }, 1000);
    });

    return () => {
      cleanup1();
      cleanup2();
    };
  }, []);

  return null;
}

/**
 * Hook to monitor component loading performance
 */
export function useComponentPerformance(componentName: string) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;

      if (loadTime > 100) {
        // Log components that take >100ms to load
        console.warn(`⏱️ ${componentName} loaded in ${loadTime.toFixed(2)}ms`);
      }
    };
  }, [componentName]);
}

/**
 * Monitor lazy loading performance
 */
export function useLazyLoadingPerformance(componentName: string) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;

    console.warn(`🔄 Lazy loading: ${componentName}`);
    const startTime = performance.now();

    return () => {
      const endTime = performance.now();
      const loadTime = endTime - startTime;
      console.warn(
        `✅ ${componentName} lazy loaded in ${loadTime.toFixed(2)}ms`
      );
    };
  }, [componentName]);
}
