import { OrderModel } from ".";

export type OrderTracking = {
  id: number;
  order: OrderModel;
  geopoints: OrderTrackingGeoPoint[];
};

export type OrderTrackingGeoPoint = {
  id: number;
  latitude: number;
  longitude: number;
  created_at: string;
};
