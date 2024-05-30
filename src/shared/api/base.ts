import axios from "axios";
import { API_URL } from "~/shared/config";

export const apiInstance = axios.create({
  baseURL: API_URL,
});

apiInstance.interceptors.request.use(async (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
});
