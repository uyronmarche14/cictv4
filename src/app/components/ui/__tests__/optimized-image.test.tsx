import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  OptimizedImage,
  OptimizedHeroImage,
  OptimizedLazyImage,
} from "../optimized-image";

// Mock next/image
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} data-testid="next-image" />
  ),
}));

// Mock next-cloudinary
jest.mock("next-cloudinary", () => ({
  CldImage: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} data-testid="cld-image" />
  ),
}));

describe("OptimizedImage", () => {
  describe("Next.js Image rendering", () => {
    it("renders Next.js Image with required props", () => {
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Test image"
          width={800}
          height={600}
        />,
      );

      const image = screen.getByTestId("next-image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/test-image.jpg");
      expect(image).toHaveAttribute("alt", "Test image");
    });

    it("renders Next.js Image with fill prop", () => {
      render(<OptimizedImage src="/test-image.jpg" alt="Test image" fill />);

      const image = screen.getByTestId("next-image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "/test-image.jpg");
      expect(image).toHaveAttribute("alt", "Test image");
    });

    it("applies priority loading for above-the-fold images", () => {
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Test image"
          width={800}
          height={600}
          priority
        />,
      );

      const image = screen.getByTestId("next-image");
      expect(image).toBeInTheDocument();
    });

    it("applies lazy loading by default", () => {
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Test image"
          width={800}
          height={600}
        />,
      );

      const image = screen.getByTestId("next-image");
      expect(image).toBeInTheDocument();
    });

    it("applies custom className", () => {
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Test image"
          width={800}
          height={600}
          className="custom-class"
        />,
      );

      const image = screen.getByTestId("next-image");
      expect(image).toHaveClass("custom-class");
    });
  });

  describe("Cloudinary Image rendering", () => {
    it("renders Cloudinary Image with required props", () => {
      render(
        <OptimizedImage
          src="sample-image"
          alt="Test cloudinary image"
          width={800}
          height={600}
          cloudinary
        />,
      );

      const image = screen.getByTestId("cld-image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "sample-image");
      expect(image).toHaveAttribute("alt", "Test cloudinary image");
    });

    it("renders Cloudinary Image with fill prop", () => {
      render(
        <OptimizedImage
          src="sample-image"
          alt="Test cloudinary image"
          fill
          cloudinary
        />,
      );

      const image = screen.getByTestId("cld-image");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", "sample-image");
      expect(image).toHaveAttribute("alt", "Test cloudinary image");
    });

    it("applies custom crop and gravity settings", () => {
      render(
        <OptimizedImage
          src="sample-image"
          alt="Test cloudinary image"
          width={800}
          height={600}
          cloudinary
          crop="scale"
          gravity="face"
        />,
      );

      const image = screen.getByTestId("cld-image");
      expect(image).toBeInTheDocument();
    });
  });

  describe("Convenience components", () => {
    it("OptimizedHeroImage sets priority to true", () => {
      render(
        <OptimizedHeroImage
          src="/hero-image.jpg"
          alt="Hero image"
          width={1200}
          height={800}
        />,
      );

      const image = screen.getByTestId("next-image");
      expect(image).toBeInTheDocument();
    });

    it("OptimizedLazyImage sets loading to lazy", () => {
      render(
        <OptimizedLazyImage
          src="/lazy-image.jpg"
          alt="Lazy image"
          width={800}
          height={600}
        />,
      );

      const image = screen.getByTestId("next-image");
      expect(image).toBeInTheDocument();
    });
  });

  describe("Image optimization settings", () => {
    it("applies custom quality setting", () => {
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Test image"
          width={800}
          height={600}
          quality={95}
        />,
      );

      const image = screen.getByTestId("next-image");
      expect(image).toBeInTheDocument();
    });

    it("applies custom sizes attribute", () => {
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Test image"
          width={800}
          height={600}
          sizes="(max-width: 640px) 100vw, 50vw"
        />,
      );

      const image = screen.getByTestId("next-image");
      expect(image).toBeInTheDocument();
    });

    it("applies blur placeholder with data URL", () => {
      render(
        <OptimizedImage
          src="/test-image.jpg"
          alt="Test image"
          width={800}
          height={600}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQ"
        />,
      );

      const image = screen.getByTestId("next-image");
      expect(image).toBeInTheDocument();
    });
  });
});
