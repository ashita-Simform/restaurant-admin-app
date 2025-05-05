import { useState } from 'react';

/**
 * Custom hook for sanitizing input values to prevent potential security vulnerabilities.
 *
 * @param {string} initialValue - The initial value of the input.
 * @returns {{
 *   sanitizedValue: string,
 *   handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void,
 *   isValid: boolean
 * }} An object containing the sanitized value, a change handler, and a validity flag.
 */
export const useSanitizedInput = (initialValue: string) => {
  const [sanitizedValue, setSanitizedValue] = useState(initialValue);
  const [isValid, setIsValid] = useState(true);

  const disallowedCharacters = /[<>`"'&;{}()\\]/g;
  const sqlInjectionPatterns =
    /(SELECT\s+\*|UNION\s+SELECT|WHERE\s+1=1|DROP\s+TABLE|INSERT\s+INTO|DELETE\s+FROM)/i;

  /**
   * Sanitizes the input value by checking for disallowed characters and SQL injection patterns.
   *
   * @param {string} value - The input value to sanitize.
   * @returns {boolean} True if the input is valid, false otherwise.
   */
  const sanitize = (value: string): boolean => {
    if (disallowedCharacters.test(value) || sqlInjectionPatterns.test(value)) {
      setIsValid(false);
      return false;
    }
    setIsValid(true);
    return true;
  };

  /**
   * Handles the change event for the input field.
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - The change event.
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (sanitize(value)) {
      setSanitizedValue(value.trim());
    } else {
      setSanitizedValue('');
    }
  };

  return { sanitizedValue, handleChange, isValid };
};
