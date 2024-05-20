import axios, { Method } from "axios";
import { createEffect } from "effector";
import { API_URL, logger } from "~/shared/config";

export const apiInstance = axios.create({
  baseURL: API_URL,
});

apiInstance.interceptors.request.use(async (config) => {
  const token = await getValidToken();
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }
  return config;
});

async function getValidToken() {
  return localStorage.getItem("token");
}

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
    } catch (error) {
      logger.error(error);
    }
  }
);
