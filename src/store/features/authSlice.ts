import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  AuthState,
  Permission,
  UserProfile,
  UserRole,
  LoadingState,
} from '@/interface';
import { v4 as uuidv4 } from 'uuid';

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  token: null,
  loading: LoadingState.Idle,
  error: null,
};

const createDefaultUser = (username: string): UserProfile => ({
  id: uuidv4(),
  username,
  email: `${username}@example.com`,
  role: UserRole.Admin,
  permissions: [
    Permission.CreateMenu,
    Permission.UpdateMenu,
    Permission.DeleteMenu,
    Permission.ViewMenu,
    Permission.ManageUsers,
  ],
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
});

/**
 * A Redux slice for managing authentication state.
 *
 * This slice includes actions and reducers for handling user login, logout,
 * and authentication status checks. It also interacts with `localStorage`
 * to persist user authentication data.
 */
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    /**
     * Logs in a user by validating the provided username and password.
     *
     * @param state - The current authentication state.
     * @param action - The action containing the username and password payload.
     *
     * If the username and password match the predefined credentials, the user
     * is authenticated, and their information is stored in `localStorage`.
     * Otherwise, the authentication error is cleared.
     */
    login: (
      state,
      action: PayloadAction<{ username: string; password: string }>
    ) => {
      if (
        action.payload.username === 'admin' &&
        action.payload.password === 'admin123'
      ) {
        state.isAuthenticated = true;
        state.user = createDefaultUser(action.payload.username);
        state.error = null;
        localStorage.setItem('user', JSON.stringify(state.user));
      } else {
        state.error = null;
      }
    },

    /**
     * Logs out the current user.
     *
     * @param state - The current authentication state.
     *
     * This action clears the user's authentication state and removes their
     * information from `localStorage`.
     */
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      localStorage.removeItem('user');
    },

    /**
     * Checks the user's authentication status.
     *
     * @param state - The current authentication state.
     *
     * This action retrieves the user's information from `localStorage` (if available)
     * and updates the authentication state accordingly.
     */
    checkAuth: (state) => {
      const user = localStorage.getItem('user');
      if (user) {
        state.isAuthenticated = true;
        state.user = JSON.parse(user);
      }
    },
  },
});

export const { login, logout, checkAuth } = authSlice.actions;

export default authSlice.reducer;
