import { useStoreMap, useUnit } from "effector-react";
import {
  OrderStageTranslations,
  TOrderStageKey,
  TStage,
} from "~/entities/OrderStage";
import { InputContainer } from "~/shared/ui";
import {
  $orderStages,
  $stageType,
  handleChange,
  initialOrderStage,
} from "./state";

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

export const Field = ({ name }: { name: TOrderStageKey }) => {
  const stageType = useUnit($stageType);
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

export const TimeInput = ({ name }: { name: "time_start" | "time_end" }) => {
  const stageType = useUnit($stageType);
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
