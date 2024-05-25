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

export const $orders = createStore<OrderModel[]>([]);
$orders.on(getOrdersFx.doneData, (_, payload) => payload);

export const getOrders = createEvent<TOrderStatus>();
getOrders.watch((status: TOrderStatus) => getOrdersFx(status));

export const preCreateOrder = createEvent();
preCreateOrder.watch(() => preCreateOrderFx());

export const createOrder = createEvent<CreateOrderRequest>();
createOrder.watch((data) => createOrderFx(data));

export const editOrder = createEvent<EditOrderRequest>();
editOrder.watch((data) => editOrderFx(data));

export const cancelOrder = createEvent<CancelOrderRequest>();
cancelOrder.watch((data) => cancelOrderFx(data));

export const unpublishOrder = createEvent<UnpublishOrderRequest>();
unpublishOrder.watch((data) => unpublishOrderFx(data));

export const publishOrder = createEvent<PublishOrderRequest>();
publishOrder.watch((data) => publishOrderFx(data));

export const completeOrder = createEvent<CompleteOrderRequest>();
completeOrder.watch((data) => completeOrderFx(data));
