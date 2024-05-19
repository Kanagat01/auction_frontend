import { createEffect } from "effector";
import { apiInstance } from "~/shared/api";

type RegisterCompany = {
  email: string;
  password: string;
  full_name: string;
  company_name: string;
};

type RegisterManager = Omit<RegisterCompany, "company_name">;

export const registerTransporterFx = createEffect<any, string, any>(
  async (data: RegisterCompany) => {
    const response = await apiInstance.post(
      "/user/auth/register_transporter/",
      data
    );
    return response.data.token;
  }
);
export const registerCustomerFx = createEffect<any, string, any>(
  async (data: RegisterCompany) => {
    const response = await apiInstance.post(
      "/user/auth/register_customer/",
      data
    );
    return response.data.token;
  }
);

export const registerManagerFx = createEffect<any, string, any>(
  async (data: RegisterManager) => {
    const response = await apiInstance.post(
      "/user/common/register_manager/",
      data
    );
    return response.data.token;
  }
);
