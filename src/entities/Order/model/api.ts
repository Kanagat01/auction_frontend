import { Effect, attach } from "effector";
import { $userType, DriverProfile, getRole } from "~/entities/User";
import { OrderModel, TGetOrder } from "~/entities/Order";
import { RequestParams, apiRequestFx } from "~/shared/api";
import {
  AddDriverDataRequest,
  CancelOrderRequest,
  CompleteOrderRequest,
  CreateOrderRequest,
  EditOrderRequest,
  GetOrdersRequest,
  GetOrdersResponse,
  PublishOrderRequest,
  UnpublishOrderRequest,
} from "./api_types";

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

// get order
export const getOrderFx: Effect<number, TGetOrder> = attach({
  effect: apiRequestFx,
  mapParams: (transportation_number: number): RequestParams => ({
    method: "get",
    url: `/auction/get_order/${transportation_number}/`,
  }),
});

// get orders
export const getOrdersFx: Effect<GetOrdersRequest, GetOrdersResponse> = attach({
  effect: apiRequestFx,
  mapParams: ({
    status,
    page,
    cityFrom,
    cityTo,
    transportationNumber,
  }: GetOrdersRequest): RequestParams => {
    let queryParams = `status=${status}`;
    if (page) queryParams += "&page=" + page;
    if (cityFrom) queryParams += "&city_from=" + cityFrom;
    if (cityTo) queryParams += "&city_to=" + cityTo;
    if (transportationNumber)
      queryParams += "&transportation_number=" + transportationNumber;
    return {
      method: "get",
      url: `/auction/get_orders/?${queryParams}`,
    };
  },
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
    url: `/auction/${getRole($userType.getState())}/cancel_order/`,
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
    url: `/auction/${getRole($userType.getState())}/publish_order/`,
    data,
  }),
});

// complete order
export const completeOrderFx: Effect<CompleteOrderRequest, OrderModel> = attach(
  {
    effect: apiRequestFx,
    mapParams: (data: CompleteOrderRequest): RequestParams => ({
      method: "post",
      url: `/auction/${getRole($userType.getState())}/complete_order/`,
      data,
    }),
  }
);

// add driver data to order
export const addDriverDataFx: Effect<AddDriverDataRequest, DriverProfile> =
  attach({
    effect: apiRequestFx,
    mapParams: (data: AddDriverDataRequest): RequestParams => ({
      method: "post",
      url: `/auction/transporter/add_driver_data/`,
      data,
    }),
  });
