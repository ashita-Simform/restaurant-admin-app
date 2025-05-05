import { createPrice, MutableMenuItem } from '@/interface';
/**
 * Utility object for managing menu items in local storage.
 *
 * This utility provides methods to load and save menu items, ensuring proper parsing
 * and formatting of the data. It handles errors gracefully and logs them to the console.
 */
export const storage = {
  /**
   * Loads menu items from local storage.
   * @returns {MutableMenuItem[]} An array of menu items.
   */
  loadMenuItems: (): MutableMenuItem[] => {
    try {
      const items = localStorage.getItem('menuItems');
      if (!items) return [];

      const parsedItems = JSON.parse(items);
      return parsedItems.map((item: MutableMenuItem) => ({
        id: item.id,
        name: item.name,
        description: item.description,
        price: createPrice(item.price),
        category: item.category,
        ingredients: item.ingredients || [],
        allergens: item.allergens || [],
        available: item.available ?? true,
        createdAt: item.createdAt || new Date().toISOString(),
        updatedAt: item.updatedAt || new Date().toISOString(),
        image: item.image,
        nutritionalInfo: item.nutritionalInfo,
      }));
    } catch (error) {
      console.error('Error loading menu items:', error);
      return [];
    }
  },
  /**
   * Saves menu items to local storage.
   * @param {MutableMenuItem[]} items - An array of menu items to save.
   */
  saveMenuItems: (items: MutableMenuItem[]) => {
    try {
      localStorage.setItem('menuItems', JSON.stringify(items));
    } catch (error) {
      console.error('Error saving menu items:', error);
    }
  },
};
