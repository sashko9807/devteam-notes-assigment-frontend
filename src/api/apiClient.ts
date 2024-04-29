import axios, { AxiosRequestConfig } from "axios";

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export function authConfig(accessToken: string): AxiosRequestConfig {
  return {
    withCredentials: true,
    headers: { Authorization: `Bearer ${accessToken}` },
  };
}
