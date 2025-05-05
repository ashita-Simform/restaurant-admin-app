import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import { checkAuth, loadMenuItems } from '@/store/features';
import dummyData from '@/assets/DummyData.json';
import { storage } from '@/utils/storage';
import { Allergen, Price } from '@/interface';

/**
 * Custom hook to initialize the application state.
 *
 * This hook performs the following:
 * - Dispatches the `checkAuth` action to verify the user's authentication status.
 * - If the user is authenticated, it dispatches the `loadMenuItems` action to load menu items.
 *
 * @returns {void} This hook does not return any value.
 */
export const useAppInit = (): void => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAppSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadMenuItems());
    }
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    const existingItems = storage.loadMenuItems();
    const newItems = dummyData.filter(
      (dummyItem) => !existingItems.some((item) => item.id === dummyItem.id)
    );

    if (newItems.length > 0) {
      const updatedItems = [
        ...existingItems,
        ...newItems.map((item) => ({
          ...item,
          price: item.price as Price, // Ensure price matches the expected type
          category: item.category as
            | 'main_courses'
            | 'appetizers'
            | 'desserts'
            | 'beverages'
            | 'sides', // Cast category to expected type
          allergens: item.allergens.map((allergen) => allergen as Allergen), // Cast allergens to expected type
        })),
      ];
      storage.saveMenuItems(updatedItems);
    }
  }, []);
};
