import { createStore, createEvent, sample } from "effector";
import { preCreateOrderFx, TStage, TStages } from "~/entities/OrderStage";
import { deselectOrder, TGetOrder } from "~/entities/Order";
import { $mainData } from "~/entities/User";
import { FieldUpdatePayload, TNewOrder } from "./types";
import { ORDER_FORM_STORAGE_KEY } from "~/shared/lib";

export const setMaxTransportationNumber = createEvent<number>();
export const $maxTransportationNumber = createStore<number>(1).on(
  setMaxTransportationNumber,
  (_, state) => state
);

export const setMaxOrderStageNumber = createEvent<number>();
export const $maxOrderStageNumber = createStore<number>(1).on(
  setMaxOrderStageNumber,
  (_, state) => state
);

const savedState = localStorage.getItem(ORDER_FORM_STORAGE_KEY);
export const initialOrder: TNewOrder = savedState
  ? JSON.parse(savedState)
  : {
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
  transportation_number: $maxTransportationNumber.getState(),
}).on(setOrderForm, (_, state) => state);

$orderForm.watch((state) => {
  if (state.id) localStorage.removeItem(ORDER_FORM_STORAGE_KEY);
  else localStorage.setItem(ORDER_FORM_STORAGE_KEY, JSON.stringify(state));
});

$maxTransportationNumber.watch((state) =>
  setOrderForm({ ...$orderForm.getState(), transportation_number: state })
);

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
  comments: "",
};

export const setOrderStages = createEvent<TStages>();
export const $orderStages = createStore<TStages>({
  order_stage_number: $maxOrderStageNumber.getState(),
  load_stage: initialOrderStage,
  unload_stage: initialOrderStage,
  cargo: "",
  weight: 0,
  volume: 0,
}).on(setOrderStages, (_, state) => state);

$maxOrderStageNumber.watch((state) =>
  setOrderStages({ ...$orderStages.getState(), order_stage_number: state })
);

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

export const orderToOrderForm = (order: TGetOrder) => {
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
    application_type,
    ...newOrderForm
  } = order;
  return newOrderForm;
};

preCreateOrderFx.doneData.watch(
  ({ order, max_order_stage_number, max_transportation_number }) => {
    if (order) {
      sample({
        clock: $orderForm,
        target: deselectOrder,
      });
      const newOrderForm = orderToOrderForm(order);
      setOrderForm({
        customer_manager: $mainData.getState()?.user.full_name ?? "",
        ...newOrderForm,
      });
    } else if (max_transportation_number) {
      setMaxTransportationNumber(max_transportation_number + 1);
    }
    setMaxOrderStageNumber(max_order_stage_number + 1);
  }
);
