"use client";

import React from "react";
import { cn } from "@/app/lib/utils";

interface FocusIndicatorProps {
  children: React.ReactNode;
  className?: string;
  /**
   * Focus ring style variant
   */
  variant?: "default" | "primary" | "secondary" | "destructive";
  /**
   * Focus ring size
   */
  size?: "sm" | "md" | "lg";
  /**
   * Whether to show focus ring on focus-visible only
   */
  focusVisible?: boolean;
}

const focusVariants = {
  default: "focus:ring-ring",
  primary: "focus:ring-primary",
  secondary: "focus:ring-secondary",
  destructive: "focus:ring-destructive",
};

const focusVisibleVariants = {
  default: "focus-visible:ring-ring",
  primary: "focus-visible:ring-primary",
  secondary: "focus-visible:ring-secondary",
  destructive: "focus-visible:ring-destructive",
};

const focusSizes = {
  sm: "focus:ring-1 focus:ring-offset-1",
  md: "focus:ring-2 focus:ring-offset-2",
  lg: "focus:ring-4 focus:ring-offset-4",
};

const focusVisibleSizes = {
  sm: "focus-visible:ring-1 focus-visible:ring-offset-1",
  md: "focus-visible:ring-2 focus-visible:ring-offset-2",
  lg: "focus-visible:ring-4 focus-visible:ring-offset-4",
};

/**
 * Focus Indicator Component
 * Provides consistent focus styling across the application
 */
export function FocusIndicator({
  children,
  className,
  variant = "default",
  size = "md",
  focusVisible = true,
  ...props
}: FocusIndicatorProps & React.HTMLAttributes<HTMLDivElement>) {
  const focusClasses = focusVisible
    ? `${focusVisibleVariants[variant]} ${focusVisibleSizes[size]}`
    : `${focusVariants[variant]} ${focusSizes[size]}`;

  return (
    <div
      className={cn("focus:outline-none", focusClasses, className)}
      {...props}
    >
      {children}
    </div>
  );
}

/**
 * Hook for consistent focus styles
 */
export function useFocusStyles(
  variant: "default" | "primary" | "secondary" | "destructive" = "default",
  size: "sm" | "md" | "lg" = "md",
  focusVisible: boolean = true
) {
  const focusClasses = focusVisible
    ? `${focusVisibleVariants[variant]} ${focusVisibleSizes[size]}`
    : `${focusVariants[variant]} ${focusSizes[size]}`;

  return cn("focus:outline-none", focusClasses);
}
