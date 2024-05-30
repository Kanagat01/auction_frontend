import { CustomerManager } from "~/entities/User";
import { TransporterManager } from "~/entities/Company";
import {
  OrderTransportBodyType,
  OrderTransportLoadType,
  OrderTransportUnloadType,
} from "~/entities/OrderStage";

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
  created_at: Date | string;
  updated_at: Date | string;
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

export const orderTranslations: Record<
  Exclude<keyof OrderModel, "id">,
  string
> = {
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

  transport_body_type: "Тип кузова транспорта",
  transport_load_type: "Тип загрузки транспорта",
  transport_unload_type: "Тип выгрузки транспорта",
  transport_volume: "Объем ТС (м3)",
  temp_mode: "Температурный режим",
  adr: "ADR [шт.]",
  transport_body_width: "Ширина кузова",
  transport_body_length: "Длина кузова",
  transport_body_height: "Высота кузова",
};
