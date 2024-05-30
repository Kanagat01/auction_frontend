import {
  TStages,
  OrderTransportBodyType,
  OrderTransportLoadType,
  OrderTransportUnloadType,
} from "~/entities/OrderStage";

export type AddOrderStageRequest = { order_id: number } & Partial<TStages>;
export type EditOrderStageRequest = {
  order_stage_id: number;
} & Partial<TStages>;

export type PreCreateOrderResponse = {
  transport_body_types: OrderTransportBodyType[];
  transport_load_types: OrderTransportLoadType[];
  transport_unload_types: OrderTransportUnloadType[];
};
