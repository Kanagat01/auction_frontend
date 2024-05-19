import { TUser } from ".";
import { OrderModel } from "~/entities/Order";
import { TransporterCompany } from "~/entities/Company";

export enum CustomerSubscriptionTranslation {
  customer_unpaid = "Заказчик НЕоплаченный",
  customer_paid = "Заказчик оплаченный",
}
export type CustomerSubscriptions =
  keyof typeof CustomerSubscriptionTranslation;

export type CustomerCompany = {
  id: number;
  user: TUser;
  company_name: string;
  subscription: CustomerSubscriptions;
  allowedTransporterCompanies: TransporterCompany[];
};

export type CustomerManager = {
  id: number;
  user: TUser;
  company: CustomerCompany;
};

export type OrderViewer = {
  id: number;
  user: TUser;
  order: OrderModel;
};
