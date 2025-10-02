import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Comparar from './Comparar';

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
    global.fetch.mockReset();
  });

  it('renders the main components and title', () => {
    render(
      <MemoryRouter>
        <Comparar />
      </MemoryRouter>
    );

    expect(screen.getByText('Comparar el rendimiento de las políticas digitales')).toBeInTheDocument();
    expect(screen.getByText('Seleccione países e indicadores para comenzar su análisis comparativo.')).toBeInTheDocument();
    expect(screen.getByTestId('comparar-header')).toBeInTheDocument();
    expect(screen.getByTestId('comparar-form')).toBeInTheDocument();
    expect(screen.getByTestId('comparar-chart')).toBeInTheDocument();
    expect(screen.getByText('No chart data')).toBeInTheDocument();
  });

  it('redirects to login if no token is present when trying to compare', async () => {
    render(
      <MemoryRouter>
        <Comparar />
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

    const mockApiResponse = {
      USA: [{ indicator: 'IT_USE_SME', value: 0.8 }],
      CAN: [{ indicator: 'IT_USE_SME', value: 0.75 }],
    };

    fetch
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockApiResponse.USA,
      })
      .mockResolvedValueOnce({
        ok: true,
        status: 200,
        json: async () => mockApiResponse.CAN,
      });

    render(
      <MemoryRouter>
        <Comparar />
      </MemoryRouter>
    );

    const compareButton = screen.getByText('Compare');
    fireEvent.click(compareButton);

    await waitFor(() => {
      expect(fetch).toHaveBeenCalledTimes(2);
      expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/oecd-data/USA/2024',
        expect.any(Object)
      );
       expect(fetch).toHaveBeenCalledWith(
        'http://localhost:8080/api/oecd-data/CAN/2024',
        expect.any(Object)
      );
    });

    await waitFor(() => {
        expect(screen.getByText('Chart with data for United States')).toBeInTheDocument();
    });
  });

  it('handles fetch error gracefully', async () => {
    localStorage.setItem('token', 'fake-token');
    const consoleErrorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    fetch.mockResolvedValue({ 
        ok: false, 
        status: 500, 
        statusText: 'Internal Server Error' 
    });

    render(
      <MemoryRouter>
        <Comparar />
      </MemoryRouter>
    );

    const compareButton = screen.getByText('Compare');
    fireEvent.click(compareButton);

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalledWith('Error fetching comparison data:', expect.any(Error));
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
        <Comparar />
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
