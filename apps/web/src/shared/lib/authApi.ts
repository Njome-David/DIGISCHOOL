import axios from 'axios';

/** Client HTTP dédié à l'auth — évite la dépendance circulaire avec le store */
export const authApi = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 15000,
  withCredentials: true,
  headers: { 'Content-Type': 'application/json' },
});
