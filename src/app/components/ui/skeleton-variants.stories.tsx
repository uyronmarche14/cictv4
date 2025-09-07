import type { Meta, StoryObj } from "@storybook/react";
import {
  SkeletonCard,
  SkeletonText,
  SkeletonAvatar,
  SkeletonButton,
} from "./skeleton-variants";

// SkeletonCard Stories
const cardMeta: Meta<typeof SkeletonCard> = {
  title: "UI/Skeleton/SkeletonCard",
  component: SkeletonCard,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A skeleton component that mimics the structure of a card with optional image, title, description, and actions.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    showImage: {
      control: "boolean",
      description: "Whether to show the image skeleton",
    },
    showTitle: {
      control: "boolean",
      description: "Whether to show the title skeleton",
    },
    showDescription: {
      control: "boolean",
      description: "Whether to show the description skeleton",
    },
    showActions: {
      control: "boolean",
      description: "Whether to show the action buttons skeleton",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export default cardMeta;
type CardStory = StoryObj<typeof cardMeta>;

export const CardDefault: CardStory = {
  args: {
    showImage: true,
    showTitle: true,
    showDescription: true,
    showActions: false,
  },
};

export const CardWithActions: CardStory = {
  args: {
    showImage: true,
    showTitle: true,
    showDescription: true,
    showActions: true,
  },
};

export const CardTextOnly: CardStory = {
  args: {
    showImage: false,
    showTitle: true,
    showDescription: true,
    showActions: false,
  },
};

export const CardMinimal: CardStory = {
  args: {
    showImage: false,
    showTitle: true,
    showDescription: false,
    showActions: false,
  },
};

// SkeletonText Stories
const textMeta: Meta<typeof SkeletonText> = {
  title: "UI/Skeleton/SkeletonText",
  component: SkeletonText,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A skeleton component for text content with configurable number of lines and variants.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    lines: {
      control: { type: "number", min: 1, max: 10 },
      description: "Number of text lines to display",
    },
    variant: {
      control: "select",
      options: ["default", "heading", "paragraph"],
      description: "Text variant affecting height",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export const TextDefault: StoryObj<typeof textMeta> = {
  args: {
    lines: 3,
    variant: "default",
  },
};

export const TextHeading: StoryObj<typeof textMeta> = {
  args: {
    lines: 2,
    variant: "heading",
  },
};

export const TextParagraph: StoryObj<typeof textMeta> = {
  args: {
    lines: 5,
    variant: "paragraph",
  },
};

export const TextSingleLine: StoryObj<typeof textMeta> = {
  args: {
    lines: 1,
    variant: "default",
  },
};

// SkeletonAvatar Stories
const avatarMeta: Meta<typeof SkeletonAvatar> = {
  title: "UI/Skeleton/SkeletonAvatar",
  component: SkeletonAvatar,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A circular skeleton component for avatar placeholders with different sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["sm", "md", "lg", "xl"],
      description: "Avatar size",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export const AvatarSmall: StoryObj<typeof avatarMeta> = {
  args: {
    size: "sm",
  },
};

export const AvatarMedium: StoryObj<typeof avatarMeta> = {
  args: {
    size: "md",
  },
};

export const AvatarLarge: StoryObj<typeof avatarMeta> = {
  args: {
    size: "lg",
  },
};

export const AvatarExtraLarge: StoryObj<typeof avatarMeta> = {
  args: {
    size: "xl",
  },
};

// SkeletonButton Stories
const buttonMeta: Meta<typeof SkeletonButton> = {
  title: "UI/Skeleton/SkeletonButton",
  component: SkeletonButton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A skeleton component for button placeholders with different variants and sizes.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "outline", "ghost", "link"],
      description: "Button variant",
    },
    size: {
      control: "select",
      options: ["sm", "md", "lg"],
      description: "Button size",
    },
    className: {
      control: "text",
      description: "Additional CSS classes",
    },
  },
};

export const ButtonDefault: StoryObj<typeof buttonMeta> = {
  args: {
    variant: "default",
    size: "md",
  },
};

export const ButtonOutline: StoryObj<typeof buttonMeta> = {
  args: {
    variant: "outline",
    size: "md",
  },
};

export const ButtonGhost: StoryObj<typeof buttonMeta> = {
  args: {
    variant: "ghost",
    size: "md",
  },
};

export const ButtonLink: StoryObj<typeof buttonMeta> = {
  args: {
    variant: "link",
    size: "md",
  },
};

export const ButtonSmall: StoryObj<typeof buttonMeta> = {
  args: {
    variant: "default",
    size: "sm",
  },
};

export const ButtonLarge: StoryObj<typeof buttonMeta> = {
  args: {
    variant: "default",
    size: "lg",
  },
};

// Combined showcase
export const AllVariants: StoryObj = {
  render: () => (
    <div className="space-y-8 p-6">
      <div>
        <h3 className="mb-4 text-lg font-semibold">Skeleton Cards</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <SkeletonCard showImage showTitle showDescription />
          <SkeletonCard showImage showTitle showDescription showActions />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Text Variants</h3>
        <div className="space-y-4">
          <SkeletonText variant="heading" lines={2} />
          <SkeletonText variant="paragraph" lines={4} />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Avatars</h3>
        <div className="flex items-center gap-4">
          <SkeletonAvatar size="sm" />
          <SkeletonAvatar size="md" />
          <SkeletonAvatar size="lg" />
          <SkeletonAvatar size="xl" />
        </div>
      </div>

      <div>
        <h3 className="mb-4 text-lg font-semibold">Buttons</h3>
        <div className="flex flex-wrap gap-4">
          <SkeletonButton variant="default" size="sm" />
          <SkeletonButton variant="outline" size="md" />
          <SkeletonButton variant="ghost" size="lg" />
        </div>
      </div>
    </div>
  ),
  parameters: {
    layout: "fullscreen",
    docs: {
      description: {
        story: "A showcase of all skeleton variant components together.",
      },
    },
  },
};
