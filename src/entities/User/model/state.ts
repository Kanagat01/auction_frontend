import { createStore, createEffect } from "effector";
import { apiInstance } from "~/shared/api";
import { logger } from "~/shared/config";
import { fieldUpdate as orderFormFieldUpdate } from "~/entities/Order";
import {
  CustomerCompany,
  CustomerManager,
  TUserType,
  TransporterCompany,
  TransporterManager,
} from "../types";

type TMainData =
  | CustomerCompany
  | CustomerManager
  | TransporterCompany
  | TransporterManager;

export const getMainDataFx = createEffect<void, TMainData>(async () => {
  try {
    const response = await apiInstance.get("/user/common/get_user/");
    return response.data.message;
  } catch (error) {
    logger.error(error);
  }
});

export const $userType = createStore<TUserType | "">("").on(
  getMainDataFx.doneData,
  (_, payload) => payload.user.user_type
);

export const $mainData = createStore<TMainData | null>(null).on(
  getMainDataFx.doneData,
  (_, payload) => payload
);
$mainData.watch((mainData) => {
  mainData
    ? orderFormFieldUpdate({
        key: "customer_manager",
        value: mainData.user.full_name,
      })
    : null;
});
