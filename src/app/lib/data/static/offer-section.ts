export interface OfferBenefit { icon: string; title: string }

export interface OfferSectionData {
  bscs: {
    badge: string;
    title: string;
    description: string;
    benefits: OfferBenefit[];
    footnote: string;
    ctaText: string;
  };
  bsis: {
    badge: string;
    title: string;
    description: string;
    benefits: OfferBenefit[];
    footnote: string;
    ctaText: string;
  };
}

export const offerSectionData: OfferSectionData = {
  bscs: {
    badge: "BSCS",
    title: "Bachelor of Science in Computer Science",
    description:
      "Our comprehensive BSCS program equips you with the skills to excel in software development, artificial intelligence, and computational problem-solving. From fundamental algorithms to advanced machine learning applications, you'll be prepared for the tech industry's most challenging roles.",
    benefits: [
      { icon: "Code", title: "Software Development" },
      { icon: "Brain", title: "Artificial Intelligence" },
      { icon: "Settings", title: "Machine Learning" },
      { icon: "Database", title: "Data Structures & Algorithms" },
      { icon: "Shield", title: "Systems Programming" },
      { icon: "Shield", title: "Cybersecurity" },
      { icon: "Cloud", title: "Cloud Computing" },
      { icon: "Search", title: "Research & Innovation" }
    ],
    footnote: "*Plus specialized tracks in cybersecurity, cloud computing, and research",
    ctaText: "Explore BSCS Program",
  },
  bsis: {
    badge: "BSIS",
    title: "Bachelor of Science in Information Systems",
    description:
      "Our BSIS program focuses on the strategic use of technology in business. Learn to design, implement, and manage information systems that drive business value and enable digital transformation across organizations.",
    benefits: [
      { icon: "Briefcase", title: "Business Analysis" },
      { icon: "Database", title: "Information Management" },
      { icon: "Settings", title: "IT Project Management" },
      { icon: "Users", title: "Enterprise Systems" },
      { icon: "Database", title: "Database Design" },
      { icon: "ShoppingCart", title: "E-Commerce Solutions" },
      { icon: "TrendingUp", title: "Digital Transformation" },
      { icon: "Lightbulb", title: "System Strategy" }
    ],
    footnote: "*Emphasis on business-technology alignment and strategic management",
    ctaText: "Explore BSIS Program",
  },
};

