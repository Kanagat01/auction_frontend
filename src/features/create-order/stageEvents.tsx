import toast from "react-hot-toast";
import { createEvent } from "effector";
import {
  OrderStageTranslations,
  OrderStageKey,
  TStage,
  TStages,
} from "~/entities/OrderStage";
import {
  $orderForm,
  $orderStages,
  initialOrderStage,
  setOrderForm,
} from "./state";

export const clearStages = createEvent();
$orderStages.on(clearStages, (_) => ({
  order_stage_number: Math.ceil(Date.now() / 1000),
  load_stage: initialOrderStage,
  unload_stage: initialOrderStage,
  cargo: "",
  weight: 0,
  volume: 0,
}));

const stageCoupleValidation = (func: (state: TStages) => void) => {
  const state = $orderStages.getState();
  const emptyFields = [];

  for (let key1 in state) {
    let stage = key1 as TStage;
    for (let key2 in state[stage]) {
      let field = key2 as OrderStageKey;
      if (!state[stage][field] && field !== "comments") {
        const fieldName =
          (stage === "load_stage" ? "Погрузка" : "Выгрузка") +
          "." +
          OrderStageTranslations[field];
        emptyFields.push(fieldName);
      }
    }
  }
  if (!state.cargo) emptyFields.push(OrderStageTranslations.cargo);
  if (!state.weight) emptyFields.push(OrderStageTranslations.weight);
  if (!state.volume) emptyFields.push(OrderStageTranslations.volume);

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

export const addStage = createEvent<TStages>();
addStage.watch((stage) => {
  const prevState = $orderForm.getState();
  setOrderForm({ ...prevState, stages: [...prevState.stages, stage] });
});
export const addStageCouple = () => stageCoupleValidation(addStage);

const editStage = createEvent<TStages>();
editStage.watch((newStageData) => {
  const prevState = $orderForm.getState();
  setOrderForm({
    ...prevState,
    stages: prevState.stages.map((stage) =>
      stage.order_stage_number === newStageData.order_stage_number
        ? newStageData
        : stage
    ),
  });
});
export const editStageCouple = () => stageCoupleValidation(editStage);

export const removeStage = createEvent<number>();
removeStage.watch((order_stage_number) => {
  const prevState = $orderForm.getState();
  setOrderForm({
    ...prevState,
    stages: prevState.stages.filter(
      (stage) => stage.order_stage_number !== order_stage_number
    ),
  });
});
