import { OrderModel } from "~/entities/Order";

export type OrderDocument = {
  id: number;
  order: OrderModel;
  file: string;
  created_at: Date;
};
