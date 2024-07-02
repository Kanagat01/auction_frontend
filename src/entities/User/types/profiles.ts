import { TUser, CustomerSubscriptions, TransporterSubscriptions } from ".";

export type TransporterCompany = {
  transporter_company_id: number;
  user: TUser;
  company_name: string;
  subscription: TransporterSubscriptions;
  managers: Omit<TransporterManager, "company">;
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
  allowed_transporter_companies: TransporterCompany[];
};

export interface CustomerManager {
  customer_manager_id: number;
  user: TUser;
  company: Omit<
    CustomerCompany,
    "allowed_transporter_companies" | "managers" | "user"
  >;
}
