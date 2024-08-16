import { AxiosError, AxiosResponse, Method } from "axios";
import { createEffect } from "effector";
import { apiInstance } from ".";

export type RequestParams = {
  method: Method;
  url: string;
  data?: object;
};

export const apiRequestFx = createEffect<RequestParams, AxiosResponse, Error>(
  async ({ method, url, data }) => {
    try {
      const response = await apiInstance({ method, url, data });
      return response.data.message;
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status! > 499) throw "Ошибка на сервере";
        throw error.response?.data.message;
      } else {
        throw error;
      }
    }
  }
);
