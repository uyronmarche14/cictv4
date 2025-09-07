// Re-export all schemas
export * from "./static-data";
export * from "./dynamic-data";

// Re-export validation utilities
export * from "../utils/data-validator";
export * from "../utils/error-handler";

// Schema maps for easy access
export { staticDataSchemas } from "./static-data";
export { dynamicDataSchemas } from "./dynamic-data";
