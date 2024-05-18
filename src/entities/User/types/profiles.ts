import { OrderModel } from "~/entities/Order";
import { UserModel, CustomerSubscriptions, TransporterSubscriptions } from ".";

export type TransporterCompany = {
  user: UserModel;
  companyName: string;
  subscription: TransporterSubscriptions;
};

export type CustomerCompany = {
  user: UserModel;
  companyName: string;
  subscription: CustomerSubscriptions;
  allowedTransporterCompanies: TransporterCompany[];
};

export type CustomerManager = {
  user: UserModel;
  company: CustomerCompany;
};

export type TransporterManager = {
  user: UserModel;
  company: TransporterCompany;
};

export type DriverProfile = {
  user: UserModel;
  company: TransporterCompany;
};

export type OrderViewer = {
  user: UserModel;
  order: OrderModel;
};
