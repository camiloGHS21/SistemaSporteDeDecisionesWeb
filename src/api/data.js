
const BASE_URL = '/api';

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const fetchWithAuth = async (url, options = {}, responseType = 'json') => {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
  };

  // Si la solicitud tiene un cuerpo, se asume que es JSON.
  if (options.body) {
    headers['Content-Type'] = 'application/json';
  }

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(url, { ...options, headers });

  if (!response.ok) {
    let errorMessage = `Error en la petición: ${response.statusText}`;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || JSON.stringify(errorData);
    } catch (e) {
      // Ignorar si el cuerpo no es un JSON válido
    }
    throw new Error(errorMessage);
  }

  if (responseType === 'blob') {
    return response.blob();
  }

  return response.json();
};

export const getCountries = () => {
  return fetchWithAuth(`${BASE_URL}/paises`);
};

export const getIndicatorNames = () => {
  return fetchWithAuth(`${BASE_URL}/indicadores/nombres`);
};

export const generateReport = (reportData) => {
  return fetchWithAuth(`${BASE_URL}/reports`, {
    method: 'POST',
    body: JSON.stringify(reportData),
  }, 'blob');
};
