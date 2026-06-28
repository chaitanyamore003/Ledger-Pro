import axiosInstance from "./axiosInstance";
import refreshClient from "./refreshClient";

// Register a new user
export const registerUser = (userData) => {
  return axiosInstance.post("/auth/register", userData);
};

// Login user
export const loginUser = (userData) => {
  return axiosInstance.post("/auth/login", userData);
};

// Logout user
export const logoutUser = () => {
  return axiosInstance.post("/auth/logout");
};

// Refresh access token
export const refreshToken = () => {
  return refreshClient.post("/auth/refresh");
};
