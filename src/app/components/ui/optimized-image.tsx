"use client";

import React from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { cn } from "@/app/lib/utils";

interface BaseImageProps {
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  loading?: "lazy" | "eager";
  quality?: number;
  placeholder?: "blur" | "empty";
  blurDataURL?: string;
}

interface NextImageProps extends BaseImageProps {
  src: string;
  width: number;
  height: number;
  fill?: never;
  cloudinary?: never;
}

interface NextImageFillProps extends BaseImageProps {
  src: string;
  width?: never;
  height?: never;
  fill: true;
  cloudinary?: never;
}

interface CloudinaryImageProps extends BaseImageProps {
  src: string;
  width: number;
  height: number;
  fill?: never;
  cloudinary: true;
  crop?: string;
  gravity?: string;
  format?: string;
}

interface CloudinaryImageFillProps extends BaseImageProps {
  src: string;
  width?: never;
  height?: never;
  fill: true;
  cloudinary: true;
  crop?: string;
  gravity?: string;
  format?: string;
}

type OptimizedImageProps =
  | NextImageProps
  | NextImageFillProps
  | CloudinaryImageProps
  | CloudinaryImageFillProps;

/**
 * OptimizedImage component that provides a unified interface for both Next.js Image
 * and Cloudinary CldImage components with performance optimizations.
 *
 * Features:
 * - Automatic lazy loading for below-the-fold images
 * - Priority loading for above-the-fold images
 * - Responsive image sizing
 * - Cloudinary integration for advanced image transformations
 * - Consistent API across different image sources
 */
export function OptimizedImage({
  src,
  alt,
  className,
  priority = false,
  sizes,
  loading,
  quality = 85,
  placeholder = "empty",
  blurDataURL,
  ...props
}: OptimizedImageProps) {
  // Determine loading strategy
  const imageLoading = loading || (priority ? "eager" : "lazy");

  // Default sizes for responsive images
  const defaultSizes =
    sizes || "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw";

  // Common props for both image types
  const commonProps = {
    alt,
    className: cn("transition-opacity duration-300", className),
    priority,
    loading: imageLoading,
    quality,
    placeholder,
    blurDataURL,
  };

  // Render Cloudinary image
  if (props.cloudinary) {
    const cloudinaryProps = {
      ...commonProps,
      src,
      sizes: defaultSizes,
      crop: props.crop || "fill",
      gravity: props.gravity || "auto",
      format: props.format || "auto",
    };

    if (props.fill) {
      return (
        <CldImage {...cloudinaryProps} fill style={{ objectFit: "cover" }} />
      );
    }

    return (
      <CldImage
        {...cloudinaryProps}
        width={props.width}
        height={props.height}
      />
    );
  }

  // Render Next.js Image
  const nextImageProps = {
    ...commonProps,
    src,
    sizes: defaultSizes,
  };

  if (props.fill) {
    return <Image {...nextImageProps} fill style={{ objectFit: "cover" }} />;
  }

  return (
    <Image {...nextImageProps} width={props.width} height={props.height} />
  );
}

// Convenience components for common use cases
export function OptimizedHeroImage(
  props: Omit<OptimizedImageProps, "priority">,
) {
  return <OptimizedImage {...props} priority={true} />;
}

export function OptimizedLazyImage(
  props: Omit<OptimizedImageProps, "loading">,
) {
  return <OptimizedImage {...props} loading="lazy" />;
}
