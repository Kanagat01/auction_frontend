import { CustomerManager, TransporterManager } from "~/entities/User";
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
  customerManager: CustomerManager;
  transporterManager: TransporterManager | null;
  createdAt: Date;
  updatedAt: Date;
  status: OrderStatus;
  transportationNumber: number;
  startPrice: number;
  priceStep: number;
  commentsForTransporter: string;
  additionalRequirements: string;
  transportBodyType: OrderTransportBodyType;
  transportLoadType: OrderTransportLoadType;
  transportUnloadType: OrderTransportUnloadType;
  transportVolume: number;
  tempMode: string;
  adr: number;
  transportBodyWidth: number;
  transportBodyLength: number;
  transportBodyHeight: number;
};
