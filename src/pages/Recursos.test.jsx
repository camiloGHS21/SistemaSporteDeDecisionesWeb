import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter } from 'react-router-dom';
import Recursos from './Recursos';

// Mock child components to isolate the test to the Recursos page
vi.mock('../components/common/Header', () => ({
  default: () => <header>Header Mock</header>
}));

vi.mock('../components/recursos/DataSourcesSection', () => ({
  default: () => <div>DataSourcesSection Mock</div>
}));

vi.mock('../components/recursos/FileUploadSection', () => ({
  default: () => <div>FileUploadSection Mock</div>
}));

describe('Recursos Page', () => {
  it('should render the main title, description, and all child components', () => {
    render(
      <MemoryRouter>
        <Recursos />
      </MemoryRouter>
    );

    // Verify the main title is rendered
    expect(screen.getByText('Recursos y Fuentes de Datos')).toBeInTheDocument();

    // Verify the descriptive paragraph is rendered
    expect(screen.getByText(/Esta sección proporciona información sobre las fuentes de datos/)).toBeInTheDocument();

    // Verify the mocked child components are rendered
    expect(screen.getByText('Header Mock')).toBeInTheDocument();
    expect(screen.getByText('DataSourcesSection Mock')).toBeInTheDocument();
    expect(screen.getByText('FileUploadSection Mock')).toBeInTheDocument();
  });
});
