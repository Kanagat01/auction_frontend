export type TOrder = {
  id: number;
  client: string;
  loadingPeriod: string;
  startCity: string;
  O: number;
  op: number;
  loadingDate: Date;
  unloadingDate: Date;
  destinationCity: string;
  postalCode: string;
  volume: number;
  weight: number;
  comments?: string;
};
