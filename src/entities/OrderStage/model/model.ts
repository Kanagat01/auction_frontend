import { Effect, attach } from "effector";
import { OrderModel } from "~/entities/Order";
import { RequestParams, apiRequestFx } from "~/shared/api";
import {
  AddOrderStageRequest,
  EditOrderStageRequest,
  PreCreateOrderResponse,
} from "./api_types";

// add order stage
export const addOrderStageFx: Effect<AddOrderStageRequest, OrderModel> = attach(
  {
    effect: apiRequestFx,
    mapParams: (data: AddOrderStageRequest): RequestParams => ({
      method: "post",
      url: "/auction/customer/add_order_stage/",
      data,
    }),
  }
);

// edit order stage
export const editOrderStageFx: Effect<EditOrderStageRequest, OrderModel> =
  attach({
    effect: apiRequestFx,
    mapParams: (data): RequestParams => ({
      method: "post",
      url: "/auction/customer/edit_order_stage/",
      data,
    }),
  });

// get order stages
export const getOrderStagesFx: Effect<void, PreCreateOrderResponse> = attach({
  effect: apiRequestFx,
  mapParams: (): RequestParams => ({
    method: "get",
    url: `/auction/customer/pre_create_order/`,
  }),
});
