import { TransporterCompany } from "~/entities/Company";
import { CustomerManager, TUser } from "~/entities/User";

export type GetMainDataResponse = {
  user: TUser;
  customer_company_id: number;
  managers: CustomerManager[];
  allowed_transporter_companies: TransporterCompany[];
  company_name: string;
  subscription: string;
};
