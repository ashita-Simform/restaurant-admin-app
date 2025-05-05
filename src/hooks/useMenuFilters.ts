import { useState, useMemo } from 'react';
import { MenuItem } from '@/interface';

/**
 * Custom hook for filtering menu items based on search text and category.
 *
 * @param items - Array of menu items to filter. Each item should have `name`, `description`, and `category` properties.
 * @returns An object containing:
 * - `searchText`: Current search text used for filtering.
 * - `setSearchText`: Function to update the search text.
 * - `categoryFilter`: Current category filter.
 * - `setCategoryFilter`: Function to update the category filter.
 * - `filteredItems`: Filtered list of menu items based on the search text and category filter.
 */
export const useMenuFilters = (items: MenuItem[]) => {
  const [searchText, setSearchText] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchText.toLowerCase()) ||
        item.description.toLowerCase().includes(searchText.toLowerCase());
      const matchesCategory = categoryFilter
        ? item.category === categoryFilter
        : true;
      return matchesSearch && matchesCategory;
    });
  }, [items, searchText, categoryFilter]);

  return {
    searchText,
    setSearchText,
    categoryFilter,
    setCategoryFilter,
    filteredItems,
  };
};
