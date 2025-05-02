import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api', // Use your IP if testing on a device
  timeout: 5000,
});

export default api;
