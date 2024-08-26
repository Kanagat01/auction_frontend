import { TStages } from "~/entities/OrderStage";
import { OrderDocument } from "~/entities/Document";
import { OrderOffer } from "~/entities/Offer";
import { OrderTracking } from "./order_tracking";
import {
  CustomerManager,
  DriverProfile,
  TransporterManager,
} from "~/entities/User";

export enum OrderStatus {
  unpublished = "unpublished",
  cancelled = "cancelled",
  in_auction = "in_auction",
  in_bidding = "in_bidding",
  in_direct = "in_direct",
  being_executed = "being_executed",
  completed = "completed",
}
export type TOrderStatus = keyof typeof OrderStatus;

export const OrderStatusTranslation: Record<TOrderStatus, string> = {
  unpublished: "Не опубликован",
  cancelled: "Отменен",
  in_auction: "В аукционе",
  in_bidding: "В торгах",
  in_direct: "Назначенные",
  being_executed: "Выполняется",
  completed: "Завершен",
};

export type OrderModel = {
  id: number;
  customer_manager: CustomerManager;
  transporter_manager?: TransporterManager;
  driver?: DriverProfile;
  created_at: string;
  updated_at: string;
  status: TOrderStatus;
  transportation_number: number;
  start_price: number;
  price_step: number;
  comments_for_transporter?: string;
  additional_requirements?: string;
  transport_body_type: number;
  transport_load_type: number;
  transport_unload_type: number;
  transport_volume: number;
  temp_mode?: string;
  adr?: number;
  transport_body_width?: number;
  transport_body_length?: number;
  transport_body_height?: number;
};

export type TPriceData =
  | { offer_id: number; price: number }
  | { current_price: number }
  | {
      offer_id: number;
      price: number;
      current_price: number;
      is_best_offer: boolean;
    };

export type TGetOrder = OrderModel & {
  offers?: OrderOffer[];
  tracking?: OrderTracking | null;
  documents: OrderDocument[];
  stages: TStages[];
  price_data?: TPriceData;
  application_type?: "in_auction" | "in_bidding" | "in_direct";

  // параметр существует если заказ добавлен через сокет
  isNewOrder?: boolean;
};

export type TColumn = TGetOrder & {
  stages_cnt: number;
  loading_time: string;
  loading_date: string;
  unloading_date: string;
  city_from: string;
  city_to: string;
  postal_code: string;
  weight: number;
  volume: number;

  offer_price: number;
  final_price: number;

  best_offer_price: number;
  best_offer_company: string;
  transporter: string;
};

export const orderTranslations: Record<
  Exclude<keyof TColumn, "isNewOrder">,
  string
> = {
  id: "id",
  transportation_number: "№ Транспортировки",
  customer_manager: "Менеджер Заказчика",
  transporter_manager: "Менеджер Перевозчика",
  driver: "Водитель",
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
  adr: "ADR",
  transport_body_width: "Ширина кузова",
  transport_body_length: "Длина кузова",
  transport_body_height: "Высота кузова",

  // TGetOrder
  documents: "Документы",
  offers: "Предложения",
  tracking: "Геоточки",
  stages: "Поставки",
  price_data: "Данные о цене",

  // table columns
  stages_cnt: "Поставки, количество",
  loading_time: "Время погрузки",
  loading_date: "Дата погрузки",
  unloading_date: "Дата выгрузки",
  city_from: "Город-старт",
  city_to: "Город-место назначения",
  postal_code: "Индекс",
  volume: "Обьем",
  weight: "Вес",
  offer_price: "Ставка",
  final_price: "Стоимость перевозки",
  application_type: "Тип заявки",
  best_offer_price: "Лучшее предложение",
  best_offer_company: "Компания с луч. предл.",
  transporter: "Перевозчик",
};
