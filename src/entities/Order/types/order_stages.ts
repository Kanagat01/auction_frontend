import { OrderModel } from ".";

export type OrderStageCouple = {
  order: OrderModel;
  createdAt: Date;
  updatedAt: Date;
  orderStageNumber: number;
};

export type OrderStages = {
  date: Date;
  timeStart: string;
  timeEnd: string;
  company: string;
  address: string;
  contactPerson: string;
  cargo: string;
  weight: number;
  volume: number;
  comments: string;
};

export type OrderLoadStage = {
  order_couple: OrderStageCouple;
};

export type OrderUnloadStage = OrderLoadStage;
