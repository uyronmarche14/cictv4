import { render, screen } from "@testing-library/react";
import { Skeleton } from "../skeleton";
import {
  SkeletonCard,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
} from "../skeleton-variants";

describe("Skeleton Components", () => {
  describe("Skeleton", () => {
    it("renders with default classes", () => {
      render(<Skeleton data-testid="skeleton" />);
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toHaveClass("animate-pulse", "rounded-md", "bg-muted");
    });

    it("applies custom className", () => {
      render(<Skeleton className="custom-class" data-testid="skeleton" />);
      const skeleton = screen.getByTestId("skeleton");
      expect(skeleton).toHaveClass("custom-class");
    });
  });

  describe("SkeletonCard", () => {
    it("renders all elements by default", () => {
      render(<SkeletonCard data-testid="skeleton-card" />);
      const card = screen.getByTestId("skeleton-card");
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass(
        "rounded-lg",
        "border",
        "bg-card",
        "p-6",
        "shadow-sm"
      );
    });

    it("conditionally renders image", () => {
      const { rerender } = render(<SkeletonCard showImage={false} />);
      expect(screen.queryByRole("img")).not.toBeInTheDocument();

      rerender(<SkeletonCard showImage={true} />);
      // Image skeleton should be present (div with specific classes)
      expect(document.querySelector(".h-48")).toBeInTheDocument();
    });

    it("conditionally renders actions", () => {
      render(<SkeletonCard showActions={true} />);
      const actionsContainer = document.querySelector(".flex.gap-2");
      expect(actionsContainer).toBeInTheDocument();
    });
  });

  describe("SkeletonText", () => {
    it("renders default number of lines", () => {
      render(<SkeletonText data-testid="skeleton-text" />);
      const container = screen.getByTestId("skeleton-text");
      const lines = container.querySelectorAll(".animate-pulse");
      expect(lines).toHaveLength(3); // default lines
    });

    it("renders custom number of lines", () => {
      render(<SkeletonText lines={5} data-testid="skeleton-text" />);
      const container = screen.getByTestId("skeleton-text");
      const lines = container.querySelectorAll(".animate-pulse");
      expect(lines).toHaveLength(5);
    });

    it("applies variant-specific height classes", () => {
      render(
        <SkeletonText variant="heading" lines={1} data-testid="skeleton-text" />
      );
      const container = screen.getByTestId("skeleton-text");
      const line = container.querySelector(".h-6");
      expect(line).toBeInTheDocument();
    });
  });

  describe("SkeletonAvatar", () => {
    it("renders with default size", () => {
      render(<SkeletonAvatar data-testid="skeleton-avatar" />);
      const avatar = screen.getByTestId("skeleton-avatar");
      expect(avatar).toHaveClass("h-10", "w-10", "rounded-full");
    });

    it("applies size-specific classes", () => {
      render(<SkeletonAvatar size="lg" data-testid="skeleton-avatar" />);
      const avatar = screen.getByTestId("skeleton-avatar");
      expect(avatar).toHaveClass("h-12", "w-12");
    });
  });

  describe("SkeletonButton", () => {
    it("renders with default variant and size", () => {
      render(<SkeletonButton data-testid="skeleton-button" />);
      const button = screen.getByTestId("skeleton-button");
      expect(button).toHaveClass("h-9", "w-20", "rounded-md");
    });

    it("applies variant-specific classes", () => {
      render(
        <SkeletonButton variant="outline" data-testid="skeleton-button" />
      );
      const button = screen.getByTestId("skeleton-button");
      expect(button).toHaveClass("border", "border-input");
    });

    it("applies size-specific classes", () => {
      render(<SkeletonButton size="lg" data-testid="skeleton-button" />);
      const button = screen.getByTestId("skeleton-button");
      expect(button).toHaveClass("h-10", "w-24");
    });
  });
});
