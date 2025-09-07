import { DataValidationError } from "./data-validator";

/**
 * Error handling configuration
 */
export interface ErrorHandlingConfig {
  logErrors?: boolean;
  throwOnValidationError?: boolean;
  fallbackData?: unknown;
  onError?: (error: Error, context: string) => void;
}

/**
 * Default error handling configuration
 */
export const defaultErrorConfig: ErrorHandlingConfig = {
  logErrors: true,
  throwOnValidationError: true,
  fallbackData: null,
  onError: undefined,
};

/**
 * Handle data loading errors with configurable behavior
 */
export function handleDataError(
  error: unknown,
  context: string,
  config: ErrorHandlingConfig = defaultErrorConfig
): never | unknown {
  const finalConfig = { ...defaultErrorConfig, ...config };

  // Log error if configured
  if (finalConfig.logErrors) {
    if (error instanceof DataValidationError) {
      console.error(`Data validation error in ${context}:`, error.getSummary());
    } else if (error instanceof Error) {
      console.error(`Error in ${context}:`, error.message);
    } else {
      console.error(`Unknown error in ${context}:`, error);
    }
  }

  // Call custom error handler if provided
  if (finalConfig.onError && error instanceof Error) {
    finalConfig.onError(error, context);
  }

  // Handle validation errors
  if (error instanceof DataValidationError) {
    if (finalConfig.throwOnValidationError) {
      throw error;
    } else {
      return finalConfig.fallbackData;
    }
  }

  // Handle other errors
  if (error instanceof Error) {
    throw error;
  }

  // Handle unknown errors
  throw new Error(`Unknown error in ${context}: ${String(error)}`);
}

/**
 * Create a safe data loader that handles errors gracefully
 */
export function createSafeDataLoader<T>(
  loader: () => Promise<T>,
  context: string,
  config?: ErrorHandlingConfig
) {
  return async (): Promise<T | null> => {
    try {
      return await loader();
    } catch (error) {
      try {
        return handleDataError(error, context, config) as T;
      } catch (handledError) {
        // If error handling also throws, return null as ultimate fallback
        return null;
      }
    }
  };
}

/**
 * Wrap a data loading function with error handling
 */
export function withErrorHandling<TArgs extends unknown[], TReturn>(
  fn: (...args: TArgs) => Promise<TReturn>,
  context: string,
  config?: ErrorHandlingConfig
) {
  return async (...args: TArgs): Promise<TReturn | null> => {
    try {
      return await fn(...args);
    } catch (error) {
      try {
        return handleDataError(error, context, config) as TReturn;
      } catch (handledError) {
        return null;
      }
    }
  };
}

/**
 * Create error boundaries for React components
 */
export class DataErrorBoundary extends Error {
  constructor(
    public originalError: Error,
    public context: string,
    public fallbackData?: unknown
  ) {
    super(`Data error in ${context}: ${originalError.message}`);
    this.name = "DataErrorBoundary";
  }
}

/**
 * Wrap data loading for React components with error boundaries
 */
export function wrapForReact<T>(
  loader: () => Promise<T>,
  context: string,
  fallbackData?: T
): () => Promise<T> {
  return async () => {
    try {
      return await loader();
    } catch (error) {
      if (error instanceof Error) {
        throw new DataErrorBoundary(error, context, fallbackData);
      }
      throw new DataErrorBoundary(
        new Error(String(error)),
        context,
        fallbackData
      );
    }
  };
}
