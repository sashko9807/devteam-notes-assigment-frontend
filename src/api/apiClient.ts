import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { refreshToken } from "../common/utils/refreshToken";

declare module "axios" {
  export interface InternalAxiosRequestConfig {
    _retry: boolean;
  }
}

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

export function authConfig(accessToken: string): AxiosRequestConfig {
  return {
    headers: { Authorization: `Bearer ${accessToken}` },
  };
}

const onFulfilled = (response: AxiosResponse) => response;
const onRejected = async (e: AxiosError) => {
  const request = e.config;
  if (typeof window === "undefined" || !request) return;

  request._retry = false;
  if (!request) {
    console.log(`it should abort`);
    return Promise.reject(e);
  }
  if (e.response?.status === 401 && !request._retry) {
    request._retry = true;
    try {
      const accessToken = await refreshToken(request.headers.cookies);
      request.headers.Authorization = `Bearer ${accessToken}`;
      return await apiClient(request);
    } catch (e) {
      Promise.reject(e);
    }
  }

  return Promise.reject(e);
};

apiClient.interceptors.response.use(onFulfilled, onRejected);
