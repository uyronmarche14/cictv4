import type { Meta, StoryObj } from "@storybook/react";
import { Skeleton } from "./skeleton";

const meta: Meta<typeof Skeleton> = {
  title: "UI/Skeleton/Base",
  component: Skeleton,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "A base skeleton component that provides a loading placeholder with a pulsing animation.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      description: "Additional CSS classes to apply to the skeleton",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    className: "h-4 w-48",
  },
};

export const Small: Story = {
  args: {
    className: "h-3 w-32",
  },
};

export const Medium: Story = {
  args: {
    className: "h-4 w-48",
  },
};

export const Large: Story = {
  args: {
    className: "h-6 w-64",
  },
};

export const Circle: Story = {
  args: {
    className: "h-12 w-12 rounded-full",
  },
};

export const Rectangle: Story = {
  args: {
    className: "h-32 w-48 rounded-lg",
  },
};

export const FullWidth: Story = {
  args: {
    className: "h-4 w-full",
  },
  parameters: {
    layout: "padded",
  },
};

export const MultipleLines: Story = {
  render: () => (
    <div className="w-64 space-y-2">
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
      <Skeleton className="h-4 w-4/5" />
      <Skeleton className="h-4 w-3/4" />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story:
          "Multiple skeleton lines with varying widths to simulate text content.",
      },
    },
  },
};
