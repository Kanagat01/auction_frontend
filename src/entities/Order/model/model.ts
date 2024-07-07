import toast from "react-hot-toast";
import { Effect, createEvent, createStore, sample } from "effector";
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

export const $selectedOrder = createStore<TGetOrder | null>(null);
$selectedOrder.on(updateOrder, (state, { newData }) => {
  return state ? { ...state, ...newData } : null;
});

export const selectOrder = createEvent<number>();
$selectedOrder.on(selectOrder, (_, orderId) =>
  $orders.getState().find((order) => order.id === orderId)
);

export const deselectOrder = createEvent();
$selectedOrder.on(deselectOrder, (_) => null);

export const updateSelectedOrder = createEvent();
$selectedOrder.on(updateSelectedOrder, (state) => {
  if (state)
    return $orders.getState().find((order) => order.id === state.id) ?? null;
  return null;
});
export const isOrderSelected = (func: Function) => {
  const order_id = $selectedOrder.getState();
  if (!order_id) toast.error("Выберите заказ");
  else func();
};

sample({
  clock: $orders,
  target: updateSelectedOrder,
});

export function handleOrderAction(
  actionFx: Effect<any, OrderModel>,
  actionMessage: { loading: string; success: string },
  actionProps?: Record<string, any>
) {
  const order_id = $selectedOrder.getState()?.id;
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
cancelOrder.watch(() =>
  handleOrderAction(cancelOrderFx, {
    loading: "Отменяем заказ...",
    success: 'Статус заказа изменен на "Отмененные"',
  })
);

export const publishOrder = createEvent<
  | { publish_to: "in_auction" | "in_bidding" }
  | { publish_to: "in_direct"; transporter_company_id: number; price: number }
>();
publishOrder.watch(({ publish_to, ...data }) =>
  handleOrderAction(
    publishOrderFx,
    {
      loading: "Публикуем заказ...",
      success: `Статус заказа изменен на "${OrderStatus[publish_to]}"`,
    },
    { publish_to, ...data }
  )
);

export const unpublishOrder = createEvent();
unpublishOrder.watch(() =>
  handleOrderAction(unpublishOrderFx, {
    loading: "Возвращаем в заказы...",
    success: 'Статус заказа изменен на "Не опубликованные"',
  })
);

export const completeOrder = createEvent();
completeOrder.watch(() =>
  handleOrderAction(completeOrderFx, {
    loading: "Завершаем заказ...",
    success: 'Статус заказа изменен на "Завершенные"',
  })
);
