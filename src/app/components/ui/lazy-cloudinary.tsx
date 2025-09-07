"use client";

import { createLazyComponent } from "@/app/lib/utils/lazy-loading";
import { ComponentProps } from "react";

// Lazy load Cloudinary components to reduce initial bundle size
export const LazyCldImage = createLazyComponent(
  () => import("next-cloudinary").then((mod) => ({ default: mod.CldImage })),
  {
    fallback: () => (
      <div className="bg-muted/20 flex h-full w-full animate-pulse items-center justify-center rounded-lg">
        <div className="bg-muted/40 h-8 w-8 animate-pulse rounded" />
      </div>
    ),
  }
);

export const LazyCldVideoPlayer = createLazyComponent(
  () =>
    import("next-cloudinary").then((mod) => ({ default: mod.CldVideoPlayer })),
  {
    fallback: () => (
      <div className="bg-muted/20 flex h-full w-full animate-pulse items-center justify-center rounded-lg">
        <div className="bg-muted/40 h-12 w-12 animate-pulse rounded-full" />
      </div>
    ),
  }
);

// Preload Cloudinary for better UX when needed
export const preloadCloudinary = () => {
  import("next-cloudinary").catch(() => {
    // Silently fail if preload fails
  });
};

// Types for better TypeScript support
export type LazyCldImageProps = ComponentProps<typeof LazyCldImage>;
export type LazyCldVideoPlayerProps = ComponentProps<typeof LazyCldVideoPlayer>;
