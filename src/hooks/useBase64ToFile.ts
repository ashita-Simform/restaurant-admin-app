import { useState, useEffect } from 'react';

/**
 * Custom hook to convert a base64 string to a File object.
 *
 * @param {string | undefined} base64 - The base64 string to convert. It should include the data URI scheme.
 * @param {string} filename - The name of the file to create.
 * @param {string} mimeType - The MIME type of the file (e.g., 'image/png', 'application/pdf').
 * @returns {File | undefined} - The generated File object or undefined if the conversion fails.
 */
export const useBase64ToFile = (
  base64: string | undefined,
  filename: string,
  mimeType: string
): File | undefined => {
  const [file, setFile] = useState<File | undefined>(undefined);

  useEffect(() => {
    if (base64 && typeof base64 === 'string') {
      try {
        const base64String = base64.split(',')[1];
        if (base64String) {
          const byteCharacters = atob(base64String);
          const byteArrays = [];
          for (let offset = 0; offset < byteCharacters.length; offset++) {
            const byte = byteCharacters.charCodeAt(offset);
            byteArrays.push(byte);
          }
          const blob = new Blob([new Uint8Array(byteArrays)], {
            type: mimeType,
          });
          setFile(new File([blob], filename, { type: mimeType }));
        }
      } catch (error) {
        console.error('Error converting base64 to file', error);
      }
    }
  }, [base64, filename, mimeType]);

  return file;
};
