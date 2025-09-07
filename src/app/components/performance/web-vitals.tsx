"use client";

import { useEffect } from "react";
import { reportWebVitals } from "@/app/lib/utils/performance";

/**
 * Component for tracking and reporting Web Vitals
 */
export function WebVitalsReporter() {
  useEffect(() => {
    // Only load web-vitals in the browser
    if (typeof window !== "undefined") {
      import("web-vitals")
        .then(({ onCLS, onFID, onFCP, onLCP, onTTFB }) => {
          onCLS(reportWebVitals);
          onFID(reportWebVitals);
          onFCP(reportWebVitals);
          onLCP(reportWebVitals);
          onTTFB(reportWebVitals);
        })
        .catch((error) => {
          console.warn("Failed to load web-vitals:", error);
        });
    }
  }, []);

  return null;
}
