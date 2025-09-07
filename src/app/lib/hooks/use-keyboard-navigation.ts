"use client";

import { useEffect, useCallback, useRef } from "react";
import { KEYBOARD_KEYS, focusUtils } from "../utils/accessibility";

interface UseKeyboardNavigationOptions {
  /**
   * Container element to scope keyboard navigation
   */
  containerRef?: React.RefObject<HTMLElement | null>;

  /**
   * Enable arrow key navigation
   */
  enableArrowKeys?: boolean;

  /**
   * Enable home/end key navigation
   */
  enableHomeEnd?: boolean;

  /**
   * Enable escape key handling
   */
  enableEscape?: boolean;

  /**
   * Callback when escape is pressed
   */
  onEscape?: () => void;

  /**
   * Enable focus trapping within container
   */
  trapFocus?: boolean;

  /**
   * Custom key handlers
   */
  customKeyHandlers?: Record<string, (event: KeyboardEvent) => void>;
}

/**
 * Hook for managing keyboard navigation within a component
 */
export function useKeyboardNavigation(
  options: UseKeyboardNavigationOptions = {}
) {
  const {
    containerRef,
    enableArrowKeys = false,
    enableHomeEnd = false,
    enableEscape = false,
    onEscape,
    trapFocus = false,
    customKeyHandlers = {},
  } = options;

  const cleanupRef = useRef<(() => void) | null>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      const container = containerRef?.current || document.body;
      const activeElement = document.activeElement as HTMLElement;

      // Handle custom key handlers first
      if (customKeyHandlers[key]) {
        customKeyHandlers[key](event);
        return;
      }

      // Handle escape key
      if (enableEscape && key === KEYBOARD_KEYS.ESCAPE) {
        event.preventDefault();
        onEscape?.();
        return;
      }

      // Handle arrow key navigation
      if (
        enableArrowKeys &&
        [
          KEYBOARD_KEYS.ARROW_UP,
          KEYBOARD_KEYS.ARROW_DOWN,
          KEYBOARD_KEYS.ARROW_LEFT,
          KEYBOARD_KEYS.ARROW_RIGHT,
        ].includes(key)
      ) {
        event.preventDefault();

        let nextElement: HTMLElement | null = null;

        switch (key) {
          case KEYBOARD_KEYS.ARROW_DOWN:
          case KEYBOARD_KEYS.ARROW_RIGHT:
            nextElement = focusUtils.getNextFocusable(activeElement, container);
            break;
          case KEYBOARD_KEYS.ARROW_UP:
          case KEYBOARD_KEYS.ARROW_LEFT:
            nextElement = focusUtils.getPreviousFocusable(
              activeElement,
              container
            );
            break;
        }

        if (nextElement) {
          nextElement.focus();
        }
        return;
      }

      // Handle home/end key navigation
      if (
        enableHomeEnd &&
        [KEYBOARD_KEYS.HOME, KEYBOARD_KEYS.END].includes(key)
      ) {
        event.preventDefault();

        const focusableElements = Array.from(
          container.querySelectorAll(
            'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        ) as HTMLElement[];

        if (focusableElements.length === 0) return;

        const targetElement =
          key === KEYBOARD_KEYS.HOME
            ? focusableElements[0]
            : focusableElements[focusableElements.length - 1];

        targetElement.focus();
        return;
      }
    },
    [
      containerRef,
      enableArrowKeys,
      enableHomeEnd,
      enableEscape,
      onEscape,
      customKeyHandlers,
    ]
  );

  useEffect(() => {
    const container = containerRef?.current || document;

    // Add keyboard event listener
    container.addEventListener("keydown", handleKeyDown);

    // Setup focus trapping if enabled
    if (trapFocus && containerRef?.current) {
      cleanupRef.current = focusUtils.trapFocus(containerRef.current);
    }

    return () => {
      container.removeEventListener("keydown", handleKeyDown);
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
    };
  }, [handleKeyDown, trapFocus, containerRef]);

  return {
    /**
     * Focus the first focusable element in the container
     */
    focusFirst: useCallback(() => {
      const container = containerRef?.current || document.body;
      const firstFocusable = container.querySelector(
        'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
      ) as HTMLElement;

      if (firstFocusable) {
        firstFocusable.focus();
      }
    }, [containerRef]),

    /**
     * Focus the last focusable element in the container
     */
    focusLast: useCallback(() => {
      const container = containerRef?.current || document.body;
      const focusableElements = Array.from(
        container.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];

      const lastFocusable = focusableElements[focusableElements.length - 1];
      if (lastFocusable) {
        lastFocusable.focus();
      }
    }, [containerRef]),

    /**
     * Get all focusable elements in the container
     */
    getFocusableElements: useCallback(() => {
      const container = containerRef?.current || document.body;
      return Array.from(
        container.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
        )
      ) as HTMLElement[];
    }, [containerRef]),
  };
}

/**
 * Hook for managing roving tabindex pattern
 * Useful for components like menus, toolbars, and grids
 */
export function useRovingTabIndex(
  items: React.RefObject<HTMLElement>[],
  options: {
    orientation?: "horizontal" | "vertical" | "both";
    loop?: boolean;
    defaultIndex?: number;
  } = {}
) {
  const { orientation = "both", loop = true, defaultIndex = 0 } = options;
  const currentIndexRef = useRef(defaultIndex);

  const setTabIndex = useCallback(
    (activeIndex: number) => {
      items.forEach((itemRef, index) => {
        if (itemRef.current) {
          itemRef.current.tabIndex = index === activeIndex ? 0 : -1;
        }
      });
      currentIndexRef.current = activeIndex;
    },
    [items]
  );

  const focusItem = useCallback(
    (index: number) => {
      if (items[index]?.current) {
        items[index].current!.focus();
        setTabIndex(index);
      }
    },
    [items, setTabIndex]
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const { key } = event;
      const currentIndex = currentIndexRef.current;
      let nextIndex = currentIndex;

      const isHorizontalKey = [
        KEYBOARD_KEYS.ARROW_LEFT,
        KEYBOARD_KEYS.ARROW_RIGHT,
      ].includes(key);
      const isVerticalKey = [
        KEYBOARD_KEYS.ARROW_UP,
        KEYBOARD_KEYS.ARROW_DOWN,
      ].includes(key);

      if (
        (orientation === "horizontal" && !isHorizontalKey) ||
        (orientation === "vertical" && !isVerticalKey) ||
        (orientation === "both" && !isHorizontalKey && !isVerticalKey)
      ) {
        return;
      }

      event.preventDefault();

      switch (key) {
        case KEYBOARD_KEYS.ARROW_RIGHT:
        case KEYBOARD_KEYS.ARROW_DOWN:
          nextIndex = currentIndex + 1;
          if (nextIndex >= items.length) {
            nextIndex = loop ? 0 : items.length - 1;
          }
          break;
        case KEYBOARD_KEYS.ARROW_LEFT:
        case KEYBOARD_KEYS.ARROW_UP:
          nextIndex = currentIndex - 1;
          if (nextIndex < 0) {
            nextIndex = loop ? items.length - 1 : 0;
          }
          break;
        case KEYBOARD_KEYS.HOME:
          nextIndex = 0;
          break;
        case KEYBOARD_KEYS.END:
          nextIndex = items.length - 1;
          break;
      }

      focusItem(nextIndex);
    },
    [items, orientation, loop, focusItem]
  );

  useEffect(() => {
    // Initialize tabindex
    setTabIndex(defaultIndex);

    // Add event listeners to all items
    const cleanupFunctions = items.map((itemRef) => {
      if (itemRef.current) {
        const element = itemRef.current;
        element.addEventListener("keydown", handleKeyDown);
        return () => element.removeEventListener("keydown", handleKeyDown);
      }
      return () => {};
    });

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [items, handleKeyDown, setTabIndex, defaultIndex]);

  return {
    focusItem,
    setTabIndex,
    currentIndex: currentIndexRef.current,
  };
}
