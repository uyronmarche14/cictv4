/**
 * Accessibility utilities and helpers
 * Provides functions and constants for improving accessibility across the application
 */

/**
 * Screen reader only text utility
 * Use this for content that should only be available to screen readers
 */
export const srOnly = "sr-only";

/**
 * Generates unique IDs for form elements and ARIA relationships
 */
export function generateId(prefix: string = "element"): string {
  return `${prefix}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * ARIA live region announcer for dynamic content changes
 */
export function announceToScreenReader(
  message: string,
  priority: "polite" | "assertive" = "polite"
) {
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
    document.body.removeChild(announcer);
  }, 1000);
}

/**
 * Focus management utilities
 */
export const focusUtils = {
  /**
   * Trap focus within a container element
   */
  trapFocus: (container: HTMLElement) => {
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[
      focusableElements.length - 1
    ] as HTMLElement;

    const handleTabKey = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;

      if (e.shiftKey) {
        if (document.activeElement === firstElement) {
          lastElement.focus();
          e.preventDefault();
        }
      } else {
        if (document.activeElement === lastElement) {
          firstElement.focus();
          e.preventDefault();
        }
      }
    };

    container.addEventListener("keydown", handleTabKey);

    // Return cleanup function
    return () => {
      container.removeEventListener("keydown", handleTabKey);
    };
  },

  /**
   * Set focus to element with optional delay
   */
  setFocus: (element: HTMLElement | null, delay: number = 0) => {
    if (!element) return;

    if (delay > 0) {
      setTimeout(() => element.focus(), delay);
    } else {
      element.focus();
    }
  },

  /**
   * Get next focusable element
   */
  getNextFocusable: (
    currentElement: HTMLElement,
    container?: HTMLElement
  ): HTMLElement | null => {
    const root = container || document.body;
    const focusableElements = Array.from(
      root.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    const currentIndex = focusableElements.indexOf(currentElement);
    return focusableElements[currentIndex + 1] || null;
  },

  /**
   * Get previous focusable element
   */
  getPreviousFocusable: (
    currentElement: HTMLElement,
    container?: HTMLElement
  ): HTMLElement | null => {
    const root = container || document.body;
    const focusableElements = Array.from(
      root.querySelectorAll(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      )
    ) as HTMLElement[];

    const currentIndex = focusableElements.indexOf(currentElement);
    return focusableElements[currentIndex - 1] || null;
  },
};

/**
 * Keyboard navigation constants
 */
export const KEYBOARD_KEYS = {
  ENTER: "Enter",
  SPACE: " ",
  ESCAPE: "Escape",
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  TAB: "Tab",
  HOME: "Home",
  END: "End",
} as const;

/**
 * ARIA attributes helpers
 */
export const ariaAttributes = {
  /**
   * Generate ARIA attributes for expandable content
   */
  expandable: (isExpanded: boolean, controlsId?: string) => ({
    "aria-expanded": isExpanded,
    ...(controlsId && { "aria-controls": controlsId }),
  }),

  /**
   * Generate ARIA attributes for loading states
   */
  loading: (isLoading: boolean, label?: string) => ({
    "aria-busy": isLoading,
    ...(label && { "aria-label": label }),
  }),

  /**
   * Generate ARIA attributes for form validation
   */
  validation: (
    hasError: boolean,
    errorId?: string,
    describedById?: string
  ) => ({
    "aria-invalid": hasError,
    ...(hasError && errorId && { "aria-describedby": errorId }),
    ...(describedById && { "aria-describedby": describedById }),
  }),
};

/**
 * Semantic HTML helpers
 */
export const semanticHelpers = {
  /**
   * Get appropriate heading level based on section depth
   */
  getHeadingLevel: (depth: number): "h1" | "h2" | "h3" | "h4" | "h5" | "h6" => {
    const level = Math.min(Math.max(depth, 1), 6);
    return `h${level}` as "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
  },

  /**
   * Generate landmark roles
   */
  landmarks: {
    main: { role: "main" },
    navigation: { role: "navigation" },
    banner: { role: "banner" },
    contentinfo: { role: "contentinfo" },
    complementary: { role: "complementary" },
    search: { role: "search" },
  },
};
