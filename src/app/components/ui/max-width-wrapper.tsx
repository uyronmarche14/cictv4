import { cn } from "@/app/lib/utils";
import { ReactNode } from "react";

interface MaxWidthWrapperProps {
  children: ReactNode;
  className?: string;
  maxWidth?:
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "6xl"
    | "7xl";
}

const maxWidthClasses = {
  sm: "max-w-sm",
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
  "2xl": "max-w-2xl",
  "3xl": "max-w-3xl",
  "4xl": "max-w-4xl",
  "5xl": "max-w-5xl",
  "6xl": "max-w-6xl",
  "7xl": "max-w-7xl",
} as const;

export function MaxWidthWrapper({
  children,
  className,
  maxWidth = "7xl",
}: MaxWidthWrapperProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-4 sm:px-6 lg:px-8",
        maxWidthClasses[maxWidth],
        className
      )}
    >
      {children}
    </div>
  );
}

export type { MaxWidthWrapperProps };
