import { render, screen } from "@testing-library/react";
import {
  Skeleton,
  SkeletonCard,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
  SkeletonHero,
  SkeletonFeatures,
  SkeletonNavigation,
  SkeletonFooter,
  SkeletonCTA,
} from "../index";

describe("Skeleton Components Integration", () => {
  it("exports all skeleton components correctly", () => {
    expect(Skeleton).toBeDefined();
    expect(SkeletonCard).toBeDefined();
    expect(SkeletonText).toBeDefined();
    expect(SkeletonAvatar).toBeDefined();
    expect(SkeletonButton).toBeDefined();
    expect(SkeletonHero).toBeDefined();
    expect(SkeletonFeatures).toBeDefined();
    expect(SkeletonNavigation).toBeDefined();
    expect(SkeletonFooter).toBeDefined();
    expect(SkeletonCTA).toBeDefined();
  });

  it("renders a complete page skeleton layout", () => {
    render(
      <div data-testid="complete-skeleton">
        <SkeletonNavigation />
        <SkeletonHero />
        <SkeletonFeatures />
        <SkeletonCTA />
        <SkeletonFooter />
      </div>
    );

    const completeSkeleton = screen.getByTestId("complete-skeleton");
    expect(completeSkeleton).toBeInTheDocument();

    // Verify all sections are rendered
    expect(document.querySelector("header")).toBeInTheDocument(); // Navigation
    expect(document.querySelector("section")).toBeInTheDocument(); // Hero/Features/CTA
    expect(document.querySelector("footer")).toBeInTheDocument(); // Footer
  });

  it("all skeleton components have consistent animation classes", () => {
    render(
      <div>
        <Skeleton data-testid="base-skeleton" />
        <SkeletonCard />
        <SkeletonText />
        <SkeletonAvatar />
        <SkeletonButton />
      </div>
    );

    // All skeleton components should have animate-pulse class
    const animatedElements = document.querySelectorAll(".animate-pulse");
    expect(animatedElements.length).toBeGreaterThan(0);

    // Base skeleton should have the class
    const baseSkeleton = screen.getByTestId("base-skeleton");
    expect(baseSkeleton).toHaveClass("animate-pulse");
  });

  it("skeleton components work with custom className props", () => {
    render(
      <div>
        <SkeletonCard className="custom-card" data-testid="custom-card" />
        <SkeletonHero className="custom-hero" data-testid="custom-hero" />
        <SkeletonFeatures
          className="custom-features"
          data-testid="custom-features"
        />
      </div>
    );

    expect(screen.getByTestId("custom-card")).toHaveClass("custom-card");
    expect(screen.getByTestId("custom-hero")).toHaveClass("custom-hero");
    expect(screen.getByTestId("custom-features")).toHaveClass(
      "custom-features"
    );
  });

  it("skeleton components maintain accessibility structure", () => {
    render(
      <div>
        <SkeletonNavigation />
        <SkeletonHero />
        <SkeletonFooter />
      </div>
    );

    // Should have proper semantic HTML structure
    expect(document.querySelector("header")).toBeInTheDocument();
    expect(document.querySelector("section")).toBeInTheDocument();
    expect(document.querySelector("footer")).toBeInTheDocument();
  });
});
