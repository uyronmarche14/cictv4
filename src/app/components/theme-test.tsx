"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import {
  testThemePersistence,
  validateThemeAccessibility,
  getStoredTheme,
  getSystemTheme,
} from "@/app/lib/utils/theme-utils";
import { runThemeValidation } from "@/app/lib/utils/theme-validation";

import type { ThemeValidationResult } from "@/app/lib/utils/theme-validation";

interface ThemeTestResults {
  persistence: boolean;
  accessibility: {
    hasAriaLabels: boolean;
    hasKeyboardSupport: boolean;
    hasScreenReaderSupport: boolean;
    hasFocusIndicators: boolean;
  };
  currentTheme: string;
  resolvedTheme: string;
  storedTheme: string | null;
  systemTheme: string;
  validation?: {
    implementation: ThemeValidationResult;
    switching: ThemeValidationResult;
    accessibility: ThemeValidationResult;
    overall: ThemeValidationResult;
  };
}

/**
 * Development component for testing theme functionality
 * Only renders in development mode
 */
export function ThemeTest() {
  const { theme, resolvedTheme } = useTheme();
  const [testResults, setTestResults] = useState<ThemeTestResults | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show in development
    if (process.env.NODE_ENV !== "development") return;

    const runTests = async () => {
      const validation = await runThemeValidation();

      const results: ThemeTestResults = {
        persistence: testThemePersistence(),
        accessibility: validateThemeAccessibility(),
        currentTheme: theme || "unknown",
        resolvedTheme: resolvedTheme || "unknown",
        storedTheme: getStoredTheme(),
        systemTheme: getSystemTheme(),
        validation,
      };

      setTestResults(results);
    };

    // Run tests after a short delay to ensure DOM is ready
    const timer = setTimeout(runTests, 1000);
    return () => clearTimeout(timer);
  }, [theme, resolvedTheme]);

  // Don't render in production
  if (process.env.NODE_ENV !== "development") return null;

  return (
    <div className="fixed right-4 bottom-4 z-50">
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="rounded-md bg-blue-500 px-3 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
        aria-label="Toggle theme test results"
      >
        Theme Test
      </button>

      {isVisible && testResults && (
        <div className="absolute right-0 bottom-12 max-w-md min-w-80 rounded-lg border border-gray-200 bg-white p-4 shadow-lg dark:border-gray-700 dark:bg-gray-800">
          <h3 className="mb-3 text-lg font-semibold text-gray-900 dark:text-gray-100">
            Theme Test Results
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <strong className="text-gray-700 dark:text-gray-300">
                Current Theme:
              </strong>
              <span className="ml-2 text-gray-900 dark:text-gray-100">
                {testResults.currentTheme}
              </span>
            </div>

            <div>
              <strong className="text-gray-700 dark:text-gray-300">
                Resolved Theme:
              </strong>
              <span className="ml-2 text-gray-900 dark:text-gray-100">
                {testResults.resolvedTheme}
              </span>
            </div>

            <div>
              <strong className="text-gray-700 dark:text-gray-300">
                Stored Theme:
              </strong>
              <span className="ml-2 text-gray-900 dark:text-gray-100">
                {testResults.storedTheme || "none"}
              </span>
            </div>

            <div>
              <strong className="text-gray-700 dark:text-gray-300">
                System Theme:
              </strong>
              <span className="ml-2 text-gray-900 dark:text-gray-100">
                {testResults.systemTheme}
              </span>
            </div>

            <div>
              <strong className="text-gray-700 dark:text-gray-300">
                Persistence Test:
              </strong>
              <span
                className={`ml-2 ${testResults.persistence ? "text-green-600" : "text-red-600"}`}
              >
                {testResults.persistence ? "✓ Pass" : "✗ Fail"}
              </span>
            </div>

            <div>
              <strong className="text-gray-700 dark:text-gray-300">
                Accessibility:
              </strong>
              <div className="mt-1 ml-4 space-y-1">
                <div
                  className={
                    testResults.accessibility.hasAriaLabels
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {testResults.accessibility.hasAriaLabels ? "✓" : "✗"} ARIA
                  Labels
                </div>
                <div
                  className={
                    testResults.accessibility.hasKeyboardSupport
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {testResults.accessibility.hasKeyboardSupport ? "✓" : "✗"}{" "}
                  Keyboard Support
                </div>
                <div
                  className={
                    testResults.accessibility.hasScreenReaderSupport
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {testResults.accessibility.hasScreenReaderSupport ? "✓" : "✗"}{" "}
                  Screen Reader
                </div>
                <div
                  className={
                    testResults.accessibility.hasFocusIndicators
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {testResults.accessibility.hasFocusIndicators ? "✓" : "✗"}{" "}
                  Focus Indicators
                </div>
              </div>
            </div>

            {testResults.validation && (
              <div>
                <strong className="text-gray-700 dark:text-gray-300">
                  Comprehensive Validation:
                </strong>
                <div className="mt-1 ml-4 space-y-2">
                  <div>
                    <span
                      className={`font-medium ${testResults.validation.overall.isValid ? "text-green-600" : "text-red-600"}`}
                    >
                      Overall:{" "}
                      {testResults.validation.overall.isValid
                        ? "✓ Pass"
                        : "✗ Fail"}
                    </span>
                  </div>

                  {testResults.validation.overall.errors.length > 0 && (
                    <div>
                      <span className="font-medium text-red-600">Errors:</span>
                      <ul className="ml-4 space-y-1 text-xs">
                        {testResults.validation.overall.errors.map(
                          (error, index) => (
                            <li key={index} className="text-red-600">
                              • {error}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}

                  {testResults.validation.overall.warnings.length > 0 && (
                    <div>
                      <span className="font-medium text-yellow-600">
                        Warnings:
                      </span>
                      <ul className="ml-4 space-y-1 text-xs">
                        {testResults.validation.overall.warnings.map(
                          (warning, index) => (
                            <li key={index} className="text-yellow-600">
                              • {warning}
                            </li>
                          )
                        )}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="mt-3 text-xs text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            Close
          </button>
        </div>
      )}
    </div>
  );
}
