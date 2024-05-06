import { createStore } from "zustand";

export type AuthState = {
  accessToken: string;
  isAuthenticated: boolean;
};

export type LoginResponse = {
  accessToken: string;
};

type AuthActions = {
  login: (data: LoginResponse) => void;
};
export type TAuthStore = AuthState & AuthActions;

export const defaultInitState: AuthState = {
  accessToken: "",
  isAuthenticated: false,
};

export const createAuthStore = (initState: AuthState = defaultInitState) => {
  return createStore<TAuthStore>()((set) => ({
    ...initState,
    login: (data) =>
      set(() => ({
        isAuthenticated: true,
        accessToken: data.accessToken,
      })),
  }));
};
