import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Comparar from './Comparar';
import { AuthProvider } from '../context/AuthContext';

// Mock child components to isolate the Comparar component
vi.mock('../components/comparar/CompararHeader', () => ({
  default: () => <div data-testid="comparar-header">CompararHeader</div>,
}));
vi.mock('../components/comparar/CompararForm', () => ({
  // Mock the form to be able to trigger the onCompare callback
  default: ({ onCompare }) => (
    <div data-testid="comparar-form">
      <button onClick={() => onCompare({
        country: { value: 'USA', label: 'United States' },
        references: [{ value: 'CAN', label: 'Canada' }],
        indicators: [{ value: 'IT_USE_SME', label: 'ICT usage by SMEs' }],
      })}>
        Compare
      </button>
    </div>
  ),
}));
vi.mock('../components/comparar/CompararChart', () => ({
  default: ({ data }) => (
    <div data-testid="comparar-chart">
      {data ? `Chart with data for ${data.country.label}` : 'No chart data'}
    </div>
  ),
}));
vi.mock('../components/asistente/AsistenteAnalisis', () => ({
  default: () => <div data-testid="asistente-analisis">AsistenteAnalisis</div>,
}));

// Mock react-router-dom
const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

// Mock global fetch
global.fetch = vi.fn();

describe('Comparar Page', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();

    global.fetch.mockImplementation((url) => {
      const urlString = url.toString();

      if (urlString.endsWith('/api/indicadores/pais/Colombia')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{ tipoIndicador: 'GDP' }]),
        });
      }
      if (urlString.endsWith('/api/auth/validate')) {
        return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
      }
      if (urlString.endsWith('/api/admin/auth/validate')) {
        return Promise.resolve({ ok: false, json: () => Promise.resolve({}) });
      }
      if (urlString.includes('/api/oecd-data/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{ indicator: 'IT_USE_SME', value: 0.8 }]),
        });
      }
       if (urlString.includes('/api/indicadores/pais/')) {
        return Promise.resolve({
          ok: true,
          json: () => Promise.resolve([{ indicator: 'GDP', value: 100 }]),
        });
      }
      
      // Default mock for any other calls
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });
  });

  it('renders the main components and title', () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Comparar />
        </AuthProvider>
      </MemoryRouter>
    );

    expect(screen.getByText('Comparar el rendimiento de las políticas digitales')).toBeInTheDocument();
    expect(screen.getByText('Seleccione países e indicadores para comenzar su análisis comparativo.')).toBeInTheDocument();
    expect(screen.getByTestId('comparar-form')).toBeInTheDocument();
    expect(screen.getByTestId('comparar-chart')).toBeInTheDocument();
    expect(screen.getByText('No chart data')).toBeInTheDocument();
  });

  it('redirects to login if no token is present when trying to compare', async () => {
    render(
      <MemoryRouter>
        <AuthProvider>
          <Comparar />
        </AuthProvider>
      </MemoryRouter>
    );

    const compareButton = screen.getByText('Compare');
    fireEvent.click(compareButton);

    await waitFor(() => {
      expect(mockedNavigate).toHaveBeenCalledWith('/');
    });
  });

  it('fetches data and displays chart when form is submitted with a valid token', async () => {
    localStorage.setItem('token', 'fake-token');

    render(
      <MemoryRouter>
        <AuthProvider>
          <Comparar />
        </AuthProvider>
      </MemoryRouter>
    );

    // Wait for initial indicator fetch to complete
    await waitFor(() => expect(fetch).toHaveBeenCalled());

    const compareButton = screen.getByText('Compare');
    fireEvent.click(compareButton);

    await waitFor(() => {
      // Initial load (indicators, auth, admin) + 2 compare calls
      expect(fetch).toHaveBeenCalledTimes(5);
    });

    await waitFor(() => {
        expect(screen.getByText('Chart with data for United States')).toBeInTheDocument();
    });
  });

  it('handles fetch error gracefully', async () => {
    localStorage.setItem('token', 'fake-token');
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    // Override the mock for this test to simulate a failure
    global.fetch.mockImplementation((url) => {
       const urlString = url.toString();
      if (urlString.includes('/api/oecd-data/') || urlString.includes('/api/indicadores/pais/')) {
        return Promise.reject(new Error('Network Error'));
      }
      // Allow auth calls to succeed
      return Promise.resolve({ ok: true, json: () => Promise.resolve({}) });
    });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Comparar />
        </AuthProvider>
      </MemoryRouter>
    );

    const compareButton = screen.getByText('Compare');
    fireEvent.click(compareButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error during data fetch:', expect.any(Error));
    });
    
    expect(screen.getByText('No chart data')).toBeInTheDocument();
    consoleErrorSpy.mockRestore();
  });

  it('opens and closes the assistant chat when chart data is available', async () => {
     localStorage.setItem('token', 'fake-token');
     fetch.mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ data: 'mock' }),
     });

    render(
      <MemoryRouter>
        <AuthProvider>
          <Comparar />
        </AuthProvider>
      </MemoryRouter>
    );
    
    // Initially, the assistant should not be visible
    expect(screen.queryByTestId('asistente-analisis')).not.toBeInTheDocument();
    const chatButton = screen.getByRole('button', { name: /chat/i });
    expect(chatButton).toBeDisabled();

    // Simulate getting data
    const compareButton = screen.getByText('Compare');
    fireEvent.click(compareButton);

    await waitFor(() => {
        expect(screen.getByText('Chart with data for United States')).toBeInTheDocument();
    });

    // Now the chat button should be enabled
    expect(chatButton).not.toBeDisabled();

    // Open the chat
    fireEvent.click(chatButton);
    await waitFor(() => {
        expect(screen.getByTestId('asistente-analisis')).toBeInTheDocument();
    });

    // Close the chat
    fireEvent.click(chatButton);
    await waitFor(() => {
        expect(screen.queryByTestId('asistente-analisis')).not.toBeInTheDocument();
    });
  });
});
