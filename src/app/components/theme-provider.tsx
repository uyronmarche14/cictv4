"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, type ThemeProviderProps } from "next-themes";

interface HydrationSafeThemeProviderProps extends ThemeProviderProps {
  children: React.ReactNode;
}

/**
 * Hydration-safe theme provider that prevents mismatches between server and client
 * by properly handling the initial theme state and transitions
 */
export function ThemeProvider({
  children,
  ...props
}: HydrationSafeThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
      storageKey="cictv4-theme"
      {...props}
    >
      {children}
    </NextThemesProvider>
  );
}
