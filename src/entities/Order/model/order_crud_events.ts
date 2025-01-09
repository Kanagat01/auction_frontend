import { t } from "i18next";
import toast from "react-hot-toast";
import { createEvent, sample } from "effector";
import { $orders, $selectedOrder } from "./store";
import { TGetOrder } from "../types";

export const addOrder = createEvent<TGetOrder>();
$orders.on(addOrder, (state, order) => {
  order = { ...order, isNewOrder: true };
  const index = state.findIndex(
    (o) => o.transportation_number <= order.transportation_number
  );

  if (index === -1) {
    return [...state, order];
  } else if (index === 0) {
    return [order, ...state];
  } else {
    return [...state.slice(0, index), order, ...state.slice(index)];
  }
});

/**
 * Обновляет состояние заказа в хранилище.
 * Если из сокета пришли данные о водителе, добавить transportation_number в newData
 */
export const updateOrder = createEvent<{
  orderId: number;
  newData: Partial<TGetOrder>;
}>();
$orders.on(updateOrder, (state, { orderId, newData }) => {
  return state.map((order) => {
    if (order.id === orderId) {
      if (!order.driver && newData.driver && newData.transportation_number) {
        toast.success(
          t("orderModel.driverDataAdded", {
            transportationNumber: newData.transportation_number,
          })
        );
      }
      return { ...order, ...newData };
    }
    return order;
  });
});
$selectedOrder.on(updateOrder, (state, { newData }) => {
  return state ? { ...state, ...newData } : null;
});

export const removeOrder = createEvent<number>();
$orders.on(removeOrder, (state, orderId) =>
  state.filter((order) => order.id !== orderId)
);

export const updateSelectedOrder = createEvent();
$selectedOrder.on(updateSelectedOrder, (state) => {
  if (state)
    return $orders.getState().find((order) => order.id === state.id) ?? null;
  return null;
});

sample({
  clock: $orders,
  target: updateSelectedOrder,
});

export const isOrderSelected = (func: () => void) => {
  const order = $selectedOrder.getState();
  if (!order) toast.error(t("orders.selectOrder"));
  else func();
};
