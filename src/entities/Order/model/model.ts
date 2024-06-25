import toast from "react-hot-toast";
import { Effect, createEvent, createStore } from "effector";
import {
  cancelOrderFx,
  completeOrderFx,
  getOrdersFx,
  publishOrderFx,
  unpublishOrderFx,
} from "./api";
import { OrderModel, OrderStatus, TGetOrder } from "../types";

export const $orders = createStore<TGetOrder[]>([]);
$orders.on(getOrdersFx.doneData, (_, payload) => payload);

export const updateOrder = createEvent<{
  orderId: number;
  newData: Partial<TGetOrder>;
}>();
$orders.on(updateOrder, (state, { orderId, newData }) => {
  return state.map((order) =>
    order.id === orderId ? { ...order, ...newData } : order
  );
});

export const removeOrder = createEvent<number>();
$orders.on(removeOrder, (state, orderId) =>
  state.filter((order) => order.id !== orderId)
);

export const $selectedOrder = createStore<number | null>(null);

export const selectOrder = createEvent<number>();
$selectedOrder.on(selectOrder, (_, payload) => payload);

export const deselectOrder = createEvent();
$selectedOrder.on(deselectOrder, (_) => null);

export const isOrderSelected = (func: Function) => {
  const order_id = $selectedOrder.getState();
  if (!order_id) toast.error("Выберите заказ");
  else func();
};

export function handleOrderAction(
  actionFx: Effect<any, OrderModel>,
  actionMessage: { loading: string; success: string },
  actionProps?: Record<string, any>
) {
  const order_id = $selectedOrder.getState();
  if (order_id)
    toast.promise(actionFx({ order_id, ...actionProps }), {
      loading: actionMessage.loading,
      success: () => {
        removeOrder(order_id);
        deselectOrder();
        return actionMessage.success;
      },
      error: (err) => `Произошла ошибка ${err}`,
    });
}

export const cancelOrder = createEvent();
export const publishOrder = createEvent<
  "in_auction" | "in_bidding" | "in_direct"
>();
export const unpublishOrder = createEvent();
export const completeOrder = createEvent();

cancelOrder.watch(() =>
  handleOrderAction(cancelOrderFx, {
    loading: "Отменяем заказ...",
    success: 'Статус заказа изменен на "Отмененные"',
  })
);

publishOrder.watch((publish_to) =>
  handleOrderAction(
    publishOrderFx,
    {
      loading: "Публикуем заказ...",
      success: `Статус заказа изменен на "${OrderStatus[publish_to]}"`,
    },
    { publish_to }
  )
);

unpublishOrder.watch(() =>
  handleOrderAction(unpublishOrderFx, {
    loading: "Возвращаем в заказы...",
    success: 'Статус заказа изменен на "Не опубликованные"',
  })
);

completeOrder.watch(() =>
  handleOrderAction(completeOrderFx, {
    loading: "Завершаем заказ...",
    success: 'Статус заказа изменен на "Завершенные"',
  })
);
