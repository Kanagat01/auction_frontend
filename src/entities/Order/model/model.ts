import { Effect, attach, createEvent, createStore } from "effector";
import { OrderModel, TOrderStatus } from "~/entities/Order";
import { RequestParams, apiRequestFx } from "~/shared/api";
import {
  AcceptOfferRequest,
  AddDocumentRequest,
  AddOrderStageRequest,
  CancelOrderRequest,
  CompleteOrderRequest,
  CreateOrderRequest,
  DeleteDocumentRequest,
  EditOrderRequest,
  EditOrderStageRequest,
  PreCreateOrderResponse,
  PublishOrderRequest,
  RejectOfferRequest,
  UnpublishOrderRequest,
} from "./api_types";

enum OrderStatusUrls {
  unpublished = "get_unpublished_orders",
  cancelled = "get_cancelled_orders",
  in_auction = "get_orders_in_auction",
  in_bidding = "get_orders_in_bidding",
  in_direct = "get_orders_in_direct",
  being_executed = "get_being_executed_orders",
  completed = "get_completed_orders",
}

// get orders
const getOrdersFx: Effect<TOrderStatus, OrderModel[]> = attach({
  effect: apiRequestFx,
  mapParams: (status: TOrderStatus): RequestParams => ({
    method: "get",
    url: `/auction/customer/${OrderStatusUrls[status]}/`,
  }),
});
export const getOrders = createEvent<TOrderStatus>().watch(
  (status: TOrderStatus) => getOrdersFx(status)
);
export const $orders = createStore<OrderModel[]>([]).on(
  getOrdersFx.doneData,
  (_, payload) => payload
);

// pre create order
const preCreateOrderFx: Effect<void, PreCreateOrderResponse> = attach({
  effect: apiRequestFx,
  mapParams: (): RequestParams => ({
    method: "get",
    url: `/auction/customer/pre_create_order/`,
  }),
});
export const preCreateOrder = createEvent().watch(() => preCreateOrderFx());

// create order
const createOrderFx: Effect<CreateOrderRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/create_order/",
    data,
  }),
});
export const createOrder = createEvent<CreateOrderRequest>().watch((data) =>
  createOrderFx(data)
);

// edit order
const editOrderFx: Effect<EditOrderRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/edit_order/",
    data,
  }),
});
export const editOrder = createEvent<EditOrderRequest>().watch((data) => {
  editOrderFx(data);
});

// add order stage
const addOrderStageFx: Effect<AddOrderStageRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/add_order_stage/",
    data,
  }),
});
export const addOrderStage = createEvent<AddOrderStageRequest>().watch((data) =>
  addOrderStageFx(data)
);

// edit order stage
const editOrderStageFx: Effect<EditOrderStageRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/edit_order_stage/",
    data,
  }),
});
export const editOrderStage = createEvent<EditOrderStageRequest>().watch(
  (data) => editOrderStageFx(data)
);

// accept offer
const acceptOfferFx: Effect<AcceptOfferRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/accept_offer/",
    data,
  }),
});
export const acceptOffer = createEvent<AcceptOfferRequest>().watch((data) =>
  acceptOfferFx(data)
);

// reject offer
const rejectOfferFx: Effect<RejectOfferRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/reject_offer/",
    data,
  }),
});
export const rejectOffer = createEvent<RejectOfferRequest>().watch((data) =>
  rejectOfferFx(data)
);

// cancel order
const cancelOrderFx: Effect<CancelOrderRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/cancel_order/",
    data,
  }),
});
export const cancelOrder = createEvent<CancelOrderRequest>().watch((data) =>
  cancelOrderFx(data)
);

// unpublish order
const unpublishOrderFx: Effect<UnpublishOrderRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/unpublish_order/",
    data,
  }),
});
export const unpublishOrder = createEvent<UnpublishOrderRequest>().watch(
  (data) => unpublishOrderFx(data)
);

// publish order
const publishOrderFx: Effect<PublishOrderRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/publish_order/",
    data,
  }),
});
export const publishOrder = createEvent<PublishOrderRequest>().watch((data) =>
  publishOrderFx(data)
);

// complete order
const completeOrderFx: Effect<CompleteOrderRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/complete_order/",
    data,
  }),
});
export const completeOrder = createEvent<CompleteOrderRequest>().watch((data) =>
  completeOrderFx(data)
);

// add document
const addDocumentFx: Effect<AddDocumentRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/add_document/",
    data,
  }),
});
export const addDocument = createEvent<AddDocumentRequest>().watch((data) =>
  addDocumentFx(data)
);

// delete document
const deleteDocumentFx: Effect<DeleteDocumentRequest, string> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/auction/customer/delete_document/",
    data,
  }),
});
export const deleteDocument = createEvent<DeleteDocumentRequest>().watch(
  (data) => deleteDocumentFx(data)
);
