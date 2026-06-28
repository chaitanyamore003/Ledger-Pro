import axios from "axios";

const refreshClient = axios.create({
  baseURL: "http://localhost:3080/api",
  withCredentials: true,
});

export default refreshClient;
