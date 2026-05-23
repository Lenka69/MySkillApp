import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const API_BASE_URL = 'https://myskillapp.onrender.com/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 90000
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');

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
    console.log('Server warmup failed:', error.message);
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