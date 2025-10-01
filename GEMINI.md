# Project Overview

This is a web application built with **React** and **Vite**. It is based on the standard Vite template for React, providing a minimal setup with Hot Module Replacement (HMR) and ESLint for code quality.

**Key Technologies:**
*   **Frontend Framework:** React
*   **Build Tool:** Vite
*   **Linting:** ESLint
*   **Package Manager:** The user prefers `bun`.

# Building and Running

The following commands are available to build, run, and manage the application. The user prefers using `bun`.

*   **Install dependencies:**
    ```bash
    bun install
    ```

*   **Run the development server:**
    ```bash
    bun run dev
    ```

*   **Build for production:**
    ```bash
    bun run build
    ```

*   **Lint the code:**
    ```bash
    bun run lint
    ```

*   **Preview the production build:**
    ```bash
    bun run preview
    ```

# Development Conventions

*   **Code Style:** The project is configured with ESLint using the recommended rules for JavaScript (`eslint:recommended`).
*   **File Structure:** Source code is located in the `src` directory. The main application entry point is `src/main.jsx`, which renders the main `App` component.
*   **React:** The project uses modern React with functional components. The new React Compiler is enabled via a Babel plugin for potential performance optimizations.
