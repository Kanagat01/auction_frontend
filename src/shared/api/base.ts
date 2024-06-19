import axios, { AxiosError } from "axios";
import { setAuth } from "~/features/authorization";
import { API_URL, logger } from "~/shared/config";

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

apiInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      setAuth(false);
    }
    logger.log(error);
    return Promise.reject(error);
  }
);
