import { createEffect, createStore } from "effector";
import { TransporterCompany } from "~/entities/Company";
import { apiInstance } from "~/shared/api";
import { logger } from "~/shared/config";
import { CustomerManager, TUser } from ".";

type TGetUser = {
  user: TUser;
  customer_company_id: number;
  managers: CustomerManager[];
  allowed_transporter_companies: TransporterCompany[];
  company_name: string;
  subscription: string;
};

export const getUserFx = createEffect<any, TGetUser, any>(async () => {
  try {
    const response = await apiInstance.get("/user/common/get_user/");
    return response.data.message;
  } catch (error) {
    logger.error(error);
  }
});

export const $mainData = createStore<TGetUser | null>(null).on(
  getUserFx.doneData,
  (_, payload) => payload
);
