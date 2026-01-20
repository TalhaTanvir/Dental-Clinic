const API_URL = 'http://localhost:5000/api';

// Helper to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('adminToken');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Generic API request handler
const apiRequest = async (endpoint, options = {}) => {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: getAuthHeaders(),
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || data.message || 'Something went wrong');
  }
  
  return data;
};

// Auth API
export const authAPI = {
  login: (credentials) => apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  }),
  
  getMe: () => apiRequest('/auth/me'),
  
  logout: () => apiRequest('/auth/logout'),
  
  updateDetails: (data) => apiRequest('/auth/updatedetails', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  
  updatePassword: (data) => apiRequest('/auth/updatepassword', {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
};

// Appointments API
export const appointmentsAPI = {
  getAll: (params = '') => apiRequest(`/appointments${params}`),
  getStats: () => apiRequest('/appointments/stats'),
  getOne: (id) => apiRequest(`/appointments/${id}`),
  create: (data) => apiRequest('/appointments', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/appointments/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/appointments/${id}`, {
    method: 'DELETE',
  }),
};

// Services API
export const servicesAPI = {
  getAll: (params = '') => apiRequest(`/services${params}`),
  getOne: (id) => apiRequest(`/services/${id}`),
  create: (data) => apiRequest('/services', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/services/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/services/${id}`, {
    method: 'DELETE',
  }),
};

// Team API
export const teamAPI = {
  getAll: (params = '') => apiRequest(`/team${params}`),
  getOne: (id) => apiRequest(`/team/${id}`),
  create: (data) => apiRequest('/team', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/team/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/team/${id}`, {
    method: 'DELETE',
  }),
};

// Testimonials API
export const testimonialsAPI = {
  getAll: (params = '') => apiRequest(`/testimonials${params}`),
  getOne: (id) => apiRequest(`/testimonials/${id}`),
  create: (data) => apiRequest('/testimonials', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/testimonials/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  approve: (id) => apiRequest(`/testimonials/${id}/approve`, {
    method: 'PUT',
  }),
  delete: (id) => apiRequest(`/testimonials/${id}`, {
    method: 'DELETE',
  }),
};

// FAQs API
export const faqsAPI = {
  getAll: (params = '') => apiRequest(`/faqs${params}`),
  getGrouped: () => apiRequest('/faqs/grouped'),
  getOne: (id) => apiRequest(`/faqs/${id}`),
  create: (data) => apiRequest('/faqs', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/faqs/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/faqs/${id}`, {
    method: 'DELETE',
  }),
};

// Gallery API
export const galleryAPI = {
  getAll: (params = '') => apiRequest(`/gallery${params}`),
  getGrouped: () => apiRequest('/gallery/grouped'),
  getOne: (id) => apiRequest(`/gallery/${id}`),
  create: (data) => apiRequest('/gallery', {
    method: 'POST',
    body: JSON.stringify(data),
  }),
  update: (id, data) => apiRequest(`/gallery/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  delete: (id) => apiRequest(`/gallery/${id}`, {
    method: 'DELETE',
  }),
};

// Contact Messages API
export const contactAPI = {
  getAll: (params = '') => apiRequest(`/contact${params}`),
  getOne: (id) => apiRequest(`/contact/${id}`),
  update: (id, data) => apiRequest(`/contact/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  }),
  markAsRead: (id) => apiRequest(`/contact/${id}/read`, {
    method: 'PUT',
  }),
  delete: (id) => apiRequest(`/contact/${id}`, {
    method: 'DELETE',
  }),
};
