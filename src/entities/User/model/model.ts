import { createStore } from "effector";
import { getMainDataFx } from "./api";
import { GetMainDataResponse } from "./api_types";

export const $mainData = createStore<GetMainDataResponse | null>(null).on(
  getMainDataFx.doneData,
  (_, payload) => payload
);
