import { createEvent, createStore } from "effector";
import toast from "react-hot-toast";
import { $newOrder } from "~/entities/Order";
import { OrderStageTranslations, TStage, TStages } from "~/entities/OrderStage";

export const $stageType = createStore<TStage>("load_stage");
export const setStageType = createEvent<TStage>();
$stageType.on(setStageType, (_, payload) => payload);

export const initialOrderStage = {
  address: "",
  cargo: "",
  comments: "",
  company: "",
  contact_person: "",
  date: "",
  time_start: "",
  time_end: "",
  volume: 0,
  weight: 0,
};

export const $orderStages = createStore<TStages>({
  order_stage_number: Math.ceil(Date.now() / 1000),
  load_stage: initialOrderStage,
  unload_stage: initialOrderStage,
});

export const updateStages = createEvent<TStages>();
$orderStages.on(updateStages, (_, newState) => newState);

export const clearStages = createEvent();
$orderStages.on(clearStages, (_) => ({
  order_stage_number: Math.ceil(Date.now() / 1000),
  load_stage: initialOrderStage,
  unload_stage: initialOrderStage,
}));

const stageCoupleValidation = (func: (state: TStages) => void) => {
  const state = $orderStages.getState();
  const emptyFields = [];

  for (let key1 in state) {
    let stage = key1 as TStage;
    for (let key2 in state[stage]) {
      let field = key2 as keyof typeof OrderStageTranslations;
      if (!state[stage as TStage][field]) {
        const fieldName =
          (stage === "load_stage" ? "Погрузка" : "Выгрузка") +
          "." +
          OrderStageTranslations[field];
        emptyFields.push(fieldName);
      }
    }
  }

  if (emptyFields.length > 0) {
    toast(<span>Заполните обязательные поля: {emptyFields.join(", ")}</span>, {
      position: "top-right",
      duration: 3000,
      icon: <button onClick={() => toast.dismiss()}>❌</button>,
      style: { fontSize: "1.4rem" },
    });
  } else {
    func(state);
    clearStages();
  }
  return !(emptyFields.length > 0);
};

const addStage = createEvent<TStages>();
$newOrder.on(addStage, (state, stage) => ({
  ...state,
  stages: [...state.stages, stage],
}));
export const addStageCouple = () => stageCoupleValidation(addStage);

export const removeStage = createEvent<number>();
$newOrder.on(removeStage, (state, order_stage_number) => ({
  ...state,
  stages: state.stages.filter(
    (stage) => stage.order_stage_number !== order_stage_number
  ),
}));

export const getStage = (order_stage_number: number) =>
  $newOrder
    .getState()
    .stages.find((stage) => stage.order_stage_number === order_stage_number);

const editStage = createEvent<TStages>();
$newOrder.on(editStage, (state, newStageData) => ({
  ...state,
  stages: state.stages.map((stage) =>
    stage.order_stage_number === newStageData.order_stage_number
      ? newStageData
      : stage
  ),
}));
export const editStageCouple = () => stageCoupleValidation(editStage);
