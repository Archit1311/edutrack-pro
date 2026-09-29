import apiClient from './apiClient';

const authService = {
  login: (identifier, password, role) =>
    apiClient.post('/auth/login', { identifier, password, role }),

  logout: () =>
    apiClient.post('/auth/logout'),

  refresh: () =>
    apiClient.post('/auth/refresh'),

  me: () =>
    apiClient.get('/auth/me'),
};

export default authService;
