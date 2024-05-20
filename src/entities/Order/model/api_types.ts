import {
  OrderModel,
  OrderStatus,
  OrderTransportBodyType,
  OrderTransportLoadType,
  OrderTransportUnloadType,
  TStages,
} from "~/entities/Order";

export type PreCreateOrderResponse = {
  transport_body_types: OrderTransportBodyType[];
  transport_load_types: OrderTransportLoadType[];
  transport_unload_types: OrderTransportUnloadType[];
};

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

export type AddOrderStageRequest = { order_id: number } & TStages;
export type EditOrderStageRequest = { order_stage_id: number } & TStages;

export type AcceptOfferRequest = { order_offer_id: number };
export type RejectOfferRequest = { order_offer_id: number };

export type CancelOrderRequest = { order_id: number };
export type UnpublishOrderRequest = { order_id: number };
export type PublishOrderRequest = {
  order_id: number;
  publish_to:
    | OrderStatus.in_auction
    | OrderStatus.in_bidding
    | OrderStatus.in_direct;
};
export type CompleteOrderRequest = { order_id: number };

export type AddDocumentRequest = { order_id: number; file: File };
export type DeleteDocumentRequest = { document_id: number };
