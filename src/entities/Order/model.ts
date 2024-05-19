import { createEffect, createStore } from "effector";
import { OrderModel, TOrderStatus } from ".";
import { apiInstance } from "~/shared/api";
import { logger } from "~/shared/config";

enum OrderStatusUrls {
  unpublished = "get_unpublished_orders",
  cancelled = "get_cancelled_orders",
  in_auction = "get_orders_in_auction",
  in_bidding = "get_orders_in_bidding",
  in_direct = "get_orders_in_direct",
  being_executed = "get_being_executed_orders",
  completed = "get_completed_orders",
}

const getOrdersFx = createEffect<TOrderStatus, OrderModel[]>(
  async (status: TOrderStatus) => {
    try {
      const response = await apiInstance.get(
        `/auction/customer/${OrderStatusUrls[status]}/`
      );
      return response.data.message;
    } catch (error) {
      logger.error(error);
    }
  }
);

export const $orders = createStore<OrderModel[]>([]).on(
  getOrdersFx.doneData,
  (_, payload) => payload
);
