import { createEvent, sample } from "effector";
import { FormEvent, MouseEvent } from "react";
import { $orderForm, initialOrder, setOrderForm, TNewOrder } from ".";
import {
  $selectedOrder,
  createOrderFx,
  deselectOrder,
  editOrderFx,
  orderTranslations,
} from "~/entities/Order";
import { $mainData } from "~/entities/User";
import toast from "react-hot-toast";

export const clearForm = createEvent();
clearForm.watch(() =>
  setOrderForm({
    ...initialOrder,
    customer_manager: $orderForm.getState().customer_manager,
    transportation_number: Math.ceil(Date.now() / 1000),
  } as TNewOrder)
);

export const CopyOrder = createEvent<MouseEvent<HTMLAnchorElement>>();
CopyOrder.watch((event) => {
  const order = $selectedOrder.getState();
  if (!order) {
    event.preventDefault();
    toast.error("Выберите заказ для копирования");
    return;
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
      // @ts-ignore
      newState[key] = order[key];
    }
  });
  sample({
    clock: $orderForm,
    target: deselectOrder,
  });
  setOrderForm(newState as TNewOrder);
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
            err?.response?.data?.message ===
            "transportation_number_must_be_unique"
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
            err?.response?.data?.message ===
            "transportation_number_must_be_unique"
          )
            return "№ Транспортировки должен быть уникальным";
          else return "Неизвестная ошибка";
        },
      });
    }
  }
});

export const EditOrder = createEvent<MouseEvent<HTMLAnchorElement>>();
EditOrder.watch((event) => {
  const order = $selectedOrder.getState();
  if (!order) {
    event.preventDefault();
    toast.error("Выберите заказ для редактирования");
    return;
  }
  toast.remove();
  sample({
    clock: $orderForm,
    target: deselectOrder,
  });

  const {
    customer_manager,
    transporter_manager,
    driver,
    created_at,
    updated_at,
    status,
    offers,
    tracking,
    documents,
    ...newOrderForm
  } = order;
  setOrderForm({
    customer_manager: $mainData.getState()?.user.full_name ?? "",
    ...newOrderForm,
  });
});
