"use client";

import React, { Suspense, lazy, type ComponentType } from "react";
import { Skeleton } from "@/app/components/ui/skeleton";
import { useLazyLoadingPerformance } from "./performance-monitor";

/**
 * Utility for creating lazy-loaded components with loading states
 */

interface LazyComponentOptions {
  fallback?: React.ComponentType;
  errorBoundary?: boolean;
}

/**
 * Creates a lazy-loaded component with a loading fallback
 */
export function createLazyComponent<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyComponentOptions = {}
): T {
  const LazyComponent = lazy(importFn);
  const {
    fallback: FallbackComponent = DefaultFallback,
    errorBoundary = true,
  } = options;

  const WrappedComponent = (props: React.ComponentProps<T>) => {
    // Monitor lazy loading performance in development
    useLazyLoadingPerformance("LazyComponent");

    const content = (
      <Suspense fallback={<FallbackComponent />}>
        <LazyComponent {...props} />
      </Suspense>
    );

    if (errorBoundary) {
      return <ErrorBoundary>{content}</ErrorBoundary>;
    }

    return content;
  };

  // Preserve display name for debugging
  WrappedComponent.displayName = `LazyComponent(Component)`;

  return WrappedComponent as T;
}

/**
 * Default fallback component for lazy loading
 */
function DefaultFallback() {
  return (
    <div className="flex h-32 w-full items-center justify-center">
      <Skeleton className="h-full w-full" />
    </div>
  );
}

/**
 * Error boundary for lazy-loaded components
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): { hasError: boolean } {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Lazy component failed to load:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="text-muted-foreground flex h-32 w-full items-center justify-center">
          <p>Failed to load component. Please refresh the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Preload a lazy component for better performance
 */
export function preloadComponent<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>
): void {
  // Preload the component in the background
  importFn().catch((error) => {
    console.warn("Failed to preload component:", error);
  });
}

/**
 * Preload multiple components in parallel
 */
export function preloadComponents(
  importFns: Array<() => Promise<{ default: ComponentType<unknown> }>>
): void {
  Promise.allSettled(importFns.map((fn) => fn())).then((results) => {
    results.forEach((result, index) => {
      if (result.status === "rejected") {
        console.warn(`Failed to preload component ${index}:`, result.reason);
      }
    });
  });
}

/**
 * Create a lazy component with route-based preloading
 */
export function createRouteLazyComponent<T extends ComponentType<unknown>>(
  importFn: () => Promise<{ default: T }>,
  options: LazyComponentOptions & { preloadOnRoute?: string } = {}
): React.ComponentType<React.ComponentProps<T>> {
  const LazyComponent = createLazyComponent(importFn, options);

  // Preload when specific route is hovered or focused
  if (options.preloadOnRoute && typeof window !== "undefined") {
    const preloadOnInteraction = () => {
      preloadComponent(importFn);
    };

    // Add event listeners for route preloading
    document.addEventListener("mouseover", (e) => {
      const target = e.target as HTMLElement;
      const link = target.closest(`a[href="${options.preloadOnRoute}"]`);
      if (link) {
        preloadOnInteraction();
      }
    });

    document.addEventListener("focusin", (e) => {
      const target = e.target as HTMLElement;
      if (target.matches(`a[href="${options.preloadOnRoute}"]`)) {
        preloadOnInteraction();
      }
    });
  }

  return LazyComponent as React.ComponentType<React.ComponentProps<T>>;
}

/**
 * Hook for intersection-based lazy loading
 */
export function useIntersectionLazyLoad(
  ref: React.RefObject<HTMLElement | null>,
  options: IntersectionObserverInit = {}
) {
  const [isVisible, setIsVisible] = React.useState(false);

  React.useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
        ...options,
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [ref, options]);

  return isVisible;
}

/**
 * Component for intersection-based lazy loading
 */
interface IntersectionLazyProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  className?: string;
  threshold?: number;
  rootMargin?: string;
}

export function IntersectionLazy({
  children,
  fallback = <DefaultFallback />,
  className,
  threshold = 0.1,
  rootMargin = "50px",
}: IntersectionLazyProps) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isVisible = useIntersectionLazyLoad(ref, { threshold, rootMargin });

  return (
    <div ref={ref} className={className}>
      {isVisible ? children : fallback}
    </div>
  );
}
