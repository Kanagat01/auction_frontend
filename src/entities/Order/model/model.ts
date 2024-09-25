import toast, { Renderable, ValueOrFunction } from "react-hot-toast";
import { Effect, createEvent, createStore, sample } from "effector";
import { PreCreateOrderResponse } from "~/entities/OrderStage";
import {
  DriverProfileTranslationKey,
  DriverProfileTranslations,
} from "~/entities/User";
import { TPaginator } from "~/shared/ui";
import {
  addDriverDataFx,
  cancelOrderCompletionFx,
  cancelOrderFx,
  completeOrderFx,
  findCargoFx,
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
$orders.on(findCargoFx.doneData, (_, order) => [order]);

export const $ordersPagination = createStore<TPaginator | null>(null);
$ordersPagination.on(getOrdersFx.doneData, (_, payload) => payload.pagination);

export const $preCreateOrder = createStore<PreCreateOrderResponse | null>(null);
$preCreateOrder.on(
  getOrdersFx.doneData,
  (_, payload) => payload.pre_create_order
);

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
          `Для заказа №${newData.transportation_number} добавлены данные о водителе`
        );
      }
      return { ...order, ...newData };
    }
    return order;
  });
});

export const removeOrder = createEvent<number>();
$orders.on(removeOrder, (state, orderId) =>
  state.filter((order) => order.id !== orderId)
);

export const setSelectedOrder = createEvent<TGetOrder | null>();
export const $selectedOrder = createStore<TGetOrder | null>(null).on(
  setSelectedOrder,
  (_, state) => {
    if (state?.isNewOrder) state.isNewOrder = false;
    return state;
  }
);
$selectedOrder.on(updateOrder, (state, { newData }) => {
  return state ? { ...state, ...newData } : null;
});

export const updateSelectedOrder = createEvent();
$selectedOrder.on(updateSelectedOrder, (state) => {
  if (state)
    return $orders.getState().find((order) => order.id === state.id) ?? null;
  return null;
});
export const isOrderSelected = (func: () => void) => {
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
  actionMessage: {
    loading: string;
    success: string;
    error?: ValueOrFunction<Renderable, any>;
  },
  actionProps?: Record<string, unknown>,
  onSuccess?: (order_id: number) => void
) {
  const order = $selectedOrder.getState();
  const order_id = order?.id;
  if (order_id) {
    toast.promise(actionFx({ order_id, ...actionProps }), {
      loading: actionMessage.loading,
      success: () => {
        if (onSuccess) onSuccess(order_id);
        else {
          removeOrder(order_id);
          setSelectedOrder(null);
        }
        return actionMessage.success;
      },
      error: actionMessage.error
        ? actionMessage.error
        : (err) => {
            if (err instanceof Array) {
              const statusError = err.find((el) =>
                el.startsWith("order_status_is")
              );
              if (err.includes("order_is_completed"))
                return "Нельзя отменить, заказ уже завершен";
              else if (err.includes("order_is_completed_or_unpublished")) {
                removeOrder(order_id);
                return "Заказ уже завершен или не опубликован";
              } else if (statusError) {
                const orderStatus: OrderStatus = statusError.split(":")[1];
                if (orderStatus !== OrderStatus.completed) {
                  removeOrder(order_id);
                  return `Статус заказа "${OrderStatusTranslation[orderStatus]}"`;
                } else {
                  updateOrder({
                    orderId: order_id,
                    newData: { status: orderStatus },
                  });
                  return "Заказ уже завершен";
                }
              }
            }
            return `Произошла ошибка: ${err}`;
          },
    });
  } else toast.error("Выберите заказ");
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
      error: (err) => {
        if (typeof err === "string") {
          if (err === "transporter_company has no manager")
            return "У компании перевозчика нет менеджера, чтобы назначить";
        }
        return `Произошла ошибка: ${err}`;
      },
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
      setSelectedOrder(null);
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
      setSelectedOrder(null);
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
      setSelectedOrder(null);
      onReset();
      return "Данные отправлены";
    },
    error: (err) => {
      if (err === "Status should be being_executed") {
        return 'Для добавления данных о водителе, статус заказа должен быть "Выполняется"';
      } else if (typeof err === "object") {
        const getErrorValue = (value: unknown) => {
          if (Array.isArray(value) && typeof value[0] === "string") {
            if (value[0].startsWith("max_length is"))
              return `Максимальная длина ${value[0]
                .split(" ")
                .at(-2)} символов`;
            else if (value[0] === "required") return "Обязательное поле";
            else if (value[0] === "must_be_unique")
              return "Должен быть уникальным для водителя";
          }
          return value;
        };
        return Object.entries(err)
          .map(
            ([key, value]) =>
              `${
                DriverProfileTranslations[key as DriverProfileTranslationKey]
              }: ${getErrorValue(value)}`
          )
          .join("\n");
      }
      return `Произошла ошибка: ${err}`;
    },
  });
});
