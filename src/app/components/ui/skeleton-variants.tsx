import { cn } from "@/app/lib/utils";
import { Skeleton } from "./skeleton";

// Base interfaces for skeleton component props
interface BaseSkeletonProps {
  className?: string;
}

interface SkeletonCardProps extends BaseSkeletonProps {
  showImage?: boolean;
  showTitle?: boolean;
  showDescription?: boolean;
  showActions?: boolean;
}

interface SkeletonTextProps extends BaseSkeletonProps {
  lines?: number;
  variant?: "default" | "heading" | "paragraph";
}

interface SkeletonAvatarProps extends BaseSkeletonProps {
  size?: "sm" | "md" | "lg" | "xl";
}

interface SkeletonButtonProps extends BaseSkeletonProps {
  variant?: "default" | "outline" | "ghost" | "link";
  size?: "sm" | "md" | "lg";
}

// Skeleton Card Component
function SkeletonCard({
  className,
  showImage = true,
  showTitle = true,
  showDescription = true,
  showActions = false,
  ...props
}: SkeletonCardProps) {
  return (
    <div
      className={cn("rounded-lg border bg-card p-6 shadow-sm", className)}
      {...props}
    >
      {showImage && <Skeleton className="h-48 w-full rounded-md mb-4" />}
      {showTitle && <Skeleton className="h-6 w-3/4 mb-2" />}
      {showDescription && (
        <div className="space-y-2 mb-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>
      )}
      {showActions && (
        <div className="flex gap-2">
          <Skeleton className="h-9 w-20" />
          <Skeleton className="h-9 w-16" />
        </div>
      )}
    </div>
  );
}

// Skeleton Text Component
function SkeletonText({
  className,
  lines = 3,
  variant = "default",
  ...props
}: SkeletonTextProps) {
  const getHeightClass = () => {
    switch (variant) {
      case "heading":
        return "h-6";
      case "paragraph":
        return "h-4";
      default:
        return "h-4";
    }
  };

  return (
    <div className={cn("space-y-2", className)} {...props}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          className={cn(
            getHeightClass(),
            index === lines - 1 ? "w-3/4" : "w-full"
          )}
        />
      ))}
    </div>
  );
}

// Skeleton Avatar Component
function SkeletonAvatar({
  className,
  size = "md",
  ...props
}: SkeletonAvatarProps) {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "h-8 w-8";
      case "md":
        return "h-10 w-10";
      case "lg":
        return "h-12 w-12";
      case "xl":
        return "h-16 w-16";
      default:
        return "h-10 w-10";
    }
  };

  return (
    <Skeleton
      className={cn("rounded-full", getSizeClass(), className)}
      {...props}
    />
  );
}

// Skeleton Button Component
function SkeletonButton({
  className,
  variant = "default",
  size = "md",
  ...props
}: SkeletonButtonProps) {
  const getSizeClass = () => {
    switch (size) {
      case "sm":
        return "h-8 w-16";
      case "md":
        return "h-9 w-20";
      case "lg":
        return "h-10 w-24";
      default:
        return "h-9 w-20";
    }
  };

  const getVariantClass = () => {
    switch (variant) {
      case "outline":
        return "border border-input";
      case "ghost":
        return "bg-transparent";
      case "link":
        return "bg-transparent underline-offset-4";
      default:
        return "";
    }
  };

  return (
    <Skeleton
      className={cn("rounded-md", getSizeClass(), getVariantClass(), className)}
      {...props}
    />
  );
}

export {
  SkeletonCard,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  type SkeletonCardProps,
  type SkeletonTextProps,
  type SkeletonAvatarProps,
  type SkeletonButtonProps,
};
