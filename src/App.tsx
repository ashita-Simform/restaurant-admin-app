import './App.css';

import * as React from 'react';
import { lazy, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from './store';
import { useAppInit } from '@/hooks/useAppInit';
import { Layout } from './components/shared/Layout/Layout';
import { ErrorBoundary } from './components/shared/Error Boundary/ErrorBoundary';
import { LoadingFallback } from './components/shared/Loading Feedback/LoadingFallback';

const LoginPage = lazy(() => import('./pages/LoginPage'));
const DashBoardPage = lazy(() => import('./pages/DashBoardPage'));
const MenuItemsPage = lazy(() => import('./pages/MenuItemsPage'));
const AddMenuItemPage = lazy(() => import('./pages/AddMenuItemPage'));
const EditMenuItemPage = lazy(() => import('./pages/EditMenuItemPage'));

const PrivateRoutes = () => {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  return isAuthenticated ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

/**
 * The main application component for the restaurant admin app.
 *
 * This component initializes the application, sets up error boundaries,
 * and defines the routing structure for the app.
 *
 * @returns {React.FC} The main application component.
 *
 * ## Routes:
 * - `/login`: Renders the `LoginPage` component.
 * - `/`: Renders the `DashBoardPage` component (protected route).
 * - `/menu`: Renders the `MenuItemsPage` component (protected route).
 * - `/menu/add`: Renders the `AddMenuItemPage` component (protected route).
 * - `/menu/edit/:id`: Renders the `EditMenuItemPage` component (protected route).
 *
 * ## Components:
 * - `ErrorBoundary`: Wraps the app to catch and handle errors gracefully.
 * - `Suspense`: Provides a fallback UI (`<LoadingFallback />`) while lazy-loaded components are being fetched.
 * - `PrivateRoutes`: Protects certain routes, ensuring only authenticated users can access them.
 */
const App: React.FC = () => {
  useAppInit();

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <div className="App">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={<DashBoardPage />} />
              <Route path="/menu" element={<MenuItemsPage />} />
              <Route path="/menu/add" element={<AddMenuItemPage />} />
              <Route path="/menu/edit/:id" element={<EditMenuItemPage />} />
            </Route>
          </Routes>
        </div>
      </Suspense>
    </ErrorBoundary>
  );
};

export default App;
