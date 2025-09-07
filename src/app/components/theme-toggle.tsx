"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { ClientOnly } from "./client-only";

/**
 * Hydration-safe theme toggle component with proper accessibility
 * Prevents hydration mismatches by using ClientOnly wrapper
 */
export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Fallback skeleton for SSR
  const ThemeToggleSkeleton = () => (
    <div className="bg-muted/20 animate-pulse rounded-md p-2">
      <div className="bg-muted/40 h-5 w-5 rounded" />
    </div>
  );

  return (
    <ClientOnly fallback={<ThemeToggleSkeleton />}>
      <button
        onClick={toggleTheme}
        className="hover:bg-muted/50 focus:ring-ring relative rounded-md p-2 transition-colors duration-200 focus:ring-2 focus:ring-offset-2 focus:outline-none"
        aria-label={`Switch to ${resolvedTheme === "dark" ? "light" : "dark"} theme`}
        aria-pressed={resolvedTheme === "dark"}
        type="button"
      >
        <Sun
          className="h-5 w-5 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <Moon
          className="absolute top-2 left-2 h-5 w-5 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0"
          strokeWidth={1.5}
          aria-hidden="true"
        />
        <span className="sr-only">
          {resolvedTheme === "dark"
            ? "Switch to light theme"
            : "Switch to dark theme"}
        </span>
      </button>
    </ClientOnly>
  );
}
