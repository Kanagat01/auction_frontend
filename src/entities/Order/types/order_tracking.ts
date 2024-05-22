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
  created_at: string;
};
