import { createStore, createEvent } from "effector";
import { OrderModel } from "~/entities/Order";
import { getOrdersFx } from "./api";

export const $orders = createStore<OrderModel[]>([]);
$orders.on(getOrdersFx.doneData, (_, payload) => payload);

export const updateOrder = createEvent<Partial<OrderModel>>();
export const $newOrder = createStore<Partial<OrderModel>>({});
$newOrder.on(updateOrder, (state, payload) => ({ ...state, ...payload }));
