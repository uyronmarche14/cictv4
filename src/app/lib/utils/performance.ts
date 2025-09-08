/**
 * Performance monitoring utilities for tracking Core Web Vitals and bundle sizes
 */

// Core Web Vitals tracking
export interface WebVitalsMetric {
  name: string;
  value: number;
  rating: "good" | "needs-improvement" | "poor";
  delta: number;
  id: string;
}

/**
 * Report Core Web Vitals to analytics
 */
export function reportWebVitals(_metric: WebVitalsMetric) {
  // In production, you would send this to your analytics service
  // Example: analytics.track('web-vitals', metric);
}

/**
 * Performance observer for monitoring loading performance
 */
export class PerformanceMonitor {
  private static instance: PerformanceMonitor;
  private observers: PerformanceObserver[] = [];

  private constructor() {
    this.initializeObservers();
  }

  static getInstance(): PerformanceMonitor {
    if (!PerformanceMonitor.instance) {
      PerformanceMonitor.instance = new PerformanceMonitor();
    }
    return PerformanceMonitor.instance;
  }

  private initializeObservers() {
    if (typeof window === "undefined") return;

    // Monitor navigation timing
    if ("PerformanceObserver" in window) {
      try {
        // Monitor paint timing
        const paintObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.name === "first-contentful-paint") {
              this.logMetric("FCP", entry.startTime);
            }
          }
        });
        paintObserver.observe({ entryTypes: ["paint"] });
        this.observers.push(paintObserver);

        // Monitor largest contentful paint
        const lcpObserver = new PerformanceObserver((list) => {
          const entries = list.getEntries();
          const lastEntry = entries[entries.length - 1];
          this.logMetric("LCP", lastEntry.startTime);
        });
        lcpObserver.observe({ entryTypes: ["largest-contentful-paint"] });
        this.observers.push(lcpObserver);

        // Monitor layout shifts
        const clsObserver = new PerformanceObserver((list) => {
          let clsValue = 0;
          for (const entry of list.getEntries() as PerformanceEntry[]) {
            const layoutShiftEntry = entry as PerformanceEntry & {
              value: number;
              hadRecentInput: boolean;
            };
            if (!layoutShiftEntry.hadRecentInput) {
              clsValue += layoutShiftEntry.value;
            }
          }
          this.logMetric("CLS", clsValue);
        });
        clsObserver.observe({ entryTypes: ["layout-shift"] });
        this.observers.push(clsObserver);
      } catch (error) {
        console.warn("Performance monitoring not supported:", error);
      }
    }
  }

  private logMetric(_name: string, _value: number) {
    // Metrics are handled by external analytics in production
  }

  /**
   * Measure component render time
   */
  measureComponentRender<T>(componentName: string, renderFn: () => T): T {
    const startTime = performance.now();
    const result = renderFn();
    const endTime = performance.now();

    this.logMetric(`Component:${componentName}`, endTime - startTime);
    return result;
  }

  /**
   * Measure async operation time
   */
  async measureAsync<T>(
    operationName: string,
    asyncFn: () => Promise<T>,
  ): Promise<T> {
    const startTime = performance.now();
    const result = await asyncFn();
    const endTime = performance.now();

    this.logMetric(`Async:${operationName}`, endTime - startTime);
    return result;
  }

  /**
   * Clean up observers
   */
  disconnect() {
    this.observers.forEach((observer) => observer.disconnect());
    this.observers = [];
  }
}

/**
 * Hook for measuring component performance
 */
export function usePerformanceMonitor(componentName: string) {
  const monitor = PerformanceMonitor.getInstance();

  return {
    measureRender: <T>(renderFn: () => T) =>
      monitor.measureComponentRender(componentName, renderFn),
    measureAsync: <T>(operationName: string, asyncFn: () => Promise<T>) =>
      monitor.measureAsync(`${componentName}:${operationName}`, asyncFn),
  };
}

/**
 * Bundle size monitoring (development only)
 */
export function logBundleInfo() {
  if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
    const scripts = Array.from(document.querySelectorAll("script[src]"));
    const stylesheets = Array.from(
      document.querySelectorAll('link[rel="stylesheet"]'),
    );

    console.warn("[Bundle Info]", {
      scriptsLoaded: scripts.length,
      stylesheetsLoaded: stylesheets.length,
      scriptSources: scripts
        .map((script) => ({
          src: (script as HTMLScriptElement).src,
        }))
        .slice(0, 5),
    });
  }
}

/**
 * Memory usage monitoring
 */
export function logMemoryUsage() {
  if (process.env.NODE_ENV === "development" && "memory" in performance) {
    const memory = performance as Performance & {
      memory: {
        usedJSHeapSize: number;
        totalJSHeapSize: number;
        jsHeapSizeLimit: number;
      };
    };
    
    console.warn("[Memory Usage]", {
      used: `${Math.round(memory.memory.usedJSHeapSize / 1024 / 1024)}MB`,
      total: `${Math.round(memory.memory.totalJSHeapSize / 1024 / 1024)}MB`,
      limit: `${Math.round(memory.memory.jsHeapSizeLimit / 1024 / 1024)}MB`,
    });
  }
}
