import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  clearAccessToken,
} from "./tokenService";
import { refreshToken } from "./authApi";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach access token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAccessToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Refresh expired access token and retry request
// Refresh expired access token and retry request
axiosInstance.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;
    // Don't refresh auth endpoints
    const isAuthRequest = originalRequest.url.startsWith("/auth/");

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !isAuthRequest
    ) {
      originalRequest._retry = true;

      try {
        // Request a new access token
        const { data } = await refreshToken();

        const newAccessToken = data.data.accessToken;

        // Update token in memory
        setAccessToken(newAccessToken);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Refresh failed -> clear token
        clearAccessToken();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
