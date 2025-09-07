"use client";

import { useEffect, useRef, useCallback } from "react";

interface UseFocusManagementOptions {
  /**
   * Auto-focus the element when component mounts
   */
  autoFocus?: boolean;

  /**
   * Restore focus to the previously focused element when component unmounts
   */
  restoreFocus?: boolean;

  /**
   * Delay before focusing (useful for animations)
   */
  focusDelay?: number;
}

/**
 * Hook for managing focus state and restoration
 */
export function useFocusManagement<T extends HTMLElement>(
  options: UseFocusManagementOptions = {}
) {
  const { autoFocus = false, restoreFocus = false, focusDelay = 0 } = options;

  const elementRef = useRef<T>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  // Store the previously focused element when component mounts
  useEffect(() => {
    if (restoreFocus) {
      previouslyFocusedElementRef.current =
        document.activeElement as HTMLElement;
    }
  }, [restoreFocus]);

  // Auto-focus when component mounts
  useEffect(() => {
    if (autoFocus && elementRef.current) {
      const focusElement = () => {
        if (elementRef.current) {
          elementRef.current.focus();
        }
      };

      if (focusDelay > 0) {
        const timeoutId = setTimeout(focusElement, focusDelay);
        return () => clearTimeout(timeoutId);
      } else {
        focusElement();
      }
    }
  }, [autoFocus, focusDelay]);

  // Restore focus when component unmounts
  useEffect(() => {
    return () => {
      if (restoreFocus && previouslyFocusedElementRef.current) {
        // Small delay to ensure the element is still in the DOM
        setTimeout(() => {
          if (
            previouslyFocusedElementRef.current &&
            document.contains(previouslyFocusedElementRef.current)
          ) {
            previouslyFocusedElementRef.current.focus();
          }
        }, 0);
      }
    };
  }, [restoreFocus]);

  const focus = useCallback((delay: number = 0) => {
    if (elementRef.current) {
      if (delay > 0) {
        setTimeout(() => {
          if (elementRef.current) {
            elementRef.current.focus();
          }
        }, delay);
      } else {
        elementRef.current.focus();
      }
    }
  }, []);

  const blur = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.blur();
    }
  }, []);

  return {
    elementRef,
    focus,
    blur,
    previouslyFocusedElement: previouslyFocusedElementRef.current,
  };
}

/**
 * Hook for managing focus within a modal or dialog
 */
export function useModalFocus<T extends HTMLElement>(isOpen: boolean) {
  const modalRef = useRef<T>(null);
  const previouslyFocusedElementRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (isOpen) {
      // Store the previously focused element
      previouslyFocusedElementRef.current =
        document.activeElement as HTMLElement;

      // Focus the modal after a short delay
      setTimeout(() => {
        if (modalRef.current) {
          // Try to focus the first focusable element in the modal
          const firstFocusable = modalRef.current.querySelector(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          ) as HTMLElement;

          if (firstFocusable) {
            firstFocusable.focus();
          } else {
            // If no focusable element found, focus the modal itself
            modalRef.current.focus();
          }
        }
      }, 100);
    } else {
      // Restore focus when modal closes
      if (
        previouslyFocusedElementRef.current &&
        document.contains(previouslyFocusedElementRef.current)
      ) {
        previouslyFocusedElementRef.current.focus();
      }
    }
  }, [isOpen]);

  // Trap focus within the modal
  useEffect(() => {
    if (!isOpen || !modalRef.current) return;

    const modal = modalRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;

      const focusableElements = Array.from(
        modal.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];

      if (focusableElements.length === 0) return;

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];

      if (event.shiftKey) {
        // Shift + Tab
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        // Tab
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    };

    modal.addEventListener("keydown", handleKeyDown);

    return () => {
      modal.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  return modalRef;
}

/**
 * Hook for managing focus announcements for screen readers
 */
export function useFocusAnnouncement() {
  const announce = useCallback(
    (message: string, priority: "polite" | "assertive" = "polite") => {
      const announcer = document.createElement("div");
      announcer.setAttribute("aria-live", priority);
      announcer.setAttribute("aria-atomic", "true");
      announcer.className = "sr-only";

      document.body.appendChild(announcer);

      // Small delay to ensure screen readers pick up the change
      setTimeout(() => {
        announcer.textContent = message;
      }, 100);

      // Clean up after announcement
      setTimeout(() => {
        if (document.body.contains(announcer)) {
          document.body.removeChild(announcer);
        }
      }, 1000);
    },
    []
  );

  return { announce };
}
