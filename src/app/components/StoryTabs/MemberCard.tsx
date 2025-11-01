'use client';

import { useState } from 'react';
import { CldImage } from 'next-cloudinary';
import { OrganizationMember } from './organizationData';
import { cn } from '@/app/lib/utils';

interface MemberCardProps {
  member: OrganizationMember;
  organizationColor: {
    primary: string;
    secondary: string;
    accent: string;
  };
  onClick: () => void;
}

export default function MemberCard({ member, organizationColor, onClick }: MemberCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div
      className={cn(
        "group relative cursor-pointer transform transition-all duration-300 hover:scale-105",
        "bg-card rounded-xl overflow-hidden border border-border/20 shadow-lg hover:shadow-xl"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      aria-label={`View profile of ${member.name}, ${member.position}`}
      style={{
        '--org-primary': organizationColor.primary,
        '--org-secondary': organizationColor.secondary,
        '--org-accent': organizationColor.accent,
      } as React.CSSProperties}
    >
      {/* Image Container with Hover Overlay - Portrait Aspect Ratio */}
      <div className="relative aspect-[3/4] w-full overflow-hidden">
        <CldImage
          src={member.photo}
          alt={member.name}
          fill
          className={cn(
            "object-cover transition-all duration-500 ease-[cubic-bezier(.4,0,.2,1)]",
            imageLoaded ? "opacity-100" : "opacity-0",
            isHovered ? "scale-110" : "scale-100"
          )}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          onLoad={() => setImageLoaded(true)}
          priority={false}
          loading="lazy"
        />
        
        {/* Loading Skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-gradient-to-br from-muted/20 to-muted/40 animate-pulse" />
        )}
        
        {/* Gradient Overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-[var(--org-primary)]/80 via-[var(--org-secondary)]/40 to-transparent",
            "transition-all duration-300 opacity-0 group-hover:opacity-100"
          )}
        />
        
        {/* Hover Content */}
        <div className={cn(
          "absolute inset-0 flex flex-col justify-end p-4 text-white",
          "transition-all duration-300 opacity-0 group-hover:opacity-100"
        )}>
          <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <h3 className="text-lg font-bold mb-1">{member.name}</h3>
            <p className="text-sm opacity-90 mb-2">{member.position}</p>
            <div className="w-12 h-0.5 bg-white/60 rounded-full mb-2" />
            <p className="text-xs opacity-80 line-clamp-2">{member.bio}</p>
          </div>
        </div>
        
        {/* Click Indicator */}
        <div className={cn(
          "absolute top-3 right-3 p-2 rounded-full bg-white/20 backdrop-blur-sm",
          "transition-all duration-200 opacity-0 group-hover:opacity-100 scale-90 group-hover:scale-100"
        )}>
          <div className="w-4 h-4 border-2 border-white rounded-full animate-pulse" />
        </div>
      </div>
      
      {/* Static Info (shown when not hovered) */}
      <div className={cn(
        "absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent",
        "transition-opacity duration-300 group-hover:opacity-0"
      )}>
        <h3 className="text-white font-semibold text-sm">{member.name}</h3>
        <p className="text-white/80 text-xs">{member.position}</p>
      </div>
      
      {/* Accessibility Focus Ring */}
      <div className={cn(
        "absolute inset-0 rounded-xl border-2 border-[var(--org-primary)] opacity-0",
        "focus-within:opacity-100 transition-opacity duration-200"
      )} />
    </div>
  );
}