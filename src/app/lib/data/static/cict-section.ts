import { LucideIcon } from "lucide-react";

export interface CICTFeature {
  title: string;
  icon: string; // Icon name as string for serialization
  description: string;
}

export interface CICTSectionData {
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  features: CICTFeature[];
}

export const cictSectionData: CICTSectionData = {
  badge: "What is CICT?",
  title: "COLLEGE OF INFORMATION AND",
  subtitle: "COMMUNICATION TECHNOLOGY",
  description:
    "Streamline optimizes your workflow from start to finish. It gathers information, generates reports, automates tasks, and delivers results—all in one seamless system.",
  logo: {
    src: "/app/lib/CICT.png",
    alt: "CICT Logo",
    width: 218,
    height: 218,
  },
  features: [
    {
      title: "MISSION",
      icon: "Target",
      description:
        "Skip the manual tasks and complex setups. With Streamline, you can focus on what matters most while the system handles the rest.",
    },
    {
      title: "VISION",
      icon: "Eye",
      description:
        "Don't overspend on unnecessary tools or teams. Keep your operations lean and efficient by automating your workflows with Streamline.",
    },
    {
      title: "PHILOSOPHY",
      icon: "Brain",
      description:
        "Say goodbye to managing multiple platforms. Streamline takes care of all the heavy lifting, ensuring consistent results with minimal hassle.",
    },
  ],
};
