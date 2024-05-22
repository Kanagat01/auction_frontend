import { TUser } from "~/entities/User";

export enum TransporterSubscriptionTranslation {
  transporter_unpaid = "Перевозчик НЕоплаченный",
  transporter_paid = "Перевозчик оплаченный",
}

export type TransporterSubscriptions =
  keyof typeof TransporterSubscriptionTranslation;

export type TransporterCompany = {
  id: number;
  user: TUser;
  company_name: string;
  subscription: TransporterSubscriptions;
};

export type TransporterManager = {
  id: number;
  user: TUser;
  company: TransporterCompany;
};

export type DriverProfile = {
  id: number;
  user: TUser;
  company: TransporterCompany;
  birth_date: string;
  passport_number: string;
  machine_data: string;
  machine_number: string;
};
