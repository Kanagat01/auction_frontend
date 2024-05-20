import { CustomerManager } from "~/entities/User";
import { TransporterManager } from "~/entities/Company";
import {
  OrderTransportBodyType,
  OrderTransportLoadType,
  OrderTransportUnloadType,
} from ".";

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

export enum OrderTranslations {
  id = "id",
  customer_manager = "Менеджер Заказчика",
  transporter_manager = "Менеджер Перевозчика",
  created_at = "Время создания",
  updated_at = "Время обновления",
  status = "Статус заказа",
  transportation_number = "Номер транспортировки",
  start_price = "Стартовая цена",
  price_step = "Шаг цены",
  comments_for_transporter = "Комментарии для перевозчика",
  additional_requirements = "Дополнительные требования",
  transport_body_type = "Тип кузова транспорта",
  transport_load_type = "Тип загрузки транспорта",
  transport_unload_type = "Тип выгрузки транспорта",
  transport_volume = "Объем ТС (м3)",
  temp_mode = "Температурный режим",
  adr = "ADR [шт.]",
  transport_body_width = "Ширина кузова",
  transport_body_length = "Длина кузова",
  transport_body_height = "Высота кузова",
}

export type OrderModel = {
  id: number;
  customer_manager: CustomerManager;
  transporter_manager: TransporterManager | null;
  created_at: Date;
  updated_at: Date;
  status: OrderStatus;
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
