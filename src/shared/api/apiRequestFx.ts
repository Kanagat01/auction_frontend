import { Method } from "axios";
import { createEffect } from "effector";
import { logger } from "~/shared/config";
import { apiInstance } from ".";

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
      logger.error(error);
    }
  }
);
