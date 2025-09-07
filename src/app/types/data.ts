// Static Data Interfaces
export interface HeroData {
  greeting: string;
  mainTitle: string;
  location: string;
  callToAction: string;
  scrollTarget?: string;
}

export interface NavigationLink {
  title: string;
  href: string;
}

export interface NavigationData {
  links: NavigationLink[];
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
}

export interface CICTFeature {
  title: string;
  icon: string;
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

export interface StorySectionData {
  badge: string;
  title: string;
  description: string;
}

export interface SocialLink {
  name: string;
  href: string;
  icon: string;
  label: string;
}

export interface FooterData {
  logo: {
    src: string;
    alt: string;
    width: number;
    height: number;
  };
  navigationLinks: Array<{
    title: string;
    href: string;
  }>;
  socialLinks: SocialLink[];
  copyright: {
    company: string;
    text: string;
  };
}

// Dynamic Data Interfaces
export interface ProgramBenefit {
  icon: string;
  title: string;
}

export interface Program {
  title: string;
  subtitle: string;
  description: string;
  benefits: ProgramBenefit[];
  note: string;
  buttonText: string;
  theme: "primary" | "accent";
}

export interface ProgramsData {
  bscs: Program;
  bsis: Program;
}

export interface Testimonial {
  name: string;
  role: string;
  image: string;
  quote: string;
}

export interface FAQTopic {
  id: string;
  label: string;
}

export interface FAQQuestion {
  category: string;
  question: string;
  answer: string;
}

export interface FAQData {
  title: string;
  subtitle: string;
  topics: FAQTopic[];
  questions: FAQQuestion[];
}

// Utility types for data loading
export type StaticDataKey =
  | "hero"
  | "navigation"
  | "cict-section"
  | "cta-section"
  | "story-section"
  | "footer";

export type DynamicDataKey = "programs" | "testimonials" | "faqs";

// Data loader return types
export type StaticDataMap = {
  hero: HeroData;
  navigation: NavigationData;
  "cict-section": CICTSectionData;
  "cta-section": CTASectionData;
  "story-section": StorySectionData;
  footer: FooterData;
};

export type DynamicDataMap = {
  programs: ProgramsData;
  testimonials: Testimonial[];
  faqs: FAQData;
};
