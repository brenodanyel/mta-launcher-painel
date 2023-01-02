import axios from 'axios';

const {
  VITE_BACKEND_URL = 'http://localhost:3000',
} = import.meta.env;

export const axiosInstance = axios.create({
  baseURL: VITE_BACKEND_URL,
  validateStatus() {
    return true;
  }
});
