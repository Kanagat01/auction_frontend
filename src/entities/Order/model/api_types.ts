import { OrderModel } from "~/entities/Order";
import { TStages } from "~/entities/OrderStage";
import { DriverProfile } from "~/entities/User";

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
export type PublishOrderRequest =
  | {
      order_id: number;
      publish_to: "in_bidding" | "in_direct";
    }
  | {
      order_id: number;
      publish_to: "in_auction";
      transporter_company_id: number;
      price: number;
    };

export type AddDriverDataRequest = {
  order_id: number;
  full_name: string;
} & Omit<
  DriverProfile,
  "driver_id" | "user_or_fullname" | "companies" | "birth_date"
>;
