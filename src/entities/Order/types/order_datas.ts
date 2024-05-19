import { TransporterManager } from "~/entities/Company";
import { OrderModel } from ".";

export type OrderTracking = {
  id: number;
  order: OrderModel;
};

export type OrderTrackingGeoPoint = {
  id: number;
  tracking: OrderTracking;
  latitude: number;
  longitude: number;
  created_at: Date;
};

export type OrderDocument = {
  id: number;
  order: OrderModel;
  file: string;
  created_at: Date;
};

export type OrderOffer = {
  id: number;
  order: OrderModel;
  transporter_manager: TransporterManager;
  price: number;
  rejected: boolean;
};
