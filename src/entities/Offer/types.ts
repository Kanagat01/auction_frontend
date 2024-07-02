import { TransporterManager } from "~/entities/User";
import { OrderModel } from "~/entities/Order";

export type OrderOffer = {
  id: number;
  order: OrderModel;
  transporter_manager: TransporterManager;
  price: number;
  rejected: boolean;
};
