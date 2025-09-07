export interface CTASectionData {
  title: string;
  highlightedText: string;
  subtitle: string;
  description: string;
  button: {
    text: string;
    icon: string;
  };
  badge: {
    text: string;
    icon: string;
  };
}

export const ctaSectionData: CTASectionData = {
  title: "Where",
  highlightedText: "Strong teams",
  subtitle: "start",
  description:
    "Strong teams thrive on trust, collaboration, and shared vision. Together, we can turn ambitious goals into remarkable achievements.",
  button: {
    text: "Get Started Now",
    icon: "ArrowRight",
  },
  badge: {
    text: "✨ No Signup Required · Enjoy!",
    icon: "",
  },
};
