import EncryptedStorage from 'react-native-encrypted-storage';
import { AUTH_TOKEN_KEY, LOGIN_API_BASE_URL } from '../../common/utils/config';
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: LOGIN_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'x-api-key': 'reqres-free-v1',
  },
  timeout: 10000,
});

// Request interceptor to attach JWT token
axiosInstance.interceptors.request.use(
  async config => {
    const token = await EncryptedStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    console.log('axiosInstance request interceptor error:', error);
    return Promise.reject(error);
  },
);

// Response interceptor for error handling (e.g., refresh token, logout on 401)
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    console.log('baseApi response interceptor error:', error);
    const originalRequest = error.config;
    // Example: Handle token expiry (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      // Here, you could attempt to refresh the token.
      // For this example, we'll just log out if unauthorized.
      console.log('Unauthorized access. Clearing token and logging out.');
      await EncryptedStorage.removeItem(AUTH_TOKEN_KEY);
      // Optionally, navigate to login screen or emit a global event
      console.error(
        'Unauthorized access. Token might be expired or invalid. Logging out.',
      );
      // In a real app, dispatch a global logout action here.
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
