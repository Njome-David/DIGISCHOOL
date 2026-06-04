import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ROLE_DASHBOARD, type Role } from '@ecole/shared';
import { MOCK_ACCOUNTS } from './mockUsers';

export interface User {
  id: string;
  role: Role;
  username: string;
  nom: string;
  email: string;
  phone: string;
  mustChangePassword: boolean;
}

interface LoginResult {
  success: boolean;
  error?: string;
  redirect?: string;
}

interface AuthState {
  user: User | null;
  /** Mot de passe courant par compte (mock  remplace par l'API en phase backend). */
  passwords: Record<string, string>;
  login: (username: string, password: string) => Promise<LoginResult>;
  logout: () => void;
  updateProfile: (updates: Partial<Pick<User, 'email' | 'phone' | 'nom'>>) => void;
  changePassword: (oldPw: string, newPw: string) => Promise<{ success: boolean; error?: string }>;
}

const delay = (ms = 500) => new Promise((r) => setTimeout(r, ms));

const initialPasswords = Object.fromEntries(MOCK_ACCOUNTS.map((a) => [a.id, a.password]));

/**
 * Store d'authentification  MOCK pour la phase frontend.
 * Forme alignee sur le futur backend (roles @ecole/shared) : le passage a
 * POST /auth/login se fera en remplacant le corps des actions, sans toucher aux vues.
 */
export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      passwords: initialPasswords,

      login: async (username, password) => {
        await delay();
        const account = MOCK_ACCOUNTS.find((a) => a.username === username);
        const { passwords } = get();
        if (!account || passwords[account.id] !== password) {
          return { success: false, error: "Identifiants incorrects. Verifiez votre nom d'utilisateur et mot de passe." };
        }
        const { password: _pw, ...user } = account;
        set({ user });
        return {
          success: true,
          redirect: user.mustChangePassword ? '/change-password' : ROLE_DASHBOARD[user.role],
        };
      },

      logout: () => set({ user: null }),

      updateProfile: (updates) => {
        const { user } = get();
        if (user) set({ user: { ...user, ...updates } });
      },

      changePassword: async (oldPw, newPw) => {
        await delay();
        const { user, passwords } = get();
        if (!user) return { success: false, error: 'Non authentifie.' };
        if (passwords[user.id] !== oldPw) return { success: false, error: 'Mot de passe actuel incorrect.' };
        set({
          passwords: { ...passwords, [user.id]: newPw },
          user: { ...user, mustChangePassword: false },
        });
        return { success: true };
      },
    }),
    {
      name: 'ecole-auth',
      partialize: (s) => ({ user: s.user, passwords: s.passwords }),
    }
  )
);
