import { z } from "zod";
import type {
  StaticDataKey,
  DynamicDataKey,
  StaticDataMap,
  DynamicDataMap,
} from "@/app/types/data";
import { staticDataSchemas } from "@/app/lib/schemas/static-data";
import {
  dynamicDataSchemas,
  validateFAQConsistency,
} from "@/app/lib/schemas/dynamic-data";

/**
 * Validation error class for data validation failures
 */
export class DataValidationError extends Error {
  constructor(
    public dataKey: string,
    public validationErrors: z.ZodError,
    message?: string
  ) {
    super(message || `Validation failed for ${dataKey}`);
    this.name = "DataValidationError";
  }

  /**
   * Get formatted error messages
   */
  getFormattedErrors(): string[] {
    return this.validationErrors.issues.map(
      (error) => `${error.path.join(".")}: ${error.message}`
    );
  }

  /**
   * Get error summary
   */
  getSummary(): string {
    const errors = this.getFormattedErrors();
    return `${this.dataKey} validation failed:\n${errors.join("\n")}`;
  }
}

/**
 * Validate static data against its schema
 */
export function validateStaticData<K extends StaticDataKey>(
  key: K,
  data: unknown
): StaticDataMap[K] {
  try {
    const schema = staticDataSchemas[key];
    if (!schema) {
      throw new Error(`No schema found for static data key: ${key}`);
    }

    return schema.parse(data) as StaticDataMap[K];
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new DataValidationError(key, error);
    }
    throw error;
  }
}

/**
 * Validate dynamic data against its schema
 */
export function validateDynamicData<K extends DynamicDataKey>(
  key: K,
  data: unknown
): DynamicDataMap[K] {
  try {
    const schema = dynamicDataSchemas[key];
    if (!schema) {
      throw new Error(`No schema found for dynamic data key: ${key}`);
    }

    const validatedData = schema.parse(data) as DynamicDataMap[K];

    // Additional validation for FAQ data consistency
    if (key === "faqs") {
      validateFAQConsistency(validatedData as DynamicDataMap["faqs"]);
    }

    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new DataValidationError(key, error);
    }
    throw error;
  }
}

/**
 * Safe validation that returns a result object instead of throwing
 */
export function safeValidateStaticData<K extends StaticDataKey>(
  key: K,
  data: unknown
):
  | { success: true; data: StaticDataMap[K] }
  | { success: false; error: DataValidationError } {
  try {
    const validatedData = validateStaticData(key, data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof DataValidationError) {
      return { success: false, error };
    }
    return {
      success: false,
      error: new DataValidationError(
        key,
        new z.ZodError([]),
        error instanceof Error ? error.message : "Unknown validation error"
      ),
    };
  }
}

/**
 * Safe validation that returns a result object instead of throwing
 */
export function safeValidateDynamicData<K extends DynamicDataKey>(
  key: K,
  data: unknown
):
  | { success: true; data: DynamicDataMap[K] }
  | { success: false; error: DataValidationError } {
  try {
    const validatedData = validateDynamicData(key, data);
    return { success: true, data: validatedData };
  } catch (error) {
    if (error instanceof DataValidationError) {
      return { success: false, error };
    }
    return {
      success: false,
      error: new DataValidationError(
        key,
        new z.ZodError([]),
        error instanceof Error ? error.message : "Unknown validation error"
      ),
    };
  }
}

/**
 * Validate multiple static data items
 */
export function validateMultipleStaticData<K extends StaticDataKey>(
  items: Array<{ key: K; data: unknown }>
): { [Key in K]: StaticDataMap[Key] } {
  const results = {} as { [Key in K]: StaticDataMap[Key] };
  const errors: DataValidationError[] = [];

  for (const { key, data } of items) {
    try {
      results[key] = validateStaticData(key, data);
    } catch (error) {
      if (error instanceof DataValidationError) {
        errors.push(error);
      } else {
        errors.push(
          new DataValidationError(
            key,
            new z.ZodError([]),
            error instanceof Error ? error.message : "Unknown error"
          )
        );
      }
    }
  }

  if (errors.length > 0) {
    const combinedMessage = errors.map((e) => e.getSummary()).join("\n\n");
    throw new Error(`Multiple validation errors:\n\n${combinedMessage}`);
  }

  return results;
}

/**
 * Validate multiple dynamic data items
 */
export function validateMultipleDynamicData<K extends DynamicDataKey>(
  items: Array<{ key: K; data: unknown }>
): { [Key in K]: DynamicDataMap[Key] } {
  const results = {} as { [Key in K]: DynamicDataMap[Key] };
  const errors: DataValidationError[] = [];

  for (const { key, data } of items) {
    try {
      results[key] = validateDynamicData(key, data);
    } catch (error) {
      if (error instanceof DataValidationError) {
        errors.push(error);
      } else {
        errors.push(
          new DataValidationError(
            key,
            new z.ZodError([]),
            error instanceof Error ? error.message : "Unknown error"
          )
        );
      }
    }
  }

  if (errors.length > 0) {
    const combinedMessage = errors.map((e) => e.getSummary()).join("\n\n");
    throw new Error(`Multiple validation errors:\n\n${combinedMessage}`);
  }

  return results;
}

/**
 * Create a type-safe validator function for a specific data key
 */
export function createStaticDataValidator<K extends StaticDataKey>(key: K) {
  return (data: unknown): StaticDataMap[K] => validateStaticData(key, data);
}

/**
 * Create a type-safe validator function for a specific data key
 */
export function createDynamicDataValidator<K extends DynamicDataKey>(key: K) {
  return (data: unknown): DynamicDataMap[K] => validateDynamicData(key, data);
}
