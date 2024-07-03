import { Effect, attach } from "effector";
import { OrderModel, TGetOrder, TOrderStatus } from "~/entities/Order";
import { RequestParams, apiRequestFx } from "~/shared/api";
import {
  CancelOrderRequest,
  CompleteOrderRequest,
  CreateOrderRequest,
  EditOrderRequest,
  PublishOrderRequest,
  UnpublishOrderRequest,
} from "./api_types";
import { $userType } from "~/entities/User";

//@ts-ignore
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
export const getOrdersFx: Effect<TOrderStatus, TGetOrder[]> = attach({
  effect: apiRequestFx,
  mapParams: (status: TOrderStatus): RequestParams => ({
    method: "get",
    url: `/auction/${
      $userType.getState()?.split("_")[0]
    }/get_orders/?status=${status}`,
  }),
});

// create order
export const createOrderFx: Effect<CreateOrderRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data: CreateOrderRequest): RequestParams => ({
    method: "post",
    url: "/auction/customer/create_order/",
    data,
  }),
});

// edit order
export const editOrderFx: Effect<EditOrderRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data: EditOrderRequest): RequestParams => ({
    method: "post",
    url: "/auction/customer/edit_order/",
    data,
  }),
});

// cancel order
export const cancelOrderFx: Effect<CancelOrderRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data: CancelOrderRequest): RequestParams => ({
    method: "post",
    url: `/auction/${$userType.getState()?.split("_")[0]}/cancel_order/`,
    data,
  }),
});

// unpublish order
export const unpublishOrderFx: Effect<UnpublishOrderRequest, OrderModel> =
  attach({
    effect: apiRequestFx,
    mapParams: (data: UnpublishOrderRequest): RequestParams => ({
      method: "post",
      url: "/auction/customer/unpublish_order/",
      data,
    }),
  });

// publish order
export const publishOrderFx: Effect<PublishOrderRequest, OrderModel> = attach({
  effect: apiRequestFx,
  mapParams: (data: PublishOrderRequest): RequestParams => ({
    method: "post",
    url: `/auction/${$userType.getState()?.split("_")[0]}/publish_order/`,
    data,
  }),
});

// complete order
export const completeOrderFx: Effect<CompleteOrderRequest, OrderModel> = attach(
  {
    effect: apiRequestFx,
    mapParams: (data: CompleteOrderRequest): RequestParams => ({
      method: "post",
      url: `/auction/${$userType.getState()?.split("_")[0]}/complete_order/`,
      data,
    }),
  }
);
