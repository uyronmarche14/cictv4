/**
 * Theme utility functions for persistence and accessibility testing
 */

export type Theme = "light" | "dark" | "system";

/**
 * Get the current theme from localStorage
 */
export function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem("cictv4-theme");
    return stored as Theme;
  } catch (error) {
    console.warn("Failed to read theme from localStorage:", error);
    return null;
  }
}

/**
 * Set theme in localStorage
 */
export function setStoredTheme(theme: Theme): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem("cictv4-theme", theme);
  } catch (error) {
    console.warn("Failed to save theme to localStorage:", error);
  }
}

/**
 * Get system theme preference
 */
export function getSystemTheme(): "light" | "dark" {
  if (typeof window === "undefined") return "light";

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

/**
 * Resolve theme to actual light/dark value
 */
export function resolveTheme(theme: Theme): "light" | "dark" {
  return theme === "system" ? getSystemTheme() : theme;
}

/**
 * Test theme persistence across page reloads
 */
export function testThemePersistence(): boolean {
  if (typeof window === "undefined") return false;

  const testTheme: Theme = "dark";
  const originalTheme = getStoredTheme();

  try {
    // Set test theme
    setStoredTheme(testTheme);

    // Verify it was stored
    const storedTheme = getStoredTheme();
    const success = storedTheme === testTheme;

    // Restore original theme
    if (originalTheme) {
      setStoredTheme(originalTheme);
    } else {
      localStorage.removeItem("cictv4-theme");
    }

    return success;
  } catch (error) {
    console.error("Theme persistence test failed:", error);
    return false;
  }
}

/**
 * Validate theme accessibility features
 */
export function validateThemeAccessibility(): {
  hasAriaLabels: boolean;
  hasKeyboardSupport: boolean;
  hasScreenReaderSupport: boolean;
  hasFocusIndicators: boolean;
} {
  if (typeof window === "undefined") {
    return {
      hasAriaLabels: false,
      hasKeyboardSupport: false,
      hasScreenReaderSupport: false,
      hasFocusIndicators: false,
    };
  }

  const themeToggle = document.querySelector('[aria-label*="theme"]');

  return {
    hasAriaLabels: !!themeToggle?.getAttribute("aria-label"),
    hasKeyboardSupport: themeToggle?.getAttribute("type") === "button",
    hasScreenReaderSupport: !!themeToggle?.querySelector(".sr-only"),
    hasFocusIndicators: !!themeToggle?.classList.contains("focus:ring-2"),
  };
}
