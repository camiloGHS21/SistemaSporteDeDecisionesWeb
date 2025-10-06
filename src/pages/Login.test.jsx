/** @vitest-environment jsdom */

import { vi, describe, test, expect, beforeEach, afterEach } from 'vitest';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import Login from './Login';
import Comparar from './Comparar'; // To test navigation

// Mock localStorage
const localStorageMock = (() => {
  let store = {};
  return {
    getItem: (key) => store[key] || null,
    setItem: (key, value) => {
      store[key] = value.toString();
    },
    removeItem: (key) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();
Object.defineProperty(global, 'localStorage', {
  value: localStorageMock,
});

// Mock the fetch function
global.fetch = vi.fn();

const renderWithProviders = (ui, { route = '/' } = {}) => {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/login" element={ui} />
          <Route path="/comparar" element={<Comparar />} />
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
};

describe('Login Component', () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test('renders login form correctly', () => {
    renderWithProviders(<Login />, { route: '/login' });

    expect(screen.getByPlaceholderText('Correo Electronico')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Contraseña')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument();
  });

  test('allows user to type in email and password', () => {
    renderWithProviders(<Login />, { route: '/login' });

    const emailInput = screen.getByPlaceholderText('Correo Electronico');
    const passwordInput = screen.getByPlaceholderText('Contraseña');

    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });

    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('shows error message on failed login', async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: 'Credenciales inválidas' }),
    });

    renderWithProviders(<Login />, { route: '/login' });

    fireEvent.change(screen.getByPlaceholderText('Correo Electronico'), { target: { value: 'wrong@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'wrongpassword' } });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument();
    });
  });

  test('redirects to /comparar on successful login', async () => {
    fetch.mockImplementation((url) => {
      if (url.includes('/api/auth/login')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({ token: 'fake-token' }),
        });
      }
      if (url.includes('/api/auth/validate')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve({}),
        });
      }
      if (url.includes('/api/admin/auth/validate')) {
        return Promise.resolve({
          ok: false, // Not an admin
          json: () => Promise.resolve({}),
        });
      }
      return Promise.reject(new Error(`Unhandled fetch mock for ${url}`));
    });

    renderWithProviders(<Login />, { route: '/login' });

    fireEvent.change(screen.getByPlaceholderText('Correo Electronico'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      // Check if the token is set
      expect(localStorage.getItem('token')).toBe('fake-token');
      // Check for an element that is unique to the Comparar page
      expect(screen.getByText('Comparar el rendimiento de las políticas digitales')).toBeInTheDocument();
    });
  });

    test('shows error message on server error', async () => {
    fetch.mockRejectedValueOnce(new Error('No se pudo conectar al servidor'));

    renderWithProviders(<Login />, { route: '/login' });

    fireEvent.change(screen.getByPlaceholderText('Correo Electronico'), { target: { value: 'test@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Contraseña'), { target: { value: 'password123' } });
    fireEvent.click(screen.getByRole('button', { name: /iniciar sesión/i }));

    await waitFor(() => {
      expect(screen.getByText('No se pudo conectar al servidor')).toBeInTheDocument();
    });
  });
});
