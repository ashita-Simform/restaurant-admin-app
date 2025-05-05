import { useEffect, useState } from 'react';

/**
 * Custom hook for managing pagination of a list of items.
 *
 * @template T - The type of items in the list.
 *
 * @param {T[]} items - The list of items to paginate.
 * @param {number} [pageSize=6] - The number of items per page.
 *
 * @returns {Object} An object containing:
 * - `currentPage` (number): The current page number.
 * - `setCurrentPage` (function): Function to update the current page.
 * - `pageSize` (number): The number of items per page.
 * - `paginatedItems` (T[]): The items for the current page.
 * - `totalItems` (number): The total number of items.
 */
export const usePagination = <T>(items: T[], pageSize: number = 6) => {
  const [currentPage, setCurrentPage] = useState(1);

  const paginatedItems = items.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [items]);

  return {
    currentPage,
    setCurrentPage,
    pageSize,
    paginatedItems,
    totalItems: items.length,
  };
};
