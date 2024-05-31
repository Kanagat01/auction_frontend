import { Effect, attach, createEvent, createStore } from "effector";
import { OrderModel } from "~/entities/Order";
import { RequestParams, apiRequestFx } from "~/shared/api";
import {
  AddOrderStageRequest,
  EditOrderStageRequest,
  PreCreateOrderResponse,
} from "./api_types";
import { OrderStages } from "../types";

type NotCreatedOrderStage = Omit<OrderStages, "id"> & {
  stageName: "load" | "unload";
};

export const $createOrderStages = createStore<NotCreatedOrderStage[]>([]);

export const addOrderStage = createEvent<NotCreatedOrderStage>();
export const removeOrderStage = createEvent<number>();
export const updateOrderStage = createEvent<{
  index: number;
  newStage: NotCreatedOrderStage;
}>();

$createOrderStages
  .on(addOrderStage, (state, orderStage) => [...state, orderStage])
  .on(removeOrderStage, (state, index) => state.filter((_, i) => i !== index))
  .on(updateOrderStage, (state, { index, newStage }) =>
    state.map((item, i) => (i === index ? newStage : item))
  );

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
