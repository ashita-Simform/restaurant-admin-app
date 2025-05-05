import { BaseState } from './common';

/**
 * Enum representing user roles for role-based access control.
 * @enum {string}
 */
export enum UserRole {
  Admin = 'admin',
  Staff = 'staff',
  Guest = 'guest',
}

/**
 * Enum representing user permissions.
 * @enum {string}
 */
export const enum Permission {
  CreateMenu = 'create:menu',
  UpdateMenu = 'update:menu',
  DeleteMenu = 'delete:menu',
  ViewMenu = 'view:menu',
  ManageUsers = 'manage:users',
}

/**
 * Interface representing a user profile.
 * @interface
 */
export interface UserProfile {
  /**
   * Unique identifier for the user.
   * @type {string}
   */
  id: string;

  /**
   * Username of the user.
   * @type {string}
   */
  username: string;

  /**
   * Email address of the user.
   * @type {string}
   */
  email: string;

  /**
   * Role assigned to the user.
   * @type {UserRole}
   */
  role: UserRole;

  /**
   * List of permissions assigned to the user.
   * @type {Permission[]}
   */
  permissions: Permission[];

  /**
   * Timestamp when the user was created.
   * @type {string}
   */
  createdAt: string;

  /**
   * Timestamp when the user was last updated.
   * @type {string}
   */
  updatedAt: string;
}

/**
 * Interface representing the authentication state.
 * @interface
 * @extends {BaseState}
 */
export interface AuthState extends BaseState {
  /**
   * Indicates whether the user is authenticated.
   * @type {boolean}
   */
  isAuthenticated: boolean;

  /**
   * The authenticated user's profile or null if not authenticated.
   * @type {UserProfile | null}
   */
  user: UserProfile | null;

  /**
   * Authentication token or null if not authenticated.
   * @type {string | null}
   */
  token: string | null;
}
