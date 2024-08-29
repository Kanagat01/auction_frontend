import { TUser, CustomerSubscription, TransporterSubscription } from ".";

type Company = {
  user: TUser;
  company_name: string;
  balance: number;
  details: string;
};

export type TransporterCompany = Company & {
  transporter_company_id: number;
  managers: Omit<TransporterManager, "company">[];
  subscription: TransporterSubscription | null;
  subscriptions_list: TransporterSubscription[];
};

export type TransporterManager = {
  transporter_manager_id: number;
  user: TUser;
  company: Omit<TransporterCompany, "managers" | "user">;
};

export type CustomerCompany = Company & {
  customer_company_id: number;
  managers: Omit<CustomerManager, "company">[];
  subscription: CustomerSubscription | null;
  subscriptions_list: CustomerSubscription[];
  allowed_transporter_companies: Omit<
    TransporterCompany,
    "managers" | "user"
  >[];
};

export type CustomerManager = {
  customer_manager_id: number;
  user: TUser;
  company: Omit<
    CustomerCompany,
    "allowed_transporter_companies" | "managers" | "user"
  >;
  allowed_transporter_companies: TransporterCompany[];
};

export type DriverProfile = {
  driver_id: number;
  user: TUser;
  birth_date: string;
  passport_number: string;
  phone_number: string;
  machine_data: string;
  machine_number: string;
};

export type DriverProfileTranslationKey =
  | keyof Omit<DriverProfile, "user">
  | "full_name";

export const DriverProfileTranslations: Record<
  DriverProfileTranslationKey,
  string
> = {
  driver_id: "ID",
  birth_date: "Дата рождения",
  full_name: "ФИО водителя",
  passport_number: "Номер паспорта",
  phone_number: "Телефон",
  machine_data: "Машина",
  machine_number: "Номер машины",
};
