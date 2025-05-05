/**
 * Represents a generic API error.
 * This type is used to standardize error responses from the API.
 */
export type ApiError = {
  /**
   * The error code returned by the API.
   */
  code: number;

  /**
   * A human-readable message describing the error.
   */
  message: string;

  /**
   * Additional details about the error, if available.
   */
  details?: Record<string, unknown>;
};

/**
 * Enum representing the various loading states.
 * Used to track the status of asynchronous operations.
 */
export const enum LoadingState {
  /**
   * The initial state, no operation is in progress.
   */
  Idle = 'idle',

  /**
   * Indicates that an operation is currently in progress.
   */
  Loading = 'loading',

  /**
   * Indicates that the operation completed successfully.
   */
  Succeeded = 'succeeded',

  /**
   * Indicates that the operation failed.
   */
  Failed = 'failed',
}

/**
 * Base interface for the state of all slices.
 * Provides a common structure for managing loading and error states.
 */
export interface BaseState {
  /**
   * The current loading state of the slice.
   */
  loading: LoadingState;

  /**
   * The error object, if an error occurred.
   */
  error: ApiError | null;
}

/**
 * Template literal type for validation messages.
 * Used to define standardized validation error messages for fields.
 *
 * @template T - The field name to validate.
 */
export type ValidationMessage<T extends string> =
  | `${T} is required`
  | `Invalid ${T}`
  | `${T} already exists`;
