import { TransporterManager } from "~/entities/User";
import { OrderModel } from ".";

export type OrderTracking = {
  order: OrderModel;
};

export type OrderTrackingGeoPoint = {
  tracking: OrderTracking;
  latitude: number;
  longitude: number;
  createdAt: Date;
};

export type OrderDocument = {
  order: OrderModel;
  file: string;
  createdAt: Date;
};

export type OrderOffer = {
  order: OrderModel;
  transporterManager: TransporterManager;
  price: number;
  rejected: boolean;
};
