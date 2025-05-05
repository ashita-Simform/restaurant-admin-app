import { configureStore } from '@reduxjs/toolkit';
import { authReducer, menuReducer } from '../store/features';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

/**
 * Configures and exports the Redux store for the application.
 *
 * The store combines multiple reducers to manage the application's state.
 *
 * Reducers:
 * - `auth`: Handles authentication-related state, managed by `authReducer`.
 * - `menu`: Handles menu-related state, managed by `menuReducer`.
 *
 * constant {Store} store - The configured Redux store.
 *
 * @typedef {RootState} RootState - The root state of the application.
 * @typedef {AppDispatch} AppDispatch - The dispatch type for the application.
 *
 * @remarks
 * - Use `useAppDispatch` instead of plain `useDispatch` for typed dispatching.
 * - Use `useAppSelector` instead of plain `useSelector` for typed state selection.
 */
export const store = configureStore({
  reducer: {
    auth: authReducer,
    menu: menuReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

/** Use throughout your app instead of plain "useDispatch" and "useSelector" */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
