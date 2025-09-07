import { render, screen } from "@testing-library/react";
import { MaxWidthWrapper } from "../max-width-wrapper";

describe("MaxWidthWrapper", () => {
  it("renders children correctly", () => {
    render(
      <MaxWidthWrapper>
        <div>Test content</div>
      </MaxWidthWrapper>
    );

    expect(screen.getByText("Test content")).toBeInTheDocument();
  });

  it("applies default max-width class (7xl)", () => {
    const { container } = render(
      <MaxWidthWrapper>
        <div>Test content</div>
      </MaxWidthWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("max-w-7xl");
  });

  it("applies custom max-width class when specified", () => {
    const { container } = render(
      <MaxWidthWrapper maxWidth="4xl">
        <div>Test content</div>
      </MaxWidthWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("max-w-4xl");
    expect(wrapper).not.toHaveClass("max-w-7xl");
  });

  it("applies all max-width options correctly", () => {
    const maxWidthOptions = [
      "sm",
      "md",
      "lg",
      "xl",
      "2xl",
      "3xl",
      "4xl",
      "5xl",
      "6xl",
      "7xl",
    ] as const;

    maxWidthOptions.forEach((maxWidth) => {
      const { container } = render(
        <MaxWidthWrapper maxWidth={maxWidth}>
          <div>Test content</div>
        </MaxWidthWrapper>
      );

      const wrapper = container.firstChild as HTMLElement;
      expect(wrapper).toHaveClass(`max-w-${maxWidth}`);
    });
  });

  it("applies custom className along with default classes", () => {
    const { container } = render(
      <MaxWidthWrapper className="custom-class">
        <div>Test content</div>
      </MaxWidthWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("custom-class");
    expect(wrapper).toHaveClass("max-w-7xl");
    expect(wrapper).toHaveClass("mx-auto");
    expect(wrapper).toHaveClass("w-full");
  });

  it("applies responsive padding classes", () => {
    const { container } = render(
      <MaxWidthWrapper>
        <div>Test content</div>
      </MaxWidthWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("px-4");
    expect(wrapper).toHaveClass("sm:px-6");
    expect(wrapper).toHaveClass("lg:px-8");
  });

  it("merges custom className with default classes using cn utility", () => {
    const { container } = render(
      <MaxWidthWrapper className="bg-red-500 px-2" maxWidth="lg">
        <div>Test content</div>
      </MaxWidthWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper).toHaveClass("bg-red-500");
    expect(wrapper).toHaveClass("max-w-lg");
    expect(wrapper).toHaveClass("mx-auto");
    expect(wrapper).toHaveClass("w-full");
    // The px-2 should override the default px-4 due to tailwind-merge
    expect(wrapper).toHaveClass("px-2");
  });

  it("renders as a div element", () => {
    const { container } = render(
      <MaxWidthWrapper>
        <div>Test content</div>
      </MaxWidthWrapper>
    );

    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.tagName).toBe("DIV");
  });

  it("handles nested content correctly", () => {
    render(
      <MaxWidthWrapper>
        <div>
          <h1>Title</h1>
          <p>Paragraph</p>
          <button>Button</button>
        </div>
      </MaxWidthWrapper>
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Paragraph")).toBeInTheDocument();
    expect(screen.getByText("Button")).toBeInTheDocument();
  });
});
