import toast from "react-hot-toast";
import { FormEvent, MouseEvent } from "react";
import { createStore, createEvent, sample } from "effector";
import {
  $orders,
  $selectedOrder,
  TGetOrder,
  createOrderFx,
  deselectOrder,
  editOrderFx,
  orderTranslations,
} from "~/entities/Order";
import { $mainData } from "~/entities/User";
import { FieldUpdatePayload } from "./types";

export const initialOrder = {
  transportation_number: 0,
  customer_manager: "",
  start_price: 0,
  price_step: 0,
  comments_for_transporter: "",
  additional_requirements: "",
  transport_volume: 0,
  temp_mode: "",
  adr: 0,
  transport_body_width: 0,
  transport_body_length: 0,
  transport_body_height: 0,

  transport_body_type: 0,
  transport_load_type: 0,
  transport_unload_type: 0,
  stages: [],
};

type TNewOrder = Omit<
  TGetOrder,
  | "id"
  | "transporter_manager"
  | "created_at"
  | "updated_at"
  | "status"
  | "offers"
  | "tracking"
  | "documents"
>;

export const $orderForm = createStore<TNewOrder & { id?: number }>({
  ...initialOrder,
  transportation_number: Math.ceil(Date.now() / 1000),
});

export const CopyOrder = createEvent<MouseEvent<HTMLAnchorElement>>();
//@ts-ignore TODO change types
$orderForm.on(CopyOrder, (state, event) => {
  const orderId = $selectedOrder.getState();
  const order = $orders.getState().find((order) => order.id === orderId);
  if (!order) {
    event.preventDefault();
    toast.error("Выберите заказ для копирования");
    return state;
  }
  let newState: Partial<TNewOrder> = {
    transportation_number: Math.ceil(Date.now() / 1000),
    customer_manager: $mainData.getState()?.user.full_name ?? "",
  };
  Object.keys(initialOrder).map((key) => {
    if (key === "stages") {
      newState.stages = order.stages.map((stage, idx) => ({
        ...stage,
        order_stage_number: Math.ceil(Date.now() / 1000) + idx,
      }));
    } else if (["transportation_number", "customer_manager"].includes(key)) {
    } else {
      //@ts-ignore TODO
      newState[key] = order[key];
    }
    return;
  });
  sample({
    clock: $orderForm,
    target: deselectOrder,
  });
  return newState;
});

export const orderFormSubmitted = createEvent<FormEvent>();
orderFormSubmitted.watch((e: FormEvent) => {
  e.preventDefault();
  const formValues = $orderForm.getState();
  let notFilledIn = [];
  for (const key in formValues) {
    if (
      !formValues[key as keyof typeof formValues] ||
      (key === "stages" && formValues.stages.length === 0)
    ) {
      notFilledIn.push(
        orderTranslations[key as keyof typeof orderTranslations]
      );
    }
  }
  if (notFilledIn.length > 0) {
    toast(<span>Заполните обязательные поля: {notFilledIn.join(", ")}</span>, {
      position: "top-right",
      duration: 3000,
      icon: <button onClick={() => toast.dismiss()}>❌</button>,
      style: { fontSize: "1.4rem" },
    });
  } else {
    if (formValues.id) {
      const { id, ...data } = formValues;
      toast.promise(editOrderFx({ order_id: id, ...data }), {
        loading: `Обновляем заказ #${id}...`,
        success: `Заказ #${id} успешно обновлен`,
        error: (err) => {
          if (
            err.response.data.message === "transportation_number_must_be_unique"
          )
            return "№ Транспортировки должен быть уникальным";
          else return "Неизвестная ошибка";
        },
      });
    } else {
      toast.promise(createOrderFx(formValues), {
        loading: "Создаем заказ...",
        success: () => {
          clearForm();
          return "Заказ успешно создан";
        },
        error: (err) => {
          if (
            err.response.data.message === "transportation_number_must_be_unique"
          )
            return "№ Транспортировки должен быть уникальным";
          else return "Неизвестная ошибка";
        },
      });
    }
  }
});

export const EditOrder = createEvent<MouseEvent<HTMLAnchorElement>>();
$orderForm.on(EditOrder, (state, event) => {
  const orderId = $selectedOrder.getState();
  const order = $orders.getState().find((order) => order.id === orderId);
  if (!order) {
    event.preventDefault();
    toast.error("Выберите заказ для редактирования");
    return state;
  }
  toast.remove();
  sample({
    clock: $orderForm,
    target: deselectOrder,
  });
  const {
    transporter_manager,
    created_at,
    updated_at,
    status,
    offers,
    tracking,
    documents,
    ...newOrderForm
  } = order;
  return newOrderForm;
});

export const clearForm = createEvent();
$orderForm.on(
  clearForm,
  (state, _payload) =>
    ({
      ...initialOrder,
      customer_manager: state.customer_manager,
      transportation_number: Math.ceil(Date.now() / 1000),
    } as TNewOrder)
);

export const fieldUpdate = createEvent<FieldUpdatePayload>();
$orderForm.on(fieldUpdate, (state, { key, value }) => ({
  ...state,
  [key]: value,
}));
