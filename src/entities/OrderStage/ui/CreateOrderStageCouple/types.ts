import { OrderStages } from "~/entities/OrderStage";

export type TOrderStageKey = keyof Omit<
  OrderStages,
  "id" | "time_start" | "time_end"
>;

export type FieldUpdatePayload = {
  key: TOrderStageKey;
  value: string | number;
};
