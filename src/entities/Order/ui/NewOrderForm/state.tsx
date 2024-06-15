import { FormEvent } from "react";
import toast from "react-hot-toast";
import { createStore, createEvent } from "effector";
import { createOrderFx, orderTranslations } from "~/entities/Order";
import { TStages } from "~/entities/OrderStage";
import { FieldUpdatePayload, TInputs } from "./types";

export const initialOrder = {
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

export const $newOrder = createStore<TInputs & { stages: TStages[] }>({
  ...initialOrder,
  transportation_number: Math.ceil(Date.now() / 1000),
});

export const formSubmitted = createEvent<FormEvent>();
formSubmitted.watch((e: FormEvent) => {
  e.preventDefault();
  const formValues = $newOrder.getState();
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
  console.log(formValues);
  if (notFilledIn.length > 0) {
    toast(<span>Заполните обязательные поля: {notFilledIn.join(", ")}</span>, {
      position: "top-right",
      duration: 3000,
      icon: <button onClick={() => toast.dismiss()}>❌</button>,
      style: { fontSize: "1.4rem" },
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
});

export const clearForm = createEvent<FormEvent | void>();
$newOrder.on(clearForm, (state, _payload) => ({
  ...initialOrder,
  customer_manager: state.customer_manager,
  transportation_number: Math.ceil(Date.now() / 1000),
}));

export const fieldUpdate = createEvent<FieldUpdatePayload>();
$newOrder.on(fieldUpdate, (newOrder, { key, value }) => ({
  ...newOrder,
  [key]: value,
}));
