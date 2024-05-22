import { OrderModel } from "~/entities/Order";

export type OrderStageCouple = {
  id: number;
  order: OrderModel;
  created_at: Date;
  updated_at: Date;
  order_stage_number: number;
};

export type OrderStages = {
  id: number;
  date: string;
  time_start: string;
  time_end: string;
  company: string;
  address: string;
  contact_person: string;
  cargo: string;
  weight: number;
  volume: number;
  comments: string;
};

export type OrderLoadStage = {
  id: number;
  order_couple: OrderStageCouple;
};

export type OrderUnloadStage = OrderLoadStage;

export type TStages = Partial<{
  load_stage: Omit<OrderStages, "id">;
  unload_stage: Omit<OrderStages, "id">;
}>;
