import { createStore } from "effector";
import { getOrdersFx } from "./api";
import { TGetOrder } from "../types";

export const $orders = createStore<TGetOrder[]>([]);
$orders.on(getOrdersFx.doneData, (_, payload) => payload);
