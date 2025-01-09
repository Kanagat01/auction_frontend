import { createEvent, createStore } from "effector";
import { PreCreateOrderResponse } from "~/entities/OrderStage";
import { TPaginator } from "~/shared/ui";
import { findCargoFx, getOrdersFx } from "./api";
import { TGetOrder } from "../types";

export const $orders = createStore<TGetOrder[]>([]);
$orders.on(getOrdersFx.doneData, (_, payload) => payload.orders);
$orders.on(findCargoFx.doneData, (_, order) => [order]);

export const $ordersPagination = createStore<TPaginator | null>(null);
$ordersPagination.on(getOrdersFx.doneData, (_, payload) => payload.pagination);

export const $preCreateOrder = createStore<PreCreateOrderResponse | null>(null);
$preCreateOrder.on(
  getOrdersFx.doneData,
  (_, payload) => payload.pre_create_order
);

export const setSelectedOrder = createEvent<TGetOrder | null>();
export const $selectedOrder = createStore<TGetOrder | null>(null).on(
  setSelectedOrder,
  (_, state) => {
    if (state?.isNewOrder) state.isNewOrder = false;
    return state;
  }
);
