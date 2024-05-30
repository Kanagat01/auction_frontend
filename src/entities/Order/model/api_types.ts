import { OrderModel, OrderStatus } from "~/entities/Order";
import { TStages } from "~/entities/OrderStage";

export type CreateOrderRequest = Omit<
  OrderModel,
  | "id"
  | "customer_manager"
  | "transporter_manager"
  | "created_at"
  | "updated_at"
  | "status"
  | "adr"
> & { stages: TStages[] };

export type EditOrderRequest = { order_id: number } & Partial<
  Omit<
    OrderModel,
    | "customer_manager"
    | "id"
    | "created_at"
    | "updated_at"
    | "transporter_manager"
    | "order_type"
  >
>;

export type CancelOrderRequest = { order_id: number };
export type UnpublishOrderRequest = { order_id: number };
export type CompleteOrderRequest = { order_id: number };
export type PublishOrderRequest = {
  order_id: number;
  publish_to:
    | OrderStatus.in_auction
    | OrderStatus.in_bidding
    | OrderStatus.in_direct;
};
