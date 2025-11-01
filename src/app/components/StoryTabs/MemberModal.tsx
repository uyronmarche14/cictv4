'use client';

import { useState, useEffect } from 'react';
import { X, Mail, Linkedin, Github } from 'lucide-react';
import { CldImage } from 'next-cloudinary';
import { OrganizationMember } from './organizationData';
import { cn } from '@/app/lib/utils';

interface MemberModalProps {
  member: OrganizationMember | null;
  isOpen: boolean;
  onClose: () => void;
  organizationColor: {
    primary: string;
    secondary: string;
    accent: string;
  };
}

export default function MemberModal({ member, isOpen, onClose, organizationColor }: MemberModalProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = 'hidden';
    } else {
      setIsVisible(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!member) return null;

  return (
    <div
      className={cn(
        'fixed inset-0 z-50 flex items-center justify-center p-4 transition-all duration-300',
        isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
      )}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="member-modal-title"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300" />
      
      {/* Modal Content */}
      <div
        className={cn(
          'relative w-full max-w-2xl rounded-2xl bg-card border border-border/20 shadow-2xl transition-all duration-300 transform',
          isVisible ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        )}
        style={{
          '--org-primary': organizationColor.primary,
          '--org-secondary': organizationColor.secondary,
          '--org-accent': organizationColor.accent,
        } as React.CSSProperties}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-background/80 hover:bg-background border border-border/30 transition-all duration-200 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[var(--org-primary)]/50"
          aria-label="Close modal"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Header with gradient background */}
        <div className="relative h-32 rounded-t-2xl overflow-hidden">
          <div 
            className="absolute inset-0 bg-gradient-to-br from-[var(--org-primary)] to-[var(--org-secondary)] opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>

        {/* Profile Section */}
        <div className="relative px-8 pb-8">
          {/* Profile Picture */}
          <div className="relative -mt-16 mb-6 flex justify-center">
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-background shadow-xl group">
              <CldImage
                src={member.photo}
                alt={member.name}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="128px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
          </div>

          {/* Name and Position */}
          <div className="text-center mb-6">
            <h2 
              id="member-modal-title"
              className="text-2xl font-bold text-foreground mb-2"
              style={{ color: organizationColor.primary }}
            >
              {member.name}
            </h2>
            <p className="text-lg text-muted-foreground font-medium">{member.position}</p>
          </div>

          {/* Bio */}
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">About</h3>
            <p className="text-foreground leading-relaxed">{member.bio}</p>
          </div>

          {/* Social Links */}
          {member.social && (
            <div className="mb-8">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">Connect</h3>
              <div className="flex flex-wrap gap-3">
                {member.social.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--org-primary)]/10 text-[var(--org-primary)] hover:bg-[var(--org-primary)]/20 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--org-primary)]/50"
                  >
                    <Linkedin className="h-4 w-4" />
                    <span className="text-sm font-medium">LinkedIn</span>
                  </a>
                )}
                {member.social.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--org-secondary)]/10 text-[var(--org-secondary)] hover:bg-[var(--org-secondary)]/20 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--org-secondary)]/50"
                  >
                    <Github className="h-4 w-4" />
                    <span className="text-sm font-medium">GitHub</span>
                  </a>
                )}
                {member.social.email && (
                  <a
                    href={`mailto:${member.social.email}`}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--org-accent)]/10 text-[var(--org-accent)] hover:bg-[var(--org-accent)]/20 transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--org-accent)]/50"
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-sm font-medium">Email</span>
                  </a>
                )}
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="flex justify-center">
            <button
              onClick={onClose}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-[var(--org-primary)] to-[var(--org-secondary)] text-white font-semibold hover:shadow-lg transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[var(--org-primary)]/50"
            >
              Close Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}