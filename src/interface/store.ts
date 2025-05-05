import { MenuState } from './menu';
import { AuthState } from './auth';

/**
 * Represents the root state of the application.
 */
export interface RootState {
  /**
   * The state related to the menu.
   */
  menu: MenuState;

  /**
   * The state related to authentication.
   */
  auth: AuthState;
}
