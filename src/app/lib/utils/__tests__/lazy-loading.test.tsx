import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { createLazyComponent, IntersectionLazy } from "../lazy-loading";

// Mock IntersectionObserver
const mockIntersectionObserver = jest.fn();
mockIntersectionObserver.mockReturnValue({
  observe: () => null,
  unobserve: () => null,
  disconnect: () => null,
});
window.IntersectionObserver = mockIntersectionObserver;

// Test component
const TestComponent = ({ text }: { text: string }) => <div>{text}</div>;

describe("Lazy Loading Utilities", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("createLazyComponent", () => {
    it("creates a lazy component that loads asynchronously", async () => {
      const LazyTestComponent = createLazyComponent(() =>
        Promise.resolve({ default: TestComponent }),
      );

      render(<LazyTestComponent text="Lazy loaded content" />);

      // Should show fallback initially
      expect(screen.getByRole("generic")).toBeInTheDocument();

      // Should load the actual component
      await waitFor(() => {
        expect(screen.getByText("Lazy loaded content")).toBeInTheDocument();
      });
    });

    it("handles loading errors gracefully", async () => {
      const LazyTestComponent = createLazyComponent(() =>
        Promise.reject(new Error("Failed to load")),
      );

      render(<LazyTestComponent text="Should not appear" />);

      await waitFor(() => {
        expect(
          screen.getByText(/Failed to load component/),
        ).toBeInTheDocument();
      });
    });

    it("uses custom fallback component", async () => {
      const CustomFallback = () => <div>Custom loading...</div>;
      const LazyTestComponent = createLazyComponent(
        () => Promise.resolve({ default: TestComponent }),
        { fallback: CustomFallback },
      );

      render(<LazyTestComponent text="Content" />);

      expect(screen.getByText("Custom loading...")).toBeInTheDocument();
    });
  });

  describe("IntersectionLazy", () => {
    it("renders fallback initially", () => {
      render(
        <IntersectionLazy fallback={<div>Loading...</div>}>
          <div>Content</div>
        </IntersectionLazy>,
      );

      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.queryByText("Content")).not.toBeInTheDocument();
    });

    it("sets up intersection observer", () => {
      render(
        <IntersectionLazy>
          <div>Content</div>
        </IntersectionLazy>,
      );

      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          threshold: 0.1,
          rootMargin: "50px",
        }),
      );
    });

    it("accepts custom threshold and rootMargin", () => {
      render(
        <IntersectionLazy threshold={0.5} rootMargin="100px">
          <div>Content</div>
        </IntersectionLazy>,
      );

      expect(mockIntersectionObserver).toHaveBeenCalledWith(
        expect.any(Function),
        expect.objectContaining({
          threshold: 0.5,
          rootMargin: "100px",
        }),
      );
    });
  });
});
