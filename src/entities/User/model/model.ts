import { createStore, createEvent } from "effector";
import { getMainDataFx } from "./api";
import { GetMainDataResponse } from "./api_types";

export const getMainData = createEvent<void>();
getMainData.watch(() => getMainDataFx());

export const $mainData = createStore<GetMainDataResponse | null>(null).on(
  getMainDataFx.doneData,
  (_, payload) => payload
);
getMainData();
