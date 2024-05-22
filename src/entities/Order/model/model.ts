import { createEvent, createStore } from "effector";
import { OrderModel, TOrderStatus } from "~/entities/Order";
import {
  CancelOrderRequest,
  CompleteOrderRequest,
  CreateOrderRequest,
  EditOrderRequest,
  PublishOrderRequest,
  UnpublishOrderRequest,
} from "./api_types";
import {
  cancelOrderFx,
  completeOrderFx,
  createOrderFx,
  editOrderFx,
  getOrdersFx,
  preCreateOrderFx,
  publishOrderFx,
  unpublishOrderFx,
} from "./api";

export const $orders = createStore<OrderModel[]>([]).on(
  getOrdersFx.doneData,
  (_, payload) => payload
);

export const getOrders = createEvent<TOrderStatus>().watch(
  (status: TOrderStatus) => getOrdersFx(status)
);

export const preCreateOrder = createEvent().watch(() => preCreateOrderFx());

export const createOrder = createEvent<CreateOrderRequest>().watch((data) =>
  createOrderFx(data)
);

export const editOrder = createEvent<EditOrderRequest>().watch((data) => {
  editOrderFx(data);
});

export const cancelOrder = createEvent<CancelOrderRequest>().watch((data) =>
  cancelOrderFx(data)
);

export const unpublishOrder = createEvent<UnpublishOrderRequest>().watch(
  (data) => unpublishOrderFx(data)
);

export const publishOrder = createEvent<PublishOrderRequest>().watch((data) =>
  publishOrderFx(data)
);

export const completeOrder = createEvent<CompleteOrderRequest>().watch((data) =>
  completeOrderFx(data)
);
