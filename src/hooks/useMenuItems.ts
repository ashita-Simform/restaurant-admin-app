/**
 * Custom hook for interacting with menu items in the Redux store.
 *
 * This hook provides utilities for selecting menu items, adding new items,
 * updating existing items, and deleting items.
 */

import { useAppDispatch, useAppSelector } from '@/store';
import {
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  selectMenuItems,
} from '@/store/features/menuSlice';
import { MenuItem } from '@/interface';

export const useMenuItems = () => {
  const dispatch = useAppDispatch();
  const menuItems = useAppSelector(selectMenuItems);

  /**
   * Adds a new menu item to the store.
   * @param {MenuItem} item - The menu item to add.
   */
  const addItem = (item: MenuItem) => {
    dispatch(addMenuItem(item));
  };

  /**
   * Updates an existing menu item in the store.
   * @param {MenuItem} item - The menu item to update.
   */
  const updateItem = (item: MenuItem) => {
    dispatch(updateMenuItem(item));
  };

  /**
   * Deletes a menu item from the store by its ID.
   * @param {string} id - The ID of the menu item to delete.
   */
  const deleteItem = (id: string) => {
    dispatch(deleteMenuItem(id));
  };

  return { menuItems, addItem, updateItem, deleteItem };
};
