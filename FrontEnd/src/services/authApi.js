import axiosInstance from "./axiosInstance";

export const registerUser = (userData) => {
  return axiosInstance.post("/auth/register", userData);
};

export const loginUser = (userData) => {
  return axiosInstance.post("/auth/login", userData);
};
