"use client";

import { useEffect } from "react";
import { preloadComponent } from "@/app/lib/utils/lazy-loading";

/**
 * Component for preloading critical resources and components
 */
export function ResourcePreloader() {
  useEffect(() => {
    // Preload critical components that are likely to be needed soon
    const preloadCriticalComponents = () => {
      // Preload components that are just below the fold
      preloadComponent(
        () => import("@/app/components/sections/landingpage/CICT-Section"),
      );
      preloadComponent(
        () => import("@/app/components/sections/landingpage/storySection"),
      );

      // Preload theme toggle component (likely to be used)
      preloadComponent(() => import("@/app/components/theme-toggle"));
    };

    // Preload after initial render to avoid blocking
    const timeoutId = setTimeout(preloadCriticalComponents, 100);

    return () => clearTimeout(timeoutId);
  }, []);

  useEffect(() => {
    // Preload resources on user interaction hints
    const handleMouseEnter = () => {
      // User is likely to interact, preload more components
      preloadComponent(
        () => import("@/app/components/sections/landingpage/offerSection"),
      );
      preloadComponent(
        () => import("@/app/components/sections/landingpage/newsSection"),
      );
    };

    const handleScroll = () => {
      // User is scrolling, preload remaining components
      preloadComponent(
        () => import("@/app/components/sections/landingpage/faqsSection"),
      );
      preloadComponent(
        () => import("@/app/components/sections/landingpage/Testimonial"),
      );
      preloadComponent(
        () => import("@/app/components/sections/landingpage/CTASection"),
      );
      preloadComponent(() => import("@/app/components/layout/footer"));
    };

    // Add event listeners for interaction hints
    document.addEventListener("mouseenter", handleMouseEnter, { once: true });
    document.addEventListener("scroll", handleScroll, {
      once: true,
      passive: true,
    });

    return () => {
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // This component doesn't render anything
  return null;
}

/**
 * Preload critical fonts and assets
 */
export function FontPreloader() {
  return (
    <>
      {/* Preload critical fonts */}
      <link
        rel="preload"
        href="/fonts/inter-var.woff2"
        as="font"
        type="font/woff2"
        crossOrigin="anonymous"
      />

      {/* Preload critical images */}
      <link
        rel="preload"
        href="/images/hero-bg.webp"
        as="image"
        type="image/webp"
      />

      {/* DNS prefetch for external resources */}
      <link rel="dns-prefetch" href="//res.cloudinary.com" />
      <link
        rel="preconnect"
        href="https://res.cloudinary.com"
        crossOrigin="anonymous"
      />
    </>
  );
}
