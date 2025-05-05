/**
 * Entry point of the React application.
 *
 * This file sets up the root of the application by rendering the main component (`App`)
 * into the DOM. It wraps the application with several providers to manage global state,
 * routing, and UI configuration.
 *
 * - `Provider` from `react-redux`: Supplies the Redux store to the application for state management.
 * - `BrowserRouter` from `react-router-dom`: Enables client-side routing for the application.
 * - `ConfigProvider` from `antd`: Provides global configuration for Ant Design components.
 * - `React.StrictMode`: Helps identify potential problems in the application by enabling additional checks and warnings in development mode.
 *
 * @see Component.renderMain entry point of the application.
 * @module Main
 */
import { Provider } from 'react-redux';
import { store } from './store';
import { ConfigProvider } from 'antd';
import * as Sentry from '@sentry/react';
import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { BrowserRouter } from 'react-router-dom';

Sentry.init({
  dsn: 'https://996cf5c137badcca5e7af20f11bcfde5@o4509214072897536.ingest.us.sentry.io/4509214075781120',
  sendDefaultPii: true,
  integrations: [Sentry.browserTracingIntegration()],
  tracesSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ConfigProvider>
          <Sentry.ErrorBoundary>
            <App />
          </Sentry.ErrorBoundary>
        </ConfigProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
