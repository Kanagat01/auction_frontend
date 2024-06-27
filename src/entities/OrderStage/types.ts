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

export type TOrderStageKey = keyof Omit<OrderStages, "id">;

export const OrderStageTranslations: Record<TOrderStageKey, string> = {
  date: "Дата",
  company: "Компания",
  address: "Адрес",
  contact_person: "Контактное лицо",
  cargo: "Груз",
  weight: "Вес",
  volume: "Обьем",
  comments: "Комментарий к поставке",
  time_start: "С",
  time_end: "По",
};

export type OrderLoadStage = {
  id: number;
  order_couple: OrderStageCouple;
};

export type OrderUnloadStage = OrderLoadStage;

export type TStages = {
  order_stage_number: number;
  load_stage: Omit<OrderStages, "id"> & { id?: number };
  unload_stage: Omit<OrderStages, "id"> & { id?: number };
};

export type TStage = "load_stage" | "unload_stage";

type NameType = {
  id: number;
  name: string;
};

export type OrderTransportBodyType = NameType;
export type OrderTransportLoadType = NameType;
export type OrderTransportUnloadType = NameType;
