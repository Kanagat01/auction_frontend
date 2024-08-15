import { TUser, CustomerSubscriptions, TransporterSubscriptions } from ".";

export type TransporterCompany = {
  transporter_company_id: number;
  user: TUser;
  company_name: string;
  subscription: TransporterSubscriptions;
  managers: Omit<TransporterManager, "company">[];
  details: string;
};

export type TransporterManager = {
  transporter_manager_id: number;
  user: TUser;
  company: Omit<TransporterCompany, "managers" | "user">;
};

export type CustomerCompany = {
  customer_company_id: number;
  managers: Omit<CustomerManager, "company">[];
  user: TUser;
  company_name: string;
  subscription: CustomerSubscriptions;
  allowed_transporter_companies: Omit<
    TransporterCompany,
    "managers" | "user"
  >[];
  details: string;
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
  user_or_fullname: TUser | { full_name: string };
  companies: Omit<TransporterCompany, "managers" | "user">[];
  birth_date: string;
  passport_number: string;
  phone_number: string;
  machine_data: string;
  machine_number: string;
};

export type DriverProfileTranslationKey =
  | keyof Omit<DriverProfile, "user_or_fullname" | "companies">
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
  machine_data: "Данные авто",
  machine_number: "Номер авто",
};
