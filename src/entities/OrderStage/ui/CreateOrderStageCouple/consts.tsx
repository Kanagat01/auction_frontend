import { createEvent, createStore } from "effector";
import { OrderStages, TStages } from "~/entities/OrderStage";
import { InputContainer } from "~/shared/ui";
import { FieldUpdatePayload, TOrderStageKey } from "./types";
import { ChangeEvent } from "react";
import { logger } from "~/shared/config";

export const $stageType = createStore<"load" | "unload">("load");
export const setStageType = createEvent<"load" | "unload">();
$stageType.on(setStageType, (_, payload) => payload);

export const StageTypeInput = () => (
  <InputContainer
    name="stage"
    label="Тип этапа"
    variant="bootstrap-select"
    className="w-100 h-auto mb-3"
    value={$stageType.getState()}
    options={[
      ["load", "Погрузка"],
      ["unload", "Выгрузка"],
    ]}
    label_style={{
      color: "var(--default-font-color)",
    }}
    disabled
  />
);

const OrderStageTranslations: Record<TOrderStageKey, string> = {
  date: "Дата",
  company: "Компания",
  address: "Адрес",
  contact_person: "Контактное лицо",
  cargo: "Груз",
  weight: "Вес",
  volume: "Обьем",
  comments: "Комментарий к поставке",
};

const initialOrderStage = {
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
const $orderStages = createStore<TStages>({
  load_stage: initialOrderStage,
  unload_stage: initialOrderStage,
});

const fieldUpdate = createEvent<FieldUpdatePayload>();
$orderStages.on(fieldUpdate, (state, { key, value }) => ({
  ...state,
  [key]: value,
}));
const handleChange = fieldUpdate.prepend(
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

export const Field = ({
  name,
}: {
  name: keyof Omit<OrderStages, "id" | "time_start" | "time_end">;
}) => {
  const value =
    $orderStages.getState()[`${$stageType.getState()}_stage`][
      name as TOrderStageKey
    ];
  return (
    <InputContainer
      {...{ name, value, onChange: handleChange }}
      label={OrderStageTranslations[name]}
      variant={name === "comments" ? "textarea" : "input"}
      type={name === "date" ? "date" : "text"}
      label_style={{ color: "var(--default-font-color)" }}
      className="w-100 mb-2"
    />
  );
};

export const TimeInput = ({ name }: { name: "time_start" | "time_end" }) => {
  const value =
    $orderStages.getState()[`${$stageType.getState()}_stage`][
      name as TOrderStageKey
    ];
  return (
    <InputContainer
      {...{ name, value, onChange: handleChange }}
      label={name === "time_start" ? "С" : "По"}
      variant="input"
      type="time"
      className="mb-0"
      label_style={{ color: "var(--default-font-color)" }}
      container_style={{
        flexDirection: "row",
        alignItems: "center",
        marginRight: 0,
        width: "100%",
        marginBlock: "1rem",
      }}
    />
  );
};

export const addStageCouple = () => {
  logger.log($orderStages.getState());
};

export const clearStages = () => {};
