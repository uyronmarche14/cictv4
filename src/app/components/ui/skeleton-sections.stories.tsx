import type { Meta, StoryObj } from "@storybook/react";
import {
  SkeletonHero,
  SkeletonFeatures,
  SkeletonNavigation,
  SkeletonFooter,
  SkeletonCTA,
} from "./skeleton-sections";

// SkeletonHero Stories
const heroMeta: Meta<typeof SkeletonHero> = {
  title: "UI/Skeleton/Sections/SkeletonHero",
  component: SkeletonHero,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A skeleton component for hero sections with configurable scroll indicator.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showScrollIndicator: {
      control: "boolean",
      description: "Whether to show the scroll indicator skeleton",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default heroMeta;
type HeroStory = StoryObj<typeof heroMeta>;

export const HeroDefault: HeroStory = {
  args: {
    showScrollIndicator: true,
  },
};

export const HeroWithoutScrollIndicator: HeroStory = {
  args: {
    showScrollIndicator: false,
  },
};

// SkeletonFeatures Stories
const featuresMeta: Meta<typeof SkeletonFeatures> = {
  title: "UI/Skeleton/Sections/SkeletonFeatures",
  component: SkeletonFeatures,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A skeleton component for features grid sections with configurable item count and description.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    itemCount: {
      control: { type: "number", min: 1, max: 16 },
      description: "Number of feature items to display",
    },
    showDescription: {
      control: "boolean",
      description: "Whether to show the section description",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export const FeaturesDefault: StoryObj<typeof featuresMeta> = {
  args: {
    itemCount: 8,
    showDescription: true,
  },
};

export const FeaturesMinimal: StoryObj<typeof featuresMeta> = {
  args: {
    itemCount: 4,
    showDescription: false,
  },
};

export const FeaturesExtended: StoryObj<typeof featuresMeta> = {
  args: {
    itemCount: 12,
    showDescription: true,
  },
};

// SkeletonNavigation Stories
const navigationMeta: Meta<typeof SkeletonNavigation> = {
  title: "UI/Skeleton/Sections/SkeletonNavigation",
  component: SkeletonNavigation,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A skeleton component for navigation bars with desktop and mobile variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showLogo: {
      control: "boolean",
      description: "Whether to show the logo skeleton",
    },
    showThemeToggle: {
      control: "boolean",
      description: "Whether to show the theme toggle skeleton",
    },
    isMobile: {
      control: "boolean",
      description: "Whether to render mobile navigation variant",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export const NavigationDesktop: StoryObj<typeof navigationMeta> = {
  args: {
    showLogo: true,
    showThemeToggle: true,
    isMobile: false,
  },
};

export const NavigationDesktopMinimal: StoryObj<typeof navigationMeta> = {
  args: {
    showLogo: false,
    showThemeToggle: false,
    isMobile: false,
  },
};

export const NavigationMobile: StoryObj<typeof navigationMeta> = {
  args: {
    showLogo: true,
    showThemeToggle: true,
    isMobile: true,
  },
};

export const NavigationMobileMinimal: StoryObj<typeof navigationMeta> = {
  args: {
    showLogo: false,
    showThemeToggle: false,
    isMobile: true,
  },
};

// SkeletonFooter Stories
const footerMeta: Meta<typeof SkeletonFooter> = {
  title: "UI/Skeleton/Sections/SkeletonFooter",
  component: SkeletonFooter,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A skeleton component for footer sections with logo, links, and social media placeholders.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export const FooterDefault: StoryObj<typeof footerMeta> = {
  args: {},
};

// SkeletonCTA Stories
const ctaMeta: Meta<typeof SkeletonCTA> = {
  title: "UI/Skeleton/Sections/SkeletonCTA",
  component: SkeletonCTA,
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        component:
          "A skeleton component for call-to-action sections with heading, description, and action buttons.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export const CTADefault: StoryObj<typeof ctaMeta> = {
  args: {},
};

// Complete Page Layout
export const CompletePage: StoryObj = {
  render: () => (
    <div className="bg-background min-h-screen">
      <SkeletonNavigation showLogo showThemeToggle />
      <SkeletonHero showScrollIndicator />
      <SkeletonFeatures itemCount={8} showDescription />
      <SkeletonCTA />
      <SkeletonFooter />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story:
          "A complete page layout using all skeleton section components together.",
      },
    },
  },
};

// Mobile Layout
export const MobileLayout: StoryObj = {
  render: () => (
    <div className="bg-background min-h-screen">
      <SkeletonNavigation showLogo showThemeToggle isMobile={false} />
      <SkeletonNavigation showLogo showThemeToggle isMobile />
      <div className="pt-16">
        <SkeletonHero showScrollIndicator />
        <SkeletonFeatures itemCount={6} showDescription />
        <SkeletonCTA />
        <SkeletonFooter />
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    viewport: {
      defaultViewport: "mobile1",
    },
    docs: {
      description: {
        story:
          "A mobile-optimized layout showing both desktop and mobile navigation variants.",
      },
    },
  },
};

// Dark Theme Showcase
export const DarkTheme: StoryObj = {
  render: () => (
    <div className="bg-background dark min-h-screen">
      <SkeletonNavigation showLogo showThemeToggle />
      <SkeletonHero showScrollIndicator />
      <SkeletonFeatures itemCount={8} showDescription />
      <SkeletonCTA />
      <SkeletonFooter />
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    backgrounds: { default: "dark" },
    docs: {
      description: {
        story: "Complete page layout with dark theme styling.",
      },
    },
  },
};
