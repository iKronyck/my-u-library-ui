import { create } from "zustand";
import { persist } from "zustand/middleware";
import { AuthState, User } from "@/types";

interface ExtendedAuthState extends AuthState {
  refreshToken: string | null;
  setRefreshToken: (refreshToken: string) => void;
}

export const useAuthStore = create<ExtendedAuthState>()(
  persist(
    (set) => ({
      token: null,
      refreshToken: null,
      user: null,
      isAuthenticated: false,
      isLoading: false,

      setToken: (token: string) => set({ token, isAuthenticated: true }),

      setRefreshToken: (refreshToken: string) => set({ refreshToken }),

      setUser: (user: User) => set({ user }),

      login: (token: string, user: User, refreshToken?: string) =>
        set({
          token,
          refreshToken: refreshToken || null,
          user,
          isAuthenticated: true,
          isLoading: false,
        }),

      logout: () =>
        set({
          token: null,
          refreshToken: null,
          user: null,
          isAuthenticated: false,
          isLoading: false,
        }),

      setLoading: (isLoading: boolean) => set({ isLoading }),
    }),
    {
      name: "auth-storage",
      partialize: (state) => ({
        token: state.token,
        refreshToken: state.refreshToken,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);
