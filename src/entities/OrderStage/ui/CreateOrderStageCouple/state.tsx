import { ChangeEvent } from "react";
import { createEvent, createStore } from "effector";
import {
  OrderStageTranslations,
  TOrderStageKey,
  TStage,
  TStages,
} from "~/entities/OrderStage";
import toast from "react-hot-toast";

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
  time_end: "",
  time_start: "",
  volume: 0,
  weight: 0,
};

export const $orderStages = createStore<TStages>({
  load_stage: initialOrderStage,
  unload_stage: initialOrderStage,
});

export const addStageCouple = () => {
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
  }
  return !(emptyFields.length > 0);
};

export const clearStages = createEvent();
$orderStages.on(clearStages, (_) => ({
  load_stage: initialOrderStage,
  unload_stage: initialOrderStage,
}));

type FieldUpdatePayload = {
  key: TOrderStageKey;
  value: string | number;
};
const fieldUpdate = createEvent<FieldUpdatePayload>();

$orderStages.on(fieldUpdate, (state, { key, value }) => {
  const stageType = $stageType.getState();
  return { ...state, [stageType]: { ...state[stageType], [key]: value } };
});

export const handleChange = fieldUpdate.prepend(
  (
    event: ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) =>
    ({
      key: event.target.name,
      value: event.target.value,
    } as FieldUpdatePayload)
);
