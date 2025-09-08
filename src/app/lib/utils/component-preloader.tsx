"use client";

import { useEffect, type ComponentType } from "react";
import { preloadComponents } from "./lazy-loading";

/**
 * Component that preloads heavy components based on user interaction patterns
 */
export function ComponentPreloader() {
  useEffect(() => {
    // Preload components after initial page load
    const preloadTimer = setTimeout(() => {
      preloadComponents([
        // Preload Framer Motion for animations
        () =>
          import("framer-motion").then((mod) => ({ default: mod.motion.div as ComponentType<unknown> })),

        // Preload Cloudinary for images
        () =>
          import("next-cloudinary").then((mod) => ({ default: mod.CldImage as ComponentType<unknown> })),

        // Preload common icons
        () =>
          import("lucide-react").then((mod) => ({ default: mod.ChevronDown as ComponentType<unknown> })),

        // Preload StoryTabs components
        () => import("@/app/components/StoryTabs/tabs1").then(mod => ({ default: mod.default as ComponentType<unknown> })),
        () => import("@/app/components/StoryTabs/tabs2").then(mod => ({ default: mod.default as ComponentType<unknown> })),
        () => import("@/app/components/StoryTabs/tabs3").then(mod => ({ default: mod.default as ComponentType<unknown> })),
      ]);
    }, 2000); // Preload after 2 seconds

    return () => clearTimeout(preloadTimer);
  }, []);

  useEffect(() => {
    // Preload on user interaction
    const handleUserInteraction = () => {
      preloadComponents([
        () => import("@/app/components/sections/landingpage/storySection").then(mod => ({ default: mod.default as ComponentType<unknown> })),
        () => import("@/app/components/sections/landingpage/newsSection").then(mod => ({ default: mod.default as ComponentType<unknown> })),
        () => import("@/app/components/sections/landingpage/faqsSection").then(mod => ({ default: mod.default as ComponentType<unknown> })),
      ]);

      // Remove listeners after first interaction
      document.removeEventListener("mousedown", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };

    document.addEventListener("mousedown", handleUserInteraction, {
      passive: true,
    });
    document.addEventListener("touchstart", handleUserInteraction, {
      passive: true,
    });
    document.addEventListener("keydown", handleUserInteraction, {
      passive: true,
    });

    return () => {
      document.removeEventListener("mousedown", handleUserInteraction);
      document.removeEventListener("touchstart", handleUserInteraction);
      document.removeEventListener("keydown", handleUserInteraction);
    };
  }, []);

  return null; // This component doesn't render anything
}

/**
 * Hook for conditional component preloading
 */
export function useConditionalPreload(
  condition: boolean,
  importFns: Array<() => Promise<{ default: ComponentType<unknown> }>>,
  delay: number = 0
) {
  useEffect(() => {
    if (!condition) return;

    const timer = setTimeout(() => {
      preloadComponents(importFns);
    }, delay);

    return () => clearTimeout(timer);
  }, [condition, importFns, delay]);
}

/**
 * Hook for viewport-based preloading
 */
export function useViewportPreload(
  importFns: Array<() => Promise<{ default: ComponentType<unknown> }>>,
  threshold: number = 0.1
) {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            preloadComponents(importFns);
            observer.disconnect();
          }
        });
      },
      { threshold }
    );

    // Observe the viewport
    const sentinel = document.createElement("div");
    sentinel.style.position = "absolute";
    sentinel.style.top = "50vh";
    sentinel.style.height = "1px";
    sentinel.style.width = "1px";
    sentinel.style.pointerEvents = "none";
    document.body.appendChild(sentinel);
    observer.observe(sentinel);

    return () => {
      observer.disconnect();
      if (document.body.contains(sentinel)) {
        document.body.removeChild(sentinel);
      }
    };
  }, [importFns, threshold]);
}
