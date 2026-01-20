const API_URL = 'http://localhost:5000/api';

// Generic API request handler for public routes
const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Something went wrong');
  }
  
  return data;
};

// Appointments API (public)
export const appointmentsAPI = {
  create: (data) => apiRequest('/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

// Contact API (public)
export const contactAPI = {
  create: (data) => apiRequest('/contact', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
};

export default apiRequest;
