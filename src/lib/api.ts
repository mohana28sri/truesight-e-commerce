const API_URL = '/api';

function getHeaders() {
  const userStr = localStorage.getItem('zenvique-user');
  const headers = { 'Content-Type': 'application/json' };
  
  if (userStr) {
    try {
      const user = JSON.parse(userStr);
      // Wait, we need the token! We should store the token in localStorage along with user.
      const token = localStorage.getItem('zenvique-token');
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }
    } catch (e) {
      console.error('Failed to parse user from localStorage', e);
    }
  }
  return headers;
}

export async function fetchApi(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  const headers = { ...getHeaders(), ...options.headers };

  const response = await fetch(url, { ...options, headers });
  
  if (!response.ok) {
    let errorMessage = 'An error occurred';
    try {
      const data = await response.json();
      errorMessage = data.error || errorMessage;
    } catch (e) {
      // Ignored
    }
    throw new Error(errorMessage);
  }

  // Handle 204 No Content
  if (response.status === 204) {
    return null;
  }

  return response.json();
}
