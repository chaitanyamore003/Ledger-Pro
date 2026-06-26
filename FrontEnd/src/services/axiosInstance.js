import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3080/api",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
