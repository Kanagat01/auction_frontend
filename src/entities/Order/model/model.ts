import toast from "react-hot-toast";
import { Effect, createEvent, createStore, sample } from "effector";
import { PreCreateOrderResponse } from "~/entities/OrderStage";
import { DriverProfileTranslations } from "~/entities/User";
import { TPaginator } from "~/shared/ui";
import {
  addDriverDataFx,
  cancelOrderCompletionFx,
  cancelOrderFx,
  completeOrderFx,
  getOrderFx,
  getOrdersFx,
  publishOrderFx,
  unpublishOrderFx,
} from "./api";
import {
  OrderModel,
  OrderStatus,
  OrderStatusTranslation,
  TGetOrder,
} from "../types";
import { AddDriverDataRequest } from ".";

export const $orders = createStore<TGetOrder[]>([]);
$orders.on(getOrdersFx.doneData, (_, payload) => payload.orders);
$orders.on(getOrderFx.doneData, (_, order) => [order]);

export const $ordersPagination = createStore<TPaginator | null>(null);
$ordersPagination.on(getOrdersFx.doneData, (_, payload) => payload.pagination);

export const $preCreateOrder = createStore<PreCreateOrderResponse | null>(null);
$preCreateOrder.on(
  getOrdersFx.doneData,
  (_, payload) => payload.pre_create_order
);

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
  const order = $selectedOrder.getState();
  if (!order) toast.error("Выберите заказ");
  else func();
};

sample({
  clock: $orders,
  target: updateSelectedOrder,
});

function handleOrderAction(
  actionFx: Effect<any, OrderModel>,
  actionMessage: { loading: string; success: string },
  actionProps?: Record<string, any>,
  onSuccess?: (order_id: number) => void
) {
  const order_id = $selectedOrder.getState()?.id;
  if (order_id)
    toast.promise(actionFx({ order_id, ...actionProps }), {
      loading: actionMessage.loading,
      success: () => {
        if (onSuccess) onSuccess(order_id);
        else {
          removeOrder(order_id);
          deselectOrder();
        }
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
      success: `Статус заказа изменен на "${OrderStatusTranslation[publish_to]}"`,
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
  handleOrderAction(
    completeOrderFx,
    {
      loading: "Завершаем заказ...",
      success: 'Статус заказа изменен на "Завершенные"',
    },
    {},
    (orderId: number) => {
      updateOrder({ orderId, newData: { status: OrderStatus.completed } });
      deselectOrder();
    }
  )
);

export const cancelOrderCompletion = createEvent();
cancelOrderCompletion.watch(() =>
  handleOrderAction(
    cancelOrderCompletionFx,
    {
      loading: "Отменяем завершение заказа...",
      success: 'Статус заказа изменен на "Выполняется"',
    },
    {},
    (orderId: number) => {
      updateOrder({ orderId, newData: { status: OrderStatus.being_executed } });
      deselectOrder();
    }
  )
);

const isDriverDataValid = (data: Omit<AddDriverDataRequest, "order_id">) => {
  const regex = /^\+?1?\d{9,15}$/;
  const notFilledIn: string[] = [];

  const fields = [
    { value: data.full_name, label: DriverProfileTranslations.full_name },
    { value: data.machine_data, label: DriverProfileTranslations.machine_data },
    {
      value: data.machine_number,
      label: DriverProfileTranslations.machine_number,
    },
    {
      value: data.passport_number,
      label: DriverProfileTranslations.passport_number,
    },
    { value: data.phone_number, label: DriverProfileTranslations.phone_number },
  ];

  fields.forEach(({ value, label }) => {
    if (value === "") notFilledIn.push(label);
  });

  if (notFilledIn.length > 0) {
    toast.error(`Заполните обязательные поля: ${notFilledIn.join(", ")}`);
    return false;
  }

  if (isNaN(Number(data.passport_number))) {
    toast.error("Неправильный номер паспорта");
    return false;
  }

  if (!regex.test(data.phone_number)) {
    toast.error("Неправильный номер телефона");
    return false;
  }

  return true;
};

export const addDriverData = createEvent<
  Omit<AddDriverDataRequest, "order_id"> & { onReset: () => void }
>();
addDriverData.watch(({ onReset, ...data }) => {
  const order_id = $selectedOrder.getState()?.id;
  if (!order_id) return;
  if (!isDriverDataValid(data)) return;

  toast.promise(addDriverDataFx({ order_id, ...data }), {
    loading: "Отправляем данные о водителе...",
    success: (driver) => {
      updateOrder({ orderId: order_id, newData: { driver } });
      deselectOrder();
      onReset();
      return "Данные отправлены";
    },
    error: (err) => {
      if (err === "Status should be being_executed") {
        return 'Для добавления данных о водителе, статус заказа должен быть "Выполняется"';
      }
      return `Произошла ошибка: ${err}`;
    },
  });
});
