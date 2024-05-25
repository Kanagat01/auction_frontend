import axios, { Method } from "axios";
import { createEffect } from "effector";
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

export type RequestParams = {
  method: Method;
  url: string;
  data?: any;
};

export const apiRequestFx = createEffect<RequestParams, any, Error>(
  async ({ method, url, data }) => {
    try {
      const response = await apiInstance({ method, url, data });
      return response.data.message;
    } catch (error: any) {
      if (error.response.status === 401) {
        setAuth(false);
      }
      logger.error(error);
    }
  }
);
