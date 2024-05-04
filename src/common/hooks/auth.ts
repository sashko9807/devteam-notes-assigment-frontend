import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../../api/apiClient";
import type { RegisterInput } from "../../components/auth/register/RegisterForm";

import { endpoints } from "../apiEndpoints";
import { LoginInput } from "../../components/auth/login/LoginForm";
import { LoginResponse } from "../stores/authStore";
import { AxiosError, AxiosResponse } from "axios";
import { useAuthStore } from "../../components/auth/AuthStoreProvider";

export const register = async (data: RegisterInput) => {
  return await apiClient.post<RegisterInput>(endpoints.auth.register.url, data);
};

export function useRegisterMutation() {
  return useMutation({
    mutationFn: register,
    onError(error) {
      console.log(error);
    },
  });
}

export const login = async (data: LoginInput) => {
  return await apiClient.post<LoginInput, AxiosResponse<LoginResponse>>(
    endpoints.auth.login.url,
    data
  );
};

export function useLoginMutation() {
  const authActions = useAuthStore((state) => state);
  return useMutation<AxiosResponse<LoginResponse>, AxiosError, LoginInput>({
    mutationFn: login,
    onSuccess(data) {
      authActions.login(data.data);
    },
    onError(error) {
      console.log(error);
    },
  });
}
