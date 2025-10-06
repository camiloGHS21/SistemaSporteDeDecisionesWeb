/** @vitest-environment jsdom */

import { vi, describe, test, expect, beforeEach, afterEach } from "vitest";
import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "../context/AuthContext";
import Register from "./Register";
import Login from "./Login"; // To test navigation

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
Object.defineProperty(global, "localStorage", {
  value: localStorageMock,
});

// Mock the fetch function
global.fetch = vi.fn();

const renderWithProviders = (ui, { route = "/" } = {}) => {
  return render(
    <AuthProvider>
      <MemoryRouter initialEntries={[route]}>
        <Routes>
          <Route path="/register" element={ui} />
          <Route path="/" element={<Login />} /> {/* Redirect target */}
        </Routes>
      </MemoryRouter>
    </AuthProvider>
  );
};

describe("Register Component", () => {
  beforeEach(() => {
    fetch.mockClear();
    localStorage.clear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  test("renders registration form correctly", () => {
    renderWithProviders(<Register />, { route: "/register" });

    expect(
      screen.getByPlaceholderText("Nombre de usuario")
    ).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Correo electrónico")
    ).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Contraseña")).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Regístrate/i })
    ).toBeInTheDocument();
  });

  test("allows user to type in username, email and password", () => {
    renderWithProviders(<Register />, { route: "/register" });

    const usernameInput = screen.getByPlaceholderText("Nombre de usuario");
    const emailInput = screen.getByPlaceholderText("Correo electrónico");
    const passwordInput = screen.getByPlaceholderText("Contraseña");

    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "password123" } });

    expect(usernameInput.value).toBe("testuser");
    expect(emailInput.value).toBe("test@example.com");
    expect(passwordInput.value).toBe("password123");
  });

test("shows email validation error for invalid email", () => {
  renderWithProviders(<Register />, { route: "/register" });

  const usernameInput = screen.getByPlaceholderText("Nombre de usuario");
  const emailInput = screen.getByPlaceholderText("Correo electrónico");
  const passwordInput = screen.getByPlaceholderText("Contraseña");
  
  // Obtenemos el formulario buscando el botón que está dentro de él
  const form = screen.getByRole("button", { name: /Regístrate/i }).closest('form');

  // Llenamos todos los campos como antes
  fireEvent.change(usernameInput, { target: { value: "testuser" } });
  fireEvent.change(passwordInput, { target: { value: "password123" } });
  fireEvent.change(emailInput, { target: { value: "invalid-email" } });
  
  // LA MAGIA ESTÁ AQUÍ:
  // En lugar de hacer clic en el botón, disparamos el evento 'submit' en el formulario.
  fireEvent.submit(form);
  
  // Ahora la validación de React se ejecuta sin problemas
  expect(
    screen.getByText("Por favor, introduce un email válido.")
  ).toBeInTheDocument();

  expect(fetch).not.toHaveBeenCalled();
});

  test("shows password validation error for short password", () => {
    renderWithProviders(<Register />, { route: "/register" });

    // Obtenemos todos los campos
    const usernameInput = screen.getByPlaceholderText("Nombre de usuario");
    const emailInput = screen.getByPlaceholderText("Correo electrónico");
    const passwordInput = screen.getByPlaceholderText("Contraseña");
    const submitButton = screen.getByRole("button", { name: /Regístrate/i });

    // AÑADIDO: Llena los otros campos requeridos con datos válidos
    fireEvent.change(usernameInput, { target: { value: "testuser" } });
    fireEvent.change(emailInput, { target: { value: "test@example.com" } });

    // Ahora sí, introduce la contraseña corta que quieres probar
    fireEvent.change(passwordInput, { target: { value: "short" } });

    // Haz clic para enviar
    fireEvent.click(submitButton);

    // La validación de React ahora sí se ejecuta
    expect(
      screen.getByText("La contraseña debe tener al menos 8 caracteres.")
    ).toBeInTheDocument();

    expect(fetch).not.toHaveBeenCalled();
  });

  test("redirects to / on successful registration", async () => {
    fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ message: "User registered successfully" }),
    });

    renderWithProviders(<Register />, { route: "/register" });

    fireEvent.change(screen.getByPlaceholderText("Nombre de usuario"), {
      target: { value: "newuser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "new@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "newpassword123" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Regístrate/i }));
    });

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/users/register`,
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify({
            nombre_usuario: "newuser",
            email: "new@example.com",
            contrasena_hash: "newpassword123",
          }),
        })
      );
      // Check for an element that is unique to the Login page
      expect(
        screen.getByPlaceholderText("Correo Electronico")
      ).toBeInTheDocument();
    });
  });

  test("shows API error message on failed registration", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({ message: "El email ya está registrado" }),
    });

    renderWithProviders(<Register />, { route: "/register" });

    fireEvent.change(screen.getByPlaceholderText("Nombre de usuario"), {
      target: { value: "existinguser" },
    });
    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "existing@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "existingpassword" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Regístrate/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByText("El email ya está registrado")
      ).toBeInTheDocument();
    });
  });

  test("shows network error message on server connection failure", async () => {
    fetch.mockRejectedValueOnce(new Error("Network error"));

    renderWithProviders(<Register />, { route: "/register" });

    fireEvent.change(screen.getByPlaceholderText("Nombre de usuario"), {
      target: { value: "user" },
    });
    fireEvent.change(screen.getByPlaceholderText("Correo electrónico"), {
      target: { value: "user@example.com" },
    });
    fireEvent.change(screen.getByPlaceholderText("Contraseña"), {
      target: { value: "userpassword" },
    });
    await act(async () => {
      fireEvent.click(screen.getByRole("button", { name: /Regístrate/i }));
    });

    await waitFor(() => {
      expect(
        screen.getByText(
          "No se pudo conectar al servidor. Inténtalo más tarde."
        )
      ).toBeInTheDocument();
    });
  });
});
