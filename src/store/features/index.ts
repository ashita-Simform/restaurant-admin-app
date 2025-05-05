import authReducer, { login, logout, checkAuth } from './authSlice';
import menuReducer, {
  setLoading,
  setError,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  loadMenuItems,
} from './menuSlice';
/**
 * Exports various reducers and actions for the application's state management.
 *
 * @module store/features
 * @function authReducer - Reducer for managing authentication state.
 * @function login - Action for logging in a user.
 * @function logout - Action for logging out a user.
 * @function checkAuth - Action for checking the authentication status.
 * @function menuReducer - Reducer for managing menu-related state.
 * @function setError - Action for setting an error state.
 * @function setLoading - Action for setting a loading state.
 * @function addMenuItem - Action for adding a new menu item.
 * @function updateMenuItem - Action for updating an existing menu item.
 * @function deleteMenuItem - Action for deleting a menu item.
 * @function loadMenuItems - Action for loading menu items into the state.
 */
export {
  authReducer,
  login,
  logout,
  checkAuth,
  menuReducer,
  setError,
  setLoading,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem,
  loadMenuItems,
};
