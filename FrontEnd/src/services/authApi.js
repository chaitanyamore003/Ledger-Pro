import axiosInstance from "./axiosInstance";

export const registerUser = (userData) => {
  return axiosInstance.post("/auth/register", userData);
};
