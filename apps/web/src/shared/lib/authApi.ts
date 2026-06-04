import axios from 'axios';

/** Client HTTP dedie a l'auth  evite la dependance circulaire avec le store */
export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 15000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});
