import { useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../store';
import { logout } from '@/store/features';

/**
 * Custom hook for navigation-related functionality.
 *
 * This hook provides utilities for navigating between routes, handling user logout,
 * and retrieving the current path in the application.
 *
 * @returns {Object} An object containing:
 * - `currentPath` (string): The current path of the application.
 * - `handleLogout` (function): Logs out the user and navigates to the login page.
 * - `navigateToPath` (function): Navigates to a specified path.
 */
export const useNavigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  /**
   * Logs out the user and navigates to the login page.
   */
  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  /**
   * Navigates to the specified path.
   *
   * @param {string} path - The path to navigate to.
   */
  const navigateToPath = (path: string) => {
    navigate(path);
  };

  return {
    currentPath: location.pathname,
    handleLogout,
    navigateToPath,
  };
};
