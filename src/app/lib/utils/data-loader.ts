import type {
  StaticDataKey,
  DynamicDataKey,
  StaticDataMap,
  DynamicDataMap,
} from "@/app/types/data";
import {
  validateStaticData,
  validateDynamicData,
  DataValidationError,
} from "./data-validator";

/**
 * Load static data from TypeScript files with validation
 * Static data is type-safe and provides IntelliSense
 */
export async function loadStaticData<K extends StaticDataKey>(
  key: K,
  options: { validate?: boolean } = { validate: true }
): Promise<StaticDataMap[K]> {
  try {
    let rawData: unknown;

    switch (key) {
      case "hero": {
        const { heroData } = await import("@/app/lib/data/static/hero");
        rawData = heroData;
        break;
      }
      case "navigation": {
        const { navigationData } = await import(
          "@/app/lib/data/static/navigation"
        );
        rawData = navigationData;
        break;
      }
      case "cict-section": {
        const { cictSectionData } = await import(
          "@/app/lib/data/static/cict-section"
        );
        rawData = cictSectionData;
        break;
      }
      case "cta-section": {
        const { ctaSectionData } = await import(
          "@/app/lib/data/static/cta-section"
        );
        rawData = ctaSectionData;
        break;
      }
      case "story-section": {
        const { storySectionData } = await import(
          "@/app/lib/data/static/story-section"
        );
        rawData = storySectionData;
        break;
      }
      case "footer": {
        const { footerData } = await import("@/app/lib/data/static/footer");
        rawData = footerData;
        break;
      }
      default:
        throw new Error(`Unknown static data key: ${key}`);
    }

    // Validate data if requested
    if (options.validate) {
      return validateStaticData(key, rawData);
    }

    return rawData as StaticDataMap[K];
  } catch (error) {
    if (error instanceof DataValidationError) {
      console.error(
        `Validation failed for static data "${key}":`,
        error.getSummary()
      );
      throw error;
    }
    console.error(`Failed to load static data for key "${key}":`, error);
    throw new Error(`Failed to load static data: ${key}`);
  }
}

/**
 * Load dynamic data from JSON files with validation
 * Dynamic data is suitable for CMS integration and frequent updates
 */
export async function loadDynamicData<K extends DynamicDataKey>(
  key: K,
  options: { validate?: boolean } = { validate: true }
): Promise<DynamicDataMap[K]> {
  try {
    let rawData: unknown;

    switch (key) {
      case "programs": {
        const data = await import("@/app/lib/data/dynamic/programs.json");
        rawData = data.default;
        break;
      }
      case "testimonials": {
        const data = await import("@/app/lib/data/dynamic/testimonials.json");
        rawData = data.default;
        break;
      }
      case "faqs": {
        const data = await import("@/app/lib/data/dynamic/faqs.json");
        rawData = data.default;
        break;
      }
      default:
        throw new Error(`Unknown dynamic data key: ${key}`);
    }

    // Validate data if requested
    if (options.validate) {
      return validateDynamicData(key, rawData);
    }

    return rawData as DynamicDataMap[K];
  } catch (error) {
    if (error instanceof DataValidationError) {
      console.error(
        `Validation failed for dynamic data "${key}":`,
        error.getSummary()
      );
      throw error;
    }
    console.error(`Failed to load dynamic data for key "${key}":`, error);
    throw new Error(`Failed to load dynamic data: ${key}`);
  }
}

/**
 * Preload multiple static data items
 */
export async function preloadStaticData<K extends StaticDataKey>(
  keys: K[],
  options: { validate?: boolean } = { validate: true }
): Promise<{ [Key in K]: StaticDataMap[Key] }> {
  const promises = keys.map(async (key) => ({
    key,
    data: await loadStaticData(key, options),
  }));

  const results = await Promise.all(promises);

  return results.reduce(
    (acc, { key, data }) => {
      acc[key] = data;
      return acc;
    },
    {} as { [Key in K]: StaticDataMap[Key] }
  );
}

/**
 * Preload multiple dynamic data items
 */
export async function preloadDynamicData<K extends DynamicDataKey>(
  keys: K[],
  options: { validate?: boolean } = { validate: true }
): Promise<{ [Key in K]: DynamicDataMap[Key] }> {
  const promises = keys.map(async (key) => ({
    key,
    data: await loadDynamicData(key, options),
  }));

  const results = await Promise.all(promises);

  return results.reduce(
    (acc, { key, data }) => {
      acc[key] = data;
      return acc;
    },
    {} as { [Key in K]: DynamicDataMap[Key] }
  );
}

/**
 * Get all available static data keys
 */
export function getStaticDataKeys(): StaticDataKey[] {
  return [
    "hero",
    "navigation",
    "cict-section",
    "cta-section",
    "story-section",
    "footer",
  ];
}

/**
 * Get all available dynamic data keys
 */
export function getDynamicDataKeys(): DynamicDataKey[] {
  return ["programs", "testimonials", "faqs"];
}
