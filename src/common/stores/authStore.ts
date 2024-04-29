import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

import { shallow } from "zustand/shallow";

export type LoginResponse = {
  accessToken: string;
};

type AuthActions = {
  login: (data: LoginResponse) => void;
};

export interface AuthStore {
  accessToken: string;
  isAuthenticated: boolean;
  actions: AuthActions;
}

export const authStore = create<AuthStore>((set) => ({
  accessToken: "",
  isAuthenticated: false,
  actions: {
    login: (data) => {
      set({ isAuthenticated: true, accessToken: data.accessToken });
    },
  },
}));

export const useAuth = (): AuthStore =>
  authStore(
    useShallow((state) => ({
      accessToken: state.accessToken,
      isAuthenticated: state.isAuthenticated,
      actions: state.actions,
    }))
  );
export const useAccessToken = () => authStore((state) => state.accessToken);
export const useIsAuthenticated = () =>
  authStore((state) => state.isAuthenticated);
export const useAuthActions = () => authStore((state) => state.actions);
