// api.js

import axios from 'axios';
import { APP_URL } from './config';

const baseURL = APP_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    // Add any global request headers here
    // Handle authorization if needed
   

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Common function for handling API requests
const handleRequest = async (method, url, data) => {
  try {
    const response = await api[method](url, data);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data : error.message);
  }
};

// Export methods for common CRUD operations
export const get = (url) => handleRequest('get', url);
export const post = (url, data) => handleRequest('post', url, data);
export const put = (url, data) => handleRequest('put', url, data);
export const patch = (url, data) => handleRequest('patch', url, data);
export const remove = (url) => handleRequest('delete', url);
