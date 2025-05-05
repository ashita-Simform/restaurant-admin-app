import { useEffect } from 'react';
import * as Sentry from '@sentry/react';

/**
 * Custom hook to capture exceptions using Sentry.
 *
 * @param {Error} error - The error object to be captured by Sentry.
 * @returns {void} This hook does not return any value.
 */
const useSentryError = (error: Error): void => {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);
};

export default useSentryError;
