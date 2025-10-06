
const BASE_URL = `${import.meta.env.VITE_API_URL}/api/admin`;

const getAuthToken = () => {
  return localStorage.getItem('token');
};

const fetchWithAuth = async (url, options = {}, responseType = 'json') => {
  const token = getAuthToken();
  const headers = {
    ...options.headers,
  };

  if (responseType === 'json') {
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
      // Ignore if the body is not valid JSON
    }
    throw new Error(errorMessage);
  }

  if (responseType === 'blob') {
    return response.blob();
  }

  // For DELETE requests, the response might be empty
  if (options.method === 'DELETE' && response.status === 200) {
    return {}; // Return an empty object for successful deletion
  }

  return response.json();
};

// Dashboard
export const getDashboardStats = () => {
  return fetchWithAuth(`${BASE_URL}/dashboard-stats`);
};

// Usuarios
export const getUsers = () => {
  return fetchWithAuth(`${BASE_URL}/users`);
};

export const getUser = (userId) => {
  return fetchWithAuth(`${BASE_URL}/users/${userId}`);
};

export const createUser = (userData) => {
  return fetchWithAuth(`${BASE_URL}/users`, {
    method: 'POST',
    body: JSON.stringify(userData),
  });
};

export const updateUser = (userId, userData) => {
  return fetchWithAuth(`${BASE_URL}/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  });
};

export const deleteUser = (userId) => {
  return fetchWithAuth(`${BASE_URL}/users/${userId}`, {
    method: 'DELETE',
  });
};

// Reportes
export const getReports = () => {
  return fetchWithAuth(`${BASE_URL}/reports`);
};

export const getReportContent = (reportId) => {
  return fetchWithAuth(`${BASE_URL}/reports/${reportId}/download`, {}, 'blob');
};

export const deleteReport = (reportId) => {
  return fetchWithAuth(`${BASE_URL}/reports/${reportId}`, {
    method: 'DELETE',
  });
};
