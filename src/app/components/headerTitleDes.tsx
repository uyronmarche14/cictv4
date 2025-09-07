import React from "react";
import { cn } from "@/app/lib/utils";
import { Badge } from "@/app/components/ui/badge";

interface HeaderProps {
  title?: string;
  description?: string;
  className?: string;
  titleClassName?: string;
  badge?: string;
  badgeVariant?: "default" | "secondary" | "destructive" | "outline";
  badgeClassName?: string;
}

export function Header({
  title = "Transform Your Vision",
  description = "Discover how our AI-powered platform revolutionizes project planning and team collaboration.",
  className = "",
  titleClassName = "",
  badge = "Our Story",
  badgeVariant = "secondary",
  badgeClassName = "",
}: HeaderProps) {
  return (
    <div
      className={cn(
        "relative z-10 mx-auto max-w-7xl space-y-6 py-12 text-center",
        className
      )}
    >
      <div className="inline-flex items-center justify-center">
        <Badge
          variant={badgeVariant}
          className={cn(
            "text-xs font-semibold tracking-wider uppercase",
            badgeClassName
          )}
        >
          {badge}
        </Badge>
      </div>
      <h2
        className={cn(
          "text-primary text-4xl font-bold text-balance lg:text-6xl",
          titleClassName
        )}
      >
        {title}
      </h2>
      <p className="text-muted-foreground mx-auto max-w-lg text-lg">
        {description}
      </p>
    </div>
  );
}

export default Header;
