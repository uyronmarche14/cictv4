// Re-export all data loading utilities
export * from "../utils/data-loader";
export * from "../utils/icon-mapper";
export * from "../utils/data-validator";
export * from "../utils/error-handler";

// Re-export all types
export * from "../../types/data";

// Re-export all schemas
export * from "../schemas";

// Static data exports
export { heroData } from "./static/hero";
export { navigationData } from "./static/navigation";
export { cictSectionData } from "./static/cict-section";
export { ctaSectionData } from "./static/cta-section";
export { storySectionData } from "./static/story-section";
export { storyTabsData } from "./static/story-tabs";
export { aboutSectionData } from "./static/about-section";
export { newsSectionData } from "./static/news-section";
export { offerSectionData } from "./static/offer-section";
export { footerData } from "./static/footer";

// Dynamic data can be imported directly from JSON files when needed
// Example: import programsData from "./dynamic/programs.json";
// Example: import testimonialsData from "./dynamic/testimonials.json";
// Example: import faqsData from "./dynamic/faqs.json";
