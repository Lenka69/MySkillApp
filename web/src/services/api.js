import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api',
  timeout: 90000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const wakeServer = async () => {
  try {
    await api.get('/health');
    return true;
  } catch (error) {
    console.error('Server warmup failed:', error.message);
    return false;
  }
};

export const shouldRetryRequest = (error) => {
  if (!error.response) {
    return true;
  }

  return error.response.status >= 500;
};

export default api;