"use client";
import React, { type ComponentProps } from "react";

import { createLazyComponent } from "@/app/lib/utils/lazy-loading";

// Lazy load commonly used Lucide icons to reduce initial bundle size
export const LazyChevronDown = createLazyComponent(
  () => import("lucide-react").then((mod) => ({ default: mod.ChevronDown as React.ComponentType<unknown> })),
  {
    fallback: () => (
      <div className="bg-muted/20 h-6 w-6 animate-pulse rounded" />
    ),
  }
);

export const LazyMenu = createLazyComponent(
  () => import("lucide-react").then((mod) => ({ default: mod.Menu as React.ComponentType<unknown> })),
  {
    fallback: () => (
      <div className="bg-muted/20 h-4 w-4 animate-pulse rounded" />
    ),
  }
);

export const LazyX = createLazyComponent(
  () => import("lucide-react").then((mod) => ({ default: mod.X as React.ComponentType<unknown> })),
  {
    fallback: () => (
      <div className="bg-muted/20 h-4 w-4 animate-pulse rounded" />
    ),
  }
);

export const LazySun = createLazyComponent(
  () => import("lucide-react").then((mod) => ({ default: mod.Sun as React.ComponentType<unknown> })),
  {
    fallback: () => (
      <div className="bg-muted/20 h-5 w-5 animate-pulse rounded-full" />
    ),
  }
);

export const LazyMoon = createLazyComponent(
  () => import("lucide-react").then((mod) => ({ default: mod.Moon as React.ComponentType<unknown> })),
  {
    fallback: () => (
      <div className="bg-muted/20 h-5 w-5 animate-pulse rounded-full" />
    ),
  }
);

// Preload commonly used icons
export const preloadCommonIcons = () => {
  import("lucide-react").catch(() => {
    // Silently fail if preload fails
  });
};

// Types for better TypeScript support
export type LazyChevronDownProps = ComponentProps<typeof LazyChevronDown>;
export type LazyMenuProps = ComponentProps<typeof LazyMenu>;
export type LazyXProps = ComponentProps<typeof LazyX>;
export type LazySunProps = ComponentProps<typeof LazySun>;
export type LazyMoonProps = ComponentProps<typeof LazyMoon>;
