import create from 'zustand';
import { User } from '@/types';

type State = {
  user?: User;
  token?: string;
};

type Actions = {
  setUser: (user?: State['user']) => void;
  clearUser(): void;

  setToken: (token?: State['token']) => void;
  clearToken(): void;
};

export const useAuthStore = create<State & Actions>((set) => (
  {
    user: undefined,
    token: localStorage.getItem('token') ?? undefined,

    setUser(user) {
      set({ user });
    },

    clearUser() {
      set({ user: undefined });
    },

    setToken(token) {
      set({ token });
      localStorage.setItem('token', token ?? '');
    },

    clearToken() {
      set({ token: undefined });
      localStorage.removeItem('token');
    }
  }
));
