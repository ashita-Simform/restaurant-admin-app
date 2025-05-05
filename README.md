# Restaurant Admin App

![Logo](https://www.simform.com/wp-content/uploads/2022/12/logo.svg)

## Overview

The **Restaurant Admin App** is a dashboard built for managing restaurant menu items built with React, TypeScript, and Ant-design.

## Tech Stack

### **Client**
- [React](https://react.dev) - A JavaScript library for building user interfaces.
- [TypeScript](https://www.typescriptlang.org) - A strongly typed programming language that builds on JavaScript.
- [Vite](https://vitejs.dev/) - A fast build tool for modern web projects.
- [Redux-toolkit](https://redux-toolkit.js.org/) - A state management library with built-in data fetching capabilities.
- [React Router](https://reactrouter.com/en/main) - A library for declarative routing in React applications.

### **Styling**
- [Ant Design (Antd)](https://ant.design/) - A modern UI library for React.

### **Code Quality**
- [Prettier](https://prettier.io/) - A code formatter for consistent styling.
- [ESLint](https://eslint.org/) - A tool for identifying and fixing code quality issues.

---

## Features

- **Authentication**: Manage user login and logout.
- **Menu Management**: Add, edit, and delete menu items.
- **Dashboard**: View key metrics.
- **Error Handling**: Includes an `ErrorBoundary` component for catching runtime errors.
- **Loading States**: Displays a fallback UI during data fetching or slow operations.

---

## Deployment

### **Vercel Deployment**
- **Inspect Deployment**: [Inspect on Vercel](https://vercel.com/ashita-phulwanis-projects/restaurant-admin-app/5YEyiQH2Vu5CdVFdvD3caseNTnTc)
- **Live Preview**: [Restaurant Admin App](https://restaurant-admin-miclp4ww1-ashita-phulwanis-projects.vercel.app)

---

## Developer Guide

### **Getting Started**

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo/restaurant-admin-app.git
   cd restaurant-admin-app
   npm install
   npm run dev
   
2. Install dependencies:
   npm install

3. Start the development server:
   npm run dev

4. Build for production:
   npm run build

5. Serve the production build:
   npx serve dist

Open the app in your browser at http://localhost:3000/ (or the port specified by the `serve` command).

Open the app in your browser at http://localhost:5173/.

## Documentation

To generate the project documentation, run the following command:
npm run docs

This will generate the documentation in the docs/ directory.

To view the documentation:
Open the docs/index.html file in your browser.
This file serves as the entry point for the generated documentation.

## Branching and Commit Guidelines
Avoid pushing or committing directly to the main branch.
Use the following branch naming conventions:
feature/feature-name
bug/bug-details
design/design-details

Format commit messages as:
   Ticket number: Title
Example:
   T-101: Deploy site on production environment

## Linting and Formatting
Before committing, ensure your code passes linting checks:
   npm lint
   npm lint:fix

Format your code
   npm format

Generate Docs
   npm run docs

## Useful Scripts
    "dev": "vite",
    "build": "tsc -b && vite build",
    "lint": "eslint . --ext ts,tsx",
    "preview": "vite preview",
    "format": "prettier --write --parser typescript '**/*.{ts,tsx}'",
    "lint:fix": "eslint . --ext ts,tsx --fix",
    "docs": "typedoc --out docs src"
