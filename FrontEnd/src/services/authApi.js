import axiosInstance from "./axiosInstance";
import refreshClient from "./refreshClient";

// Register a new user
export const registerUser = (userData) => {
  return axiosInstance.post("/auth/register", userData);
};

// Verify user's email using OTP
export const verifyEmail = (verificationData) => {
  return axiosInstance.post("/auth/verify-email", verificationData);
};

// Resend verification OTP
export const resendOtp = (email) => {
  return axiosInstance.post("/auth/resend-otp", { email });
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
