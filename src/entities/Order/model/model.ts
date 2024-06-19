import toast from "react-hot-toast";
import { Effect, createEvent, createStore } from "effector";
import { cancelOrderFx, getOrdersFx, unpublishOrderFx } from "./api";
import { TGetOrder } from "../types";

export const $orders = createStore<TGetOrder[]>([]);
$orders.on(getOrdersFx.doneData, (_, payload) => payload);

export const removeOrder = createEvent<number>();
$orders.on(removeOrder, (state, orderId) =>
  state.filter((order) => order.id !== orderId)
);

export const $selectedOrder = createStore<number | null>(null);

export const selectOrder = createEvent<number>();
$selectedOrder.on(selectOrder, (_, payload) => payload);

export const deselectOrder = createEvent();
$selectedOrder.on(deselectOrder, (_) => null);

const handleOrderAction = (
  actionFx: Effect<any, any>,
  actionMessage: { loading: string; success: string }
) => {
  return () => {
    const order_id = $selectedOrder.getState();
    if (!order_id) {
      toast.error("Выберите заказ");
    } else {
      toast.promise(actionFx({ order_id }), {
        loading: actionMessage.loading,
        success: () => {
          removeOrder(order_id);
          deselectOrder();
          return actionMessage.success;
        },
        error: (err) => `Произошла ошибка ${err}`,
      });
    }
  };
};

export const cancelOrder = createEvent();
export const unpublishOrder = createEvent();

cancelOrder.watch(
  handleOrderAction(cancelOrderFx, {
    loading: "Удаляем заказ...",
    success: "Заказ успешно удален",
  })
);

unpublishOrder.watch(
  handleOrderAction(unpublishOrderFx, {
    loading: "Возвращаем в заказы...",
    success: 'Статус заказа изменен на "Не опубликованные"',
  })
);
