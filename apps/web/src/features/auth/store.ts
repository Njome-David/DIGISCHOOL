import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Role, ROLE_DASHBOARD } from '@ecole/shared';
import { authApi } from '@/shared/lib/authApi';
import { api, configureApiAuth } from '@/shared/lib/api';

export interface User {
  id: number;
  userType: 'admin' | 'personne';
  role: Role;
  username: string;
  nom: string;
  mustChangePassword?: boolean;
  childrenMatricules?: number[];
}

interface AuthState {
  accessToken: string | null;
  user: User | null;
  setAuth: (token: string, user: User) => void;
  login: (username: string, password: string) => Promise<string>;
  refresh: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      accessToken: null,
      user: null,
      setAuth: (accessToken, user) => set({ accessToken, user }),
      login: async (username, password) => {
        const { data } = await authApi.post('/auth/login', { username, password });
        const { accessToken, user } = data.data;
        set({ accessToken, user });
        const dash = ROLE_DASHBOARD[user.role as Role];
        if (!dash) throw new Error(`Rôle inconnu: ${user.role}`);
        return user.mustChangePassword ? '/change-password' : dash;
      },
      refresh: async () => {
        const { data } = await authApi.post('/auth/refresh');
        set({ accessToken: data.data.accessToken, user: data.data.user });
      },
      logout: () => {
        authApi.post('/auth/logout').catch(() => {});
        set({ accessToken: null, user: null });
      },
    }),
    { name: 'ecole-auth', partialize: (s) => ({ accessToken: s.accessToken, user: s.user }) }
  )
);

configureApiAuth({
  getToken: () => useAuthStore.getState().accessToken,
  refresh: () => useAuthStore.getState().refresh(),
  logout: () => useAuthStore.getState().logout(),
});
