import { createEvent, createStore } from "effector";
import { getOrdersFx } from "./api";
import { TGetOrder } from "../types";

export const $orders = createStore<TGetOrder[]>([]);
$orders.on(getOrdersFx.doneData, (_, payload) => payload);

export const $selectedOrders = createStore<number[]>([]);
export const selectOrder = createEvent<number>();
$selectedOrders.on(selectOrder, (state, payload) => [...state, payload]);

export const deselectOrder = createEvent<number>();
$selectedOrders.on(deselectOrder, (state, payload) =>
  state.filter((el) => el !== payload)
);
