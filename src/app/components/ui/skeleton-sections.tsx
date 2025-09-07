import { cn } from "@/app/lib/utils";
import { Skeleton } from "./skeleton";
import {
  SkeletonCard,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
} from "./skeleton-variants";

// Base interfaces for section skeleton props
interface BaseSectionSkeletonProps {
  className?: string;
}

interface SkeletonHeroProps extends BaseSectionSkeletonProps {
  showScrollIndicator?: boolean;
}

interface SkeletonFeaturesProps extends BaseSectionSkeletonProps {
  itemCount?: number;
  showDescription?: boolean;
}

interface SkeletonNavigationProps extends BaseSectionSkeletonProps {
  showLogo?: boolean;
  showThemeToggle?: boolean;
  isMobile?: boolean;
}

// Skeleton Hero Section Component
function SkeletonHero({
  className,
  showScrollIndicator = true,
  ...props
}: SkeletonHeroProps) {
  return (
    <section
      className={cn(
        "relative min-h-screen flex items-center justify-center",
        className
      )}
      {...props}
    >
      <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="flex flex-col items-center justify-center text-center space-y-4 md:space-y-6">
          {/* Main heading skeleton */}
          <Skeleton className="h-8 md:h-12 w-48 md:w-64" />

          {/* Large title skeleton */}
          <Skeleton className="h-16 md:h-24 lg:h-32 w-full max-w-4xl" />

          {/* Secondary text skeleton */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 w-full">
            <Skeleton className="h-8 md:h-12 w-16 md:w-20" />
            <Skeleton className="h-12 md:h-16 lg:h-20 w-48 md:w-64 lg:w-80" />
          </div>

          {/* CTA section skeleton */}
          {showScrollIndicator && (
            <div className="mt-8 md:mt-12 lg:mt-16 flex flex-col items-center justify-center gap-3 md:gap-4">
              <Skeleton className="h-6 md:h-8 w-24 md:w-32" />
              <Skeleton className="h-6 w-6 md:h-8 md:w-8 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// Skeleton Features Grid Component
function SkeletonFeatures({
  className,
  itemCount = 8,
  showDescription = true,
  ...props
}: SkeletonFeaturesProps) {
  return (
    <section className={cn("w-full py-16 lg:py-24", className)} {...props}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <Skeleton className="h-8 md:h-12 w-3/4 max-w-2xl mx-auto mb-4" />
          <Skeleton className="h-6 w-1/2 max-w-lg mx-auto mb-4" />
          {showDescription && (
            <div className="space-y-2 max-w-3xl mx-auto">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6 mx-auto" />
              <Skeleton className="h-4 w-4/5 mx-auto" />
            </div>
          )}
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto mb-12">
          {Array.from({ length: itemCount }).map((_, index) => (
            <div
              key={index}
              className="border rounded-lg p-4 flex items-center gap-3"
            >
              <Skeleton className="h-5 w-5 flex-shrink-0" />
              <Skeleton className="h-4 flex-1" />
            </div>
          ))}
        </div>

        {/* CTA section */}
        <div className="text-center">
          <Skeleton className="h-4 w-64 mx-auto mb-8" />
          <SkeletonButton size="lg" className="w-48 h-12 rounded-full" />
        </div>
      </div>
    </section>
  );
}

// Skeleton Navigation Component
function SkeletonNavigation({
  className,
  showLogo = true,
  showThemeToggle = true,
  isMobile = false,
  ...props
}: SkeletonNavigationProps) {
  if (isMobile) {
    return (
      <div className={cn("md:hidden overflow-hidden", className)} {...props}>
        <div className="px-3 pb-2 pt-1 border-t border-border/50">
          <div className="flex flex-col gap-0.5">
            {/* Mobile navigation links */}
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} className="h-8 w-full rounded-md" />
            ))}
            {/* Theme toggle row */}
            {showThemeToggle && (
              <div className="flex items-center justify-between px-2.5 py-1.5">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-6 w-6 rounded-full" />
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <header
      className={cn("fixed top-0 left-0 right-0 z-50 py-3", className)}
      {...props}
    >
      <div className="justify-center relative flex items-center px-3 py-2">
        <div className="relative rounded-lg border border-border/50 bg-background/60 backdrop-blur-sm">
          <div className="relative flex items-center px-4 py-2">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-4">
              {showLogo && (
                <div className="flex items-center gap-2">
                  <SkeletonAvatar size="sm" />
                </div>
              )}

              <div className="flex items-center gap-0.5">
                {/* Navigation links */}
                {Array.from({ length: 5 }).map((_, index) => (
                  <Skeleton key={index} className="h-6 w-16 rounded-md" />
                ))}
                {/* Theme toggle */}
                {showThemeToggle && (
                  <div className="ml-0.5 p-0.5">
                    <Skeleton className="h-6 w-6 rounded-md" />
                  </div>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Skeleton className="h-6 w-6 rounded-md" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

// Skeleton Footer Component
function SkeletonFooter({ className, ...props }: BaseSectionSkeletonProps) {
  return (
    <footer
      className={cn("w-full py-12 lg:py-16 border-t border-border", className)}
      {...props}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <SkeletonAvatar size="sm" />
              <Skeleton className="h-6 w-24" />
            </div>
            <div className="space-y-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          </div>

          {/* Footer columns */}
          {Array.from({ length: 3 }).map((_, columnIndex) => (
            <div key={columnIndex} className="space-y-4">
              <Skeleton className="h-6 w-24" />
              <div className="space-y-2">
                {Array.from({ length: 4 }).map((_, linkIndex) => (
                  <Skeleton key={linkIndex} className="h-4 w-20" />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Footer bottom */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <Skeleton className="h-4 w-48" />
          <div className="flex gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Skeleton key={index} className="h-6 w-6 rounded-full" />
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

// Skeleton CTA Section Component
function SkeletonCTA({ className, ...props }: BaseSectionSkeletonProps) {
  return (
    <section className={cn("w-full py-16 lg:py-24", className)} {...props}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="space-y-6">
          <Skeleton className="h-10 md:h-12 w-3/4 max-w-2xl mx-auto" />
          <div className="space-y-2 max-w-2xl mx-auto">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6 mx-auto" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <SkeletonButton size="lg" className="w-40 h-12 rounded-full" />
            <SkeletonButton
              variant="outline"
              size="lg"
              className="w-32 h-12 rounded-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export {
  SkeletonHero,
  SkeletonFeatures,
  SkeletonNavigation,
  SkeletonFooter,
  SkeletonCTA,
  type SkeletonHeroProps,
  type SkeletonFeaturesProps,
  type SkeletonNavigationProps,
};
