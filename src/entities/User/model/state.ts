import { createStore, createEffect } from "effector";
import { apiInstance } from "~/shared/api";
import { logger } from "~/shared/config";
import { GetMainDataResponse } from "./api_types";
import { fieldUpdate as orderFormFieldUpdate } from "~/entities/Order";

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

export const $mainData = createStore<GetMainDataResponse | null>(null).on(
  getMainDataFx.doneData,
  (_, payload) => payload
);
$mainData.watch((mainData) => {
  orderFormFieldUpdate({
    key: "customer_manager",
    value: mainData?.user.full_name ?? "",
  });
});
