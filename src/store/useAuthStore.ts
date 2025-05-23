import { create } from "zustand";

interface AuthState {
  token: string | null;
  username: string | null;
  rol: string | null;
  isAuthenticated: boolean;
  login: (token: string, username: string, rol: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  username: localStorage.getItem("username"),
  rol: localStorage.getItem("rol"),
  isAuthenticated: !!localStorage.getItem("token"),

  login: (token, username, rol) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("rol", rol);
    set({ token, username, rol, isAuthenticated: true });
  },

  logout: () => {
    localStorage.clear();
    set({ token: null, username: null, rol: null, isAuthenticated: false });
  },
}));
