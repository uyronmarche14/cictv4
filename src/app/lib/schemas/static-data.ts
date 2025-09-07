import { z } from "zod";

// Hero Section Schema
export const HeroDataSchema = z.object({
  greeting: z.string().min(1, "Greeting is required"),
  mainTitle: z.string().min(1, "Main title is required"),
  location: z.string().min(1, "Location is required"),
  callToAction: z.string().min(1, "Call to action is required"),
  scrollTarget: z.string().optional(),
});

// Navigation Schema
export const NavigationLinkSchema = z.object({
  title: z.string().min(1, "Navigation title is required"),
  href: z.string().min(1, "Navigation href is required"),
});

export const NavigationDataSchema = z.object({
  links: z
    .array(NavigationLinkSchema)
    .min(1, "At least one navigation link is required"),
  logo: z.object({
    src: z.string().min(1, "Logo src is required"),
    alt: z.string().min(1, "Logo alt text is required"),
    width: z.number().positive("Logo width must be positive"),
    height: z.number().positive("Logo height must be positive"),
  }),
});

// CICT Section Schema
export const CICTFeatureSchema = z.object({
  title: z.string().min(1, "Feature title is required"),
  icon: z.string().min(1, "Feature icon is required"),
  description: z.string().min(1, "Feature description is required"),
});

export const CICTSectionDataSchema = z.object({
  badge: z.string().min(1, "Badge text is required"),
  title: z.string().min(1, "Section title is required"),
  subtitle: z.string().min(1, "Section subtitle is required"),
  description: z.string().min(1, "Section description is required"),
  logo: z.object({
    src: z.string().min(1, "Logo src is required"),
    alt: z.string().min(1, "Logo alt text is required"),
    width: z.number().positive("Logo width must be positive"),
    height: z.number().positive("Logo height must be positive"),
  }),
  features: z
    .array(CICTFeatureSchema)
    .min(1, "At least one feature is required"),
});

// CTA Section Schema
export const CTASectionDataSchema = z.object({
  title: z.string().min(1, "Title is required"),
  highlightedText: z.string().min(1, "Highlighted text is required"),
  subtitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
  button: z.object({
    text: z.string().min(1, "Button text is required"),
    icon: z.string().min(1, "Button icon is required"),
  }),
  badge: z.object({
    text: z.string().min(1, "Badge text is required"),
    icon: z.string(), // Icon can be empty for badges
  }),
});

// Story Section Schema
export const StorySectionDataSchema = z.object({
  badge: z.string().min(1, "Badge text is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

// Footer Schema
export const SocialLinkSchema = z.object({
  name: z.string().min(1, "Social link name is required"),
  href: z.string().url("Social link href must be a valid URL or anchor"),
  icon: z.string().min(1, "Social link icon is required"),
  label: z.string().min(1, "Social link label is required"),
});

export const FooterDataSchema = z.object({
  logo: z.object({
    src: z.string().min(1, "Logo src is required"),
    alt: z.string().min(1, "Logo alt text is required"),
    width: z.number().positive("Logo width must be positive"),
    height: z.number().positive("Logo height must be positive"),
  }),
  navigationLinks: z
    .array(
      z.object({
        title: z.string().min(1, "Navigation title is required"),
        href: z.string().min(1, "Navigation href is required"),
      })
    )
    .min(1, "At least one navigation link is required"),
  socialLinks: z
    .array(SocialLinkSchema)
    .min(1, "At least one social link is required"),
  copyright: z.object({
    company: z.string().min(1, "Company name is required"),
    text: z.string().min(1, "Copyright text is required"),
  }),
});

// Combined static data schemas map
export const staticDataSchemas = {
  hero: HeroDataSchema,
  navigation: NavigationDataSchema,
  "cict-section": CICTSectionDataSchema,
  "cta-section": CTASectionDataSchema,
  "story-section": StorySectionDataSchema,
  footer: FooterDataSchema,
} as const;
