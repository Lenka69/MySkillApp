import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Production backend Render
const API_BASE_URL = 'https://myskillapp.onrender.com/api';

// Local development examples:
// iOS Simulator: const API_BASE_URL = 'http://localhost:8000/api';
// Android Emulator: const API_BASE_URL = 'http://10.0.2.2:8000/api';
// Real device: const API_BASE_URL = 'http://IP_LAPTOP_ANDA:8000/api';

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