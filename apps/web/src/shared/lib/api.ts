import axios, { AxiosError } from 'axios';

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api/v1',
  timeout: 15000,
  withCredentials: true,
});

let getAccessToken: () => string | null = () => null;
let onRefresh: () => Promise<void> = async () => {};
let onLogout: () => void = () => {};

export function configureApiAuth(config: {
  getToken: () => string | null;
  refresh: () => Promise<void>;
  logout: () => void;
}) {
  getAccessToken = config.getToken;
  onRefresh = config.refresh;
  onLogout = config.logout;
}

api.interceptors.request.use((cfg) => {
  const token = getAccessToken();
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

api.interceptors.response.use(
  (res) => res,
  async (err: AxiosError) => {
    const original = err.config as typeof err.config & { _retry?: boolean };
    if (err.response?.status === 401 && original && !original._retry) {
      original._retry = true;
      try {
        await onRefresh();
        return api(original);
      } catch {
        onLogout();
      }
    }
    return Promise.reject(err);
  }
);

export function getApiErrorMessage(err: unknown): string {
  if (axios.isAxiosError(err)) {
    if (!err.response) return 'Impossible de joindre le serveur. Vérifiez que l\'API est démarrée.';
    return err.response.data?.error?.message || `Erreur ${err.response.status}`;
  }
  if (err instanceof Error) return err.message;
  return 'Une erreur est survenue';
}
