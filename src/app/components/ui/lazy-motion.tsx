"use client";

import { createLazyComponent } from "@/app/lib/utils/lazy-loading";
import { ComponentProps } from "react";

// Lazy load framer-motion components to reduce initial bundle size
export const LazyMotionDiv = createLazyComponent(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.div })),
  {
    fallback: () => <div className="opacity-0" />,
  }
);

export const LazyMotionSection = createLazyComponent(
  () =>
    import("framer-motion").then((mod) => ({ default: mod.motion.section })),
  {
    fallback: () => <section className="opacity-0" />,
  }
);

export const LazyMotionH1 = createLazyComponent(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.h1 })),
  {
    fallback: () => <h1 className="opacity-0" />,
  }
);

export const LazyMotionP = createLazyComponent(
  () => import("framer-motion").then((mod) => ({ default: mod.motion.p })),
  {
    fallback: () => <p className="opacity-0" />,
  }
);

// Preload framer-motion for better UX
export const preloadFramerMotion = () => {
  import("framer-motion").catch(() => {
    // Silently fail if preload fails
  });
};

// Types for better TypeScript support
export type LazyMotionDivProps = ComponentProps<typeof LazyMotionDiv>;
export type LazyMotionSectionProps = ComponentProps<typeof LazyMotionSection>;
export type LazyMotionH1Props = ComponentProps<typeof LazyMotionH1>;
export type LazyMotionPProps = ComponentProps<typeof LazyMotionP>;
