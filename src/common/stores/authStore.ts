import { create } from "zustand";
import { apiClient } from "../../api/apiClient";
import { AxiosResponse } from "axios";

type LoginData = {
  email: string;
  password: string;
};

type LoginResponse = {
  accessToken: string;
};

type AuthActions = {
  login: (data: LoginData) => void;
};

type AuthStore = {
  accessToken: string;
  isAuthenticated: boolean;
  actions: AuthActions;
};

const authStore = create<AuthStore>((set) => ({
  accessToken: "",
  isAuthenticated: false,
  actions: {
    login: async (data: LoginData) => {
      const response = await apiClient.post<
        AxiosResponse<LoginResponse>,
        AxiosResponse<LoginResponse>
      >("user/login", data);
      set(() => ({
        accessToken: response.data.accessToken,
        isAuthenticated: true,
      }));
    },
  },
}));

export const useAccessToken = () => authStore((state) => state.accessToken);
export const useIsAuthenticated = () =>
  authStore((state) => state.isAuthenticated);
export const useAuthActions = () => authStore((state) => state.actions);
