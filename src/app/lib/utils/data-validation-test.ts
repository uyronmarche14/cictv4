/**
 * Test utility to validate all data files against their schemas
 * This can be run during build time to ensure data integrity
 */

import {
  loadStaticData,
  loadDynamicData,
  getStaticDataKeys,
  getDynamicDataKeys,
} from "./data-loader";
import { DataValidationError } from "./data-validator";

/**
 * Test all static data files
 */
export async function testStaticDataValidation(): Promise<{
  success: boolean;
  errors: Array<{ key: string; error: string }>;
}> {
  const keys = getStaticDataKeys();
  const errors: Array<{ key: string; error: string }> = [];

  for (const key of keys) {
    try {
      await loadStaticData(key, { validate: true });
      console.log(`✅ Static data "${key}" validation passed`);
    } catch (error) {
      const errorMessage =
        error instanceof DataValidationError
          ? error.getSummary()
          : error instanceof Error
            ? error.message
            : String(error);

      errors.push({ key, error: errorMessage });
      console.error(`❌ Static data "${key}" validation failed:`, errorMessage);
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

/**
 * Test all dynamic data files
 */
export async function testDynamicDataValidation(): Promise<{
  success: boolean;
  errors: Array<{ key: string; error: string }>;
}> {
  const keys = getDynamicDataKeys();
  const errors: Array<{ key: string; error: string }> = [];

  for (const key of keys) {
    try {
      await loadDynamicData(key, { validate: true });
      console.log(`✅ Dynamic data "${key}" validation passed`);
    } catch (error) {
      const errorMessage =
        error instanceof DataValidationError
          ? error.getSummary()
          : error instanceof Error
            ? error.message
            : String(error);

      errors.push({ key, error: errorMessage });
      console.error(
        `❌ Dynamic data "${key}" validation failed:`,
        errorMessage
      );
    }
  }

  return {
    success: errors.length === 0,
    errors,
  };
}

/**
 * Test all data files
 */
export async function testAllDataValidation(): Promise<{
  success: boolean;
  staticErrors: Array<{ key: string; error: string }>;
  dynamicErrors: Array<{ key: string; error: string }>;
}> {
  console.log("🧪 Testing data validation...\n");

  console.log("Testing static data:");
  const staticResult = await testStaticDataValidation();

  console.log("\nTesting dynamic data:");
  const dynamicResult = await testDynamicDataValidation();

  const success = staticResult.success && dynamicResult.success;

  console.log(
    `\n${success ? "✅" : "❌"} Data validation ${success ? "passed" : "failed"}`
  );

  if (!success) {
    console.log("\nErrors found:");
    [...staticResult.errors, ...dynamicResult.errors].forEach(
      ({ key, error }) => {
        console.log(`  - ${key}: ${error}`);
      }
    );
  }

  return {
    success,
    staticErrors: staticResult.errors,
    dynamicErrors: dynamicResult.errors,
  };
}

/**
 * Run validation tests if this file is executed directly
 */
if (typeof window === "undefined" && require.main === module) {
  testAllDataValidation()
    .then((result) => {
      process.exit(result.success ? 0 : 1);
    })
    .catch((error) => {
      console.error("Fatal error during validation:", error);
      process.exit(1);
    });
}
