/**
 * Theme validation utilities for testing theme functionality
 */

import type { Theme } from "./theme-utils";

export interface ThemeValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

/**
 * Validate theme configuration and implementation
 */
export function validateThemeImplementation(): ThemeValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check if we're in a browser environment
  if (typeof window === "undefined") {
    return {
      isValid: true,
      errors: [],
      warnings: ["Theme validation skipped - not in browser environment"],
    };
  }

  // Check localStorage support
  try {
    const testKey = "theme-test-key";
    localStorage.setItem(testKey, "test");
    localStorage.removeItem(testKey);
  } catch (error) {
    errors.push("localStorage is not available for theme persistence");
  }

  // Check if CSS custom properties are supported
  if (!CSS.supports("color", "var(--primary)")) {
    warnings.push("CSS custom properties may not be fully supported");
  }

  // Check if prefers-color-scheme is supported
  if (!window.matchMedia) {
    warnings.push(
      "matchMedia API not available - system theme detection may not work"
    );
  } else {
    try {
      window.matchMedia("(prefers-color-scheme: dark)");
    } catch (error) {
      warnings.push("prefers-color-scheme media query not supported");
    }
  }

  // Check if document.documentElement.classList is available
  if (!document.documentElement.classList) {
    errors.push("classList API not available - theme switching may not work");
  }

  // Check for theme-related CSS classes
  const stylesheets = Array.from(document.styleSheets);
  let hasThemeClasses = false;

  try {
    for (const stylesheet of stylesheets) {
      try {
        const rules = Array.from(stylesheet.cssRules || []);
        for (const rule of rules) {
          if (
            rule instanceof CSSStyleRule &&
            rule.selectorText?.includes(".dark")
          ) {
            hasThemeClasses = true;
            break;
          }
        }
        if (hasThemeClasses) break;
      } catch (e) {
        // Skip stylesheets we can't access (CORS)
        continue;
      }
    }
  } catch (error) {
    warnings.push("Could not validate CSS theme classes");
  }

  if (!hasThemeClasses) {
    warnings.push(
      "No dark theme CSS classes found - theme switching may not be visible"
    );
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Test theme switching functionality
 */
export async function testThemeSwitching(): Promise<ThemeValidationResult> {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (typeof window === "undefined") {
    return {
      isValid: true,
      errors: [],
      warnings: ["Theme switching test skipped - not in browser environment"],
    };
  }

  const originalClass = document.documentElement.className;
  const originalTheme = localStorage.getItem("cictv4-theme");

  try {
    // Test adding dark class
    document.documentElement.classList.add("dark");
    if (!document.documentElement.classList.contains("dark")) {
      errors.push("Failed to add dark class to document element");
    }

    // Test removing dark class
    document.documentElement.classList.remove("dark");
    if (document.documentElement.classList.contains("dark")) {
      errors.push("Failed to remove dark class from document element");
    }

    // Test localStorage theme storage
    localStorage.setItem("cictv4-theme", "dark");
    if (localStorage.getItem("cictv4-theme") !== "dark") {
      errors.push("Failed to store theme in localStorage");
    }

    localStorage.setItem("cictv4-theme", "light");
    if (localStorage.getItem("cictv4-theme") !== "light") {
      errors.push("Failed to update theme in localStorage");
    }

    // Test system theme detection
    if (window.matchMedia) {
      const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");
      if (typeof darkModeQuery.matches !== "boolean") {
        warnings.push("System theme detection may not work properly");
      }
    }
  } catch (error) {
    errors.push(
      `Theme switching test failed: ${error instanceof Error ? error.message : "Unknown error"}`
    );
  } finally {
    // Restore original state
    document.documentElement.className = originalClass;
    if (originalTheme) {
      localStorage.setItem("cictv4-theme", originalTheme);
    } else {
      localStorage.removeItem("cictv4-theme");
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Validate accessibility features of theme toggle
 */
export function validateThemeAccessibility(): ThemeValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (typeof window === "undefined") {
    return {
      isValid: true,
      errors: [],
      warnings: [
        "Accessibility validation skipped - not in browser environment",
      ],
    };
  }

  // Find theme toggle buttons
  const themeToggles = document.querySelectorAll(
    '[aria-label*="theme" i], [aria-label*="dark" i], [aria-label*="light" i]'
  );

  if (themeToggles.length === 0) {
    errors.push("No theme toggle buttons found with proper aria-label");
    return { isValid: false, errors, warnings };
  }

  themeToggles.forEach((toggle, index) => {
    const element = toggle as HTMLElement;

    // Check for aria-label
    if (!element.getAttribute("aria-label")) {
      errors.push(`Theme toggle ${index + 1} missing aria-label`);
    }

    // Check if it's a button or has button role
    if (
      element.tagName !== "BUTTON" &&
      element.getAttribute("role") !== "button"
    ) {
      errors.push(
        `Theme toggle ${index + 1} should be a button element or have button role`
      );
    }

    // Check for keyboard accessibility
    if (element.tabIndex < 0) {
      warnings.push(
        `Theme toggle ${index + 1} may not be keyboard accessible (negative tabIndex)`
      );
    }

    // Check for screen reader text
    const srText = element.querySelector(".sr-only, .visually-hidden");
    if (!srText) {
      warnings.push(`Theme toggle ${index + 1} missing screen reader text`);
    }

    // Check for focus indicators (basic check)
    const computedStyle = window.getComputedStyle(element);
    if (!computedStyle.outlineStyle && !element.className.includes("focus:")) {
      warnings.push(
        `Theme toggle ${index + 1} may be missing focus indicators`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

/**
 * Run comprehensive theme validation
 */
export async function runThemeValidation(): Promise<{
  implementation: ThemeValidationResult;
  switching: ThemeValidationResult;
  accessibility: ThemeValidationResult;
  overall: ThemeValidationResult;
}> {
  const implementation = validateThemeImplementation();
  const switching = await testThemeSwitching();
  const accessibility = validateThemeAccessibility();

  const allErrors = [
    ...implementation.errors,
    ...switching.errors,
    ...accessibility.errors,
  ];

  const allWarnings = [
    ...implementation.warnings,
    ...switching.warnings,
    ...accessibility.warnings,
  ];

  const overall: ThemeValidationResult = {
    isValid: allErrors.length === 0,
    errors: allErrors,
    warnings: allWarnings,
  };

  return {
    implementation,
    switching,
    accessibility,
    overall,
  };
}
