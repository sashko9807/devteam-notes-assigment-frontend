import { AxiosError } from "axios";
import { apiClient } from "../../api/apiClient";
import { endpoints } from "../apiEndpoints";
import { useAuthStore } from "../stores/authStore";

export async function refreshToken(cookies: any) {
  const response = await apiClient.post(endpoints.auth.refresh.url, undefined, {
    headers: { Cookie: cookies },
  });
  console.log(response.data);
  return response.data.accessToken;

  // const response = await apiClient.post(endpoints.auth.refresh.url);
  //     const accessToken: string = response.data.accessToken;
  //     auth.setState({
  //       accessToken: accessToken,
  //       isAuthenticated: true,
  //     });
  //     return accessToken;
  //   } catch (e) {
  //     auth.setState({ accessToken: "", isAuthenticated: false });
  //     if (e instanceof AxiosError) {
  //       Promise.reject(e.message);
  //     }
  //   }
}
