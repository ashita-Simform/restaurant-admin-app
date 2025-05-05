import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  MenuItem,
  CategoryEnum,
  MutableMenuState,
  MutableMenuItem,
  ApiError,
  LoadingState,
  RootState,
} from '@/interface';
import { storage } from '../../utils/storage';

const initialState: MutableMenuState = {
  items: storage.loadMenuItems(),
  categories: [
    CategoryEnum.Appetizers,
    CategoryEnum.MainCourses,
    CategoryEnum.Desserts,
    CategoryEnum.Beverages,
    CategoryEnum.Sides,
  ],
  selectedCategory: null,
  filters: {},
  loading: LoadingState.Idle,
  error: null,
};

const toMutableMenuItem = (item: MenuItem): MutableMenuItem => ({
  ...item,
  ingredients: [...item.ingredients],
  allergens: [...item.allergens],
});

/**
 * A Redux slice for managing the menu state in the application.
 *
 * This slice includes actions and reducers for handling menu-related operations,
 * such as loading, adding, updating, and deleting menu items, as well as managing
 * loading and error states.
 *
 * @module menuSlice
 */
const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    /**
     * Sets the loading state of the menu.
     *
     * @param state - The current state of the menu.
     * @param action - The action containing the new loading state.
     */

    setLoading: (state, action: PayloadAction<LoadingState>) => {
      state.loading = action.payload;
    },
    /**
     * Sets the error state of the menu.
     *
     * @param state - The current state of the menu.
     * @param action - The action containing the error or null to clear the error.
     */
    setError: (state, action: PayloadAction<ApiError | null>) => {
      state.error = action.payload;
    },
    /**
     * Adds a new menu item to the menu.
     *
     * @param state - The current state of the menu.
     * @param action - The action containing the new menu item.
     */
    addMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const mutableItem = toMutableMenuItem(action.payload);
      state.items.push(mutableItem);
      storage.saveMenuItems(state.items);
    },
    /**
     * Updates an existing menu item in the menu.
     *
     * @param state - The current state of the menu.
     * @param action - The action containing the updated menu item.
     */
    updateMenuItem: (state, action: PayloadAction<MenuItem>) => {
      const mutableItem = toMutableMenuItem(action.payload);
      const index = state.items.findIndex(
        (item: MutableMenuItem) => item.id === action.payload.id
      );
      if (index !== -1) {
        state.items[index] = mutableItem;
        storage.saveMenuItems(state.items);
      }
    },
    /**
     * Deletes a menu item from the menu by its ID.
     *
     * @param state - The current state of the menu.
     * @param action - The action containing the ID of the menu item to delete.
     */
    deleteMenuItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(
        (item: MutableMenuItem) => item.id !== action.payload
      );
      storage.saveMenuItems(state.items);
    },
    /**
     * Loads menu items from persistent storage into the state.
     *
     * @param state - The current state of the menu.
     */
    loadMenuItems: (state) => {
      state.items = storage.loadMenuItems();
    },
  },
});

export const {
  setLoading,
  setError,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  loadMenuItems,
} = menuSlice.actions;

export const selectMenuItems = (state: RootState): ReadonlyArray<MenuItem> =>
  Object.freeze([...state.menu.items]);

export const selectMenuItem = (
  state: RootState,
  id: string
): MenuItem | undefined => {
  const item = state.menu.items.find((item: MenuItem) => item.id === id);
  return item ? (Object.freeze({ ...item }) as MenuItem) : undefined;
};

export default menuSlice.reducer;
