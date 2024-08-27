import { createStore, createEffect, createEvent } from "effector";
import { apiInstance } from "~/shared/api";
import { logger } from "~/shared/config";
import {
  Settings,
  TUserType,
  CustomerCompany,
  CustomerManager,
  TransporterCompany,
  TransporterManager,
} from "../types";

export type TMainData =
  | CustomerCompany
  | CustomerManager
  | TransporterCompany
  | TransporterManager;

export const getMainDataFx = createEffect<
  void,
  { profile: TMainData; settings: Settings }
>(async () => {
  try {
    const response = await apiInstance.get("/user/common/get_user/");
    return response.data.message;
  } catch (error) {
    logger.error(error);
  }
});

export const $userType = createStore<TUserType | "">("");
export const setUserType = createEvent<TUserType | "">();
$userType.on(setUserType, (_, newState) => newState);

export const setMainData = createEvent<TMainData | null>();
export const $mainData = createStore<TMainData | null>(null)
  .on(getMainDataFx.doneData, (_, payload) => payload.profile)
  .on(setMainData, (_, newState) => newState);

export const $settings = createStore<Settings | null>(null).on(
  getMainDataFx.doneData,
  (_, _payload) => _payload.settings
);

$mainData.watch((mainData) => {
  if (!mainData) return null;
  setUserType(mainData.user.user_type);
});
