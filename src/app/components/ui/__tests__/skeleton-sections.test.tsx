import { render, screen } from "@testing-library/react";
import {
  SkeletonHero,
  SkeletonFeatures,
  SkeletonNavigation,
  SkeletonFooter,
  SkeletonCTA,
} from "../skeleton-sections";

describe("Section Skeleton Components", () => {
  describe("SkeletonHero", () => {
    it("renders hero section skeleton with default elements", () => {
      render(<SkeletonHero data-testid="skeleton-hero" />);
      const hero = screen.getByTestId("skeleton-hero");
      expect(hero).toHaveClass(
        "min-h-screen",
        "flex",
        "items-center",
        "justify-center"
      );
    });

    it("conditionally renders scroll indicator", () => {
      const { rerender } = render(<SkeletonHero showScrollIndicator={false} />);
      expect(document.querySelector(".mt-8")).not.toBeInTheDocument();

      rerender(<SkeletonHero showScrollIndicator={true} />);
      expect(document.querySelector(".mt-8")).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <SkeletonHero className="custom-hero" data-testid="skeleton-hero" />
      );
      const hero = screen.getByTestId("skeleton-hero");
      expect(hero).toHaveClass("custom-hero");
    });
  });

  describe("SkeletonFeatures", () => {
    it("renders features section with default item count", () => {
      render(<SkeletonFeatures data-testid="skeleton-features" />);
      const features = screen.getByTestId("skeleton-features");
      expect(features).toBeInTheDocument();

      // Should render 8 feature items by default
      const featureItems = document.querySelectorAll(".grid .border");
      expect(featureItems).toHaveLength(8);
    });

    it("renders custom number of feature items", () => {
      render(
        <SkeletonFeatures itemCount={4} data-testid="skeleton-features" />
      );
      const featureItems = document.querySelectorAll(".grid .border");
      expect(featureItems).toHaveLength(4);
    });

    it("conditionally renders description", () => {
      const { rerender } = render(<SkeletonFeatures showDescription={false} />);
      expect(
        document.querySelector(".space-y-2.max-w-3xl")
      ).not.toBeInTheDocument();

      rerender(<SkeletonFeatures showDescription={true} />);
      expect(
        document.querySelector(".space-y-2.max-w-3xl")
      ).toBeInTheDocument();
    });
  });

  describe("SkeletonNavigation", () => {
    it("renders desktop navigation by default", () => {
      render(<SkeletonNavigation data-testid="skeleton-nav" />);
      const nav = screen.getByTestId("skeleton-nav");
      expect(nav).toHaveClass("fixed", "top-0", "z-50");
      expect(document.querySelector(".hidden.md\\:flex")).toBeInTheDocument();
    });

    it("renders mobile navigation when isMobile is true", () => {
      render(<SkeletonNavigation isMobile={true} data-testid="skeleton-nav" />);
      const nav = screen.getByTestId("skeleton-nav");
      expect(nav).toHaveClass("md:hidden");
    });

    it("conditionally renders logo", () => {
      const { rerender } = render(<SkeletonNavigation showLogo={false} />);
      expect(
        document.querySelector(".flex.items-center.gap-2")
      ).not.toBeInTheDocument();

      rerender(<SkeletonNavigation showLogo={true} />);
      expect(
        document.querySelector(".flex.items-center.gap-2")
      ).toBeInTheDocument();
    });

    it("conditionally renders theme toggle", () => {
      render(<SkeletonNavigation showThemeToggle={false} />);
      expect(document.querySelector(".ml-0\\.5")).not.toBeInTheDocument();
    });
  });

  describe("SkeletonFooter", () => {
    it("renders footer with grid layout", () => {
      render(<SkeletonFooter data-testid="skeleton-footer" />);
      const footer = screen.getByTestId("skeleton-footer");
      expect(footer).toHaveClass("w-full", "py-12", "border-t");

      // Should have 4 columns (1 logo + 3 link columns)
      const columns = document.querySelectorAll(
        ".grid.grid-cols-1.md\\:grid-cols-4 > div"
      );
      expect(columns).toHaveLength(4);
    });

    it("renders footer bottom section", () => {
      render(<SkeletonFooter />);
      const bottomSection = document.querySelector(".mt-12.pt-8.border-t");
      expect(bottomSection).toBeInTheDocument();

      // Should have social media icons
      const socialIcons = document.querySelectorAll(
        ".flex.gap-4 .h-6.w-6.rounded-full"
      );
      expect(socialIcons).toHaveLength(4);
    });
  });

  describe("SkeletonCTA", () => {
    it("renders CTA section with centered content", () => {
      render(<SkeletonCTA data-testid="skeleton-cta" />);
      const cta = screen.getByTestId("skeleton-cta");
      expect(cta).toHaveClass("w-full", "py-16");

      const content = document.querySelector(".text-center");
      expect(content).toBeInTheDocument();
    });

    it("renders action buttons", () => {
      render(<SkeletonCTA />);
      const buttons = document.querySelectorAll(
        ".flex.flex-col.sm\\:flex-row .animate-pulse"
      );
      expect(buttons.length).toBeGreaterThanOrEqual(2); // Should have at least 2 buttons
    });
  });
});
