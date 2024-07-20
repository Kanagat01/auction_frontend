import { createStore, createEvent } from "effector";
import { TStage, TStages } from "~/entities/OrderStage";
import { $mainData } from "~/entities/User";
import { FieldUpdatePayload, TNewOrder } from "./types";

export const initialOrder: TNewOrder = {
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

export const setOrderForm = createEvent<TNewOrder & { id?: number }>();
export const $orderForm = createStore<TNewOrder & { id?: number }>({
  ...initialOrder,
  transportation_number: Math.ceil(Date.now() / 1000),
}).on(setOrderForm, (_, state) => state);

export const fieldUpdate = createEvent<FieldUpdatePayload>();
$orderForm.on(fieldUpdate, (state, { key, value }) => ({
  ...state,
  [key]: value,
}));

$mainData.watch((mainData) => {
  if (mainData)
    fieldUpdate({
      key: "customer_manager",
      value: mainData.user.full_name,
    });
});

// work with stages
export const initialOrderStage = {
  date: "",
  time_start: "",
  time_end: "",
  company: "",
  postal_code: "",
  city: "",
  address: "",
  contact_person: "",
  cargo: "",
  weight: 0,
  volume: 0,
  comments: "",
};

export const setOrderStages = createEvent<TStages>();
export const $orderStages = createStore<TStages>({
  order_stage_number: Math.ceil(Date.now() / 1000),
  load_stage: initialOrderStage,
  unload_stage: initialOrderStage,
}).on(setOrderStages, (_, state) => state);

export const setSelectedStage = createEvent<TStages | null>();
export const $selectedStage = createStore<TStages | null>(null).on(
  setSelectedStage,
  (_, state) => state
);

export const setStageType = createEvent<TStage>();
export const $stageType = createStore<TStage>("load_stage").on(
  setStageType,
  (_, state) => state
);

export const setNotValidStageNumber = createEvent<number>();
export const $notValidStageNumber = createStore<number>(0).on(
  setNotValidStageNumber,
  (_, state) => state
);

export const getStage = (order_stage_number: number) =>
  $orderForm
    .getState()
    .stages.find((stage) => stage.order_stage_number === order_stage_number);
