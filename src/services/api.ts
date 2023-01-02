import axios from 'axios';

const {
  BACKEND_URL = 'http://localhost:3000',
} = import.meta.env;

export const axiosInstance = axios.create({
  baseURL: BACKEND_URL,
  validateStatus() {
    return true;
  }
});
