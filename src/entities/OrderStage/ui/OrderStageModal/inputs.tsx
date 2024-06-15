import { ChangeEvent } from "react";
import { createEvent } from "effector";
import { useStoreMap } from "effector-react";
import {
  OrderStageTranslations,
  TOrderStageKey,
  TStage,
} from "~/entities/OrderStage";
import { InputContainer } from "~/shared/ui";
import { $orderStages, $stageType, initialOrderStage } from "./state";

type FieldUpdatePayload = {
  key: TOrderStageKey;
  value: string | number;
};
const fieldUpdate = createEvent<FieldUpdatePayload>();

$orderStages.on(fieldUpdate, (state, { key, value }) => {
  const stageType = $stageType.getState();
  return { ...state, [stageType]: { ...state[stageType], [key]: value } };
});

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

export const StageTypeInput = ({ value }: { value: TStage }) => {
  return (
    <InputContainer
      name="stage"
      label="Тип этапа"
      value={value}
      className="w-100 h-auto mb-3"
      variant="bootstrap-select"
      options={[
        ["load_stage", "Погрузка"],
        ["unload_stage", "Выгрузка"],
      ]}
      label_style={{
        color: "var(--default-font-color)",
      }}
      disabled
    />
  );
};

type FieldProps = { name: TOrderStageKey; stageType: TStage };

export const Field = ({ name, stageType }: FieldProps) => {
  const value = useStoreMap({
    store: $orderStages,
    keys: [name, stageType],
    fn: (values, [name, stageType]) => values[stageType][name] || "",
  });
  return (
    <InputContainer
      {...{ name, value, onChange: handleChange }}
      label={OrderStageTranslations[name]}
      variant={name === "comments" ? "textarea" : "input"}
      type={
        name === "date"
          ? "date"
          : typeof initialOrderStage[name] === "number"
          ? "number"
          : "text"
      }
      label_style={{ color: "var(--default-font-color)" }}
      className="w-100 mb-2"
    />
  );
};

export const TimeInput = ({ name, stageType }: FieldProps) => {
  const value = useStoreMap({
    store: $orderStages,
    keys: [name, stageType],
    fn: (values, [name, stageType]) => values[stageType][name] || "",
  });
  return (
    <InputContainer
      {...{ name, value, onChange: handleChange }}
      label={OrderStageTranslations[name]}
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
