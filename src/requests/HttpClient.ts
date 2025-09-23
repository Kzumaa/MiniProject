import axios, { AxiosError } from 'axios';
import type { ApiResponse } from '@/types';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: false,
});

// Request interceptor for adding auth token
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for handling errors
httpClient.interceptors.response.use(
  (response) => {
    // Handle successful responses (status 2xx)
    return response;
  },
  (error: AxiosError<ApiResponse<unknown>>) => {
    // Handle error responses
    if (error.response) {
      // The server responded with a status code outside of 2xx
      const status = error.response.status;
      const errorData = error.response.data;

      // Handle unauthorized errors (token expired)
      if (status === 401) {
        // You could redirect to login or clear session
        localStorage.removeItem('auth_token');
        window.dispatchEvent(new CustomEvent('auth:logout'));
      }

      // Return the API's error response instead of throwing
      return Promise.resolve({
        data: {
          success: false,
          message: errorData?.message || `Error: ${status}`,
          errorCode: status,
        },
      });
    } else if (error.request) {
      // The request was made but no response was received
      return Promise.resolve({
        data: {
          success: false,
          message: 'No response from server. Please check your connection.',
          errorCode: 0,
        },
      });
    } else {
      // Something happened in setting up the request
      return Promise.resolve({
        data: {
          success: false,
          message: error.message || 'An unknown error occurred',
          errorCode: 0,
        },
      });
    }
  }
);
