"use client";

import React, { useEffect, useRef } from "react";

interface ScreenReaderAnnouncerProps {
  message: string;
  priority?: "polite" | "assertive";
  clearAfter?: number;
}

/**
 * Screen Reader Announcer Component
 * Announces messages to screen readers using ARIA live regions
 */
export function ScreenReaderAnnouncer({
  message,
  priority = "polite",
  clearAfter = 1000,
}: ScreenReaderAnnouncerProps) {
  const announcerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (message && announcerRef.current) {
      // Clear any existing message first
      announcerRef.current.textContent = "";

      // Small delay to ensure screen readers pick up the change
      const announceTimeout = setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = message;
        }
      }, 100);

      // Clear the message after specified time
      const clearMessageTimeout = setTimeout(() => {
        if (announcerRef.current) {
          announcerRef.current.textContent = "";
        }
      }, clearAfter);

      return () => {
        clearTimeout(announceTimeout);
        clearTimeout(clearMessageTimeout);
      };
    }
  }, [message, clearAfter]);

  return (
    <div
      ref={announcerRef}
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      role="status"
    />
  );
}

/**
 * Hook for managing screen reader announcements
 */
export function useScreenReaderAnnouncer() {
  const [announcement, setAnnouncement] = React.useState<{
    message: string;
    priority: "polite" | "assertive";
  } | null>(null);

  const announce = React.useCallback(
    (message: string, priority: "polite" | "assertive" = "polite") => {
      setAnnouncement({ message, priority });

      // Clear announcement after a short delay to allow for new announcements
      setTimeout(() => {
        setAnnouncement(null);
      }, 1500);
    },
    []
  );

  const AnnouncerComponent = React.useMemo(() => {
    if (!announcement) return null;

    return (
      <ScreenReaderAnnouncer
        message={announcement.message}
        priority={announcement.priority}
      />
    );
  }, [announcement]);

  return { announce, AnnouncerComponent };
}
