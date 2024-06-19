import { CustomerManager } from "~/entities/User";
import { TransporterManager } from "~/entities/Company";
import {
  OrderTransportBodyType,
  OrderTransportLoadType,
  OrderTransportUnloadType,
  TStages,
} from "~/entities/OrderStage";
import { OrderDocument } from "~/entities/Document";
import { OrderOffer } from "~/entities/Offer";
import { OrderTrackingGeoPoint } from "./order_tracking";

export enum OrderStatus {
  unpublished = "Не опубликован",
  cancelled = "Отменен",
  in_auction = "В аукционе",
  in_bidding = "В торгах",
  in_direct = "В напрямую",
  being_executed = "Выполняется",
  completed = "Завершен",
}
export type TOrderStatus = keyof typeof OrderStatus;

export type OrderModel = {
  id: number;
  customer_manager: CustomerManager | number;
  transporter_manager: TransporterManager | number | null;
  created_at: string;
  updated_at: string;
  status: TOrderStatus;
  transportation_number: number;
  start_price: number;
  price_step: number;
  comments_for_transporter: string;
  additional_requirements: string;
  transport_body_type: OrderTransportBodyType | number;
  transport_load_type: OrderTransportLoadType | number;
  transport_unload_type: OrderTransportUnloadType | number;
  transport_volume: number;
  temp_mode: string;
  adr: number;
  transport_body_width: number;
  transport_body_length: number;
  transport_body_height: number;
};

export const orderTranslations = {
  transportation_number: "№ Транспортировки",
  customer_manager: "Менеджер Заказчика",
  transporter_manager: "Менеджер Перевозчика",
  status: "Статус заказа",
  start_price: "Стартовая цена",
  price_step: "Шаг цены",
  comments_for_transporter: "Комментарии для перевозчика",
  additional_requirements: "Дополнительные требования",
  created_at: "Время создания",
  updated_at: "Время обновления",

  transport_body_type: "Тип кузова",
  transport_load_type: "Загрузка",
  transport_unload_type: "Выгрузка",
  transport_volume: "ТС, м3",
  temp_mode: "Темп. режим",
  adr: "ADR [шт.]",
  transport_body_width: "Ширина кузова",
  transport_body_length: "Длина кузова",
  transport_body_height: "Высота кузова",
  documents: "Документы",
  offers: "Предложения",
  tracking: "Геоточки",
  stages: "Поставки",
};

export type TGetOrder = OrderModel & {
  offers: OrderOffer[];
  tracking: OrderTrackingGeoPoint[] | null;
  documents: OrderDocument[];
  stages: TStages[];
};
