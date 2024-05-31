import { CSSProperties } from "react";
import { OrderStages } from "~/entities/OrderStage";
import { InputProps, BootstrapSelectProps } from "~/shared/ui";

export const OrderStageTranslations: Record<
  keyof Omit<OrderStages, "id" | "time_start" | "time_end">,
  string
> = {
  date: "Дата",
  company: "Компания",
  address: "Адрес",
  contact_person: "Контактное лицо",
  cargo: "Груз",
  weight: "Вес",
  volume: "Обьем",
  comments: "Комментарий к поставке",
};

export const stageInputProps: Partial<BootstrapSelectProps> = {
  className: "w-100 h-auto mb-3",
  label_style: {
    color: "var(--default-font-color)",
  },
  required: true,
  disabled: true,
};

export const baseInputProps = {
  label_style: { color: "var(--default-font-color)" },
  className: "w-100 mb-2",
  required: true,
};

export const timeInputProps: Partial<InputProps> = {
  type: "time",
  className: "mb-0",
  label_style: { color: "var(--default-font-color)" },
  container_style: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 0,
    width: "100%",
    marginBlock: "1rem",
  },
  required: true,
};

export const timeDivStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "1rem",
  marginRight: "0.7rem",
};

export const modalButtonsStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  marginTop: "1.5rem",
  gap: "3rem",
};

export const modalBtnStyle: CSSProperties = {
  width: "100%",
  padding: "0.5rem 2rem",
  fontSize: "1.6rem",
};
