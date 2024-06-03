import { createEffect } from "effector";
import { apiInstance } from "~/shared/api";
import { logger } from "~/shared/config";
import { GetMainDataResponse } from "./api_types";

export const getMainDataFx = createEffect<void, GetMainDataResponse>(
  async () => {
    try {
      const response = await apiInstance.get("/user/common/get_user/");
      return response.data.message;
    } catch (error) {
      logger.error(error);
    }
  }
);
