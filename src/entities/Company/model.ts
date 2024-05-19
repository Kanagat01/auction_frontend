import { createEvent, createEffect } from "effector";
import { apiInstance } from "~/shared/api";
import { logger } from "~/shared/config";

const addToAllowedFx = createEffect(async (transporter_company_id: number) => {
  try {
    const response = await apiInstance.post(
      "/user/customer/add_transporter_to_allowed_companies/",
      { transporter_company_id }
    );
    return response.data.message;
  } catch (error) {
    logger.error(error);
  }
});

const deleteFromAllowedFx = createEffect(
  async (transporter_company_id: number) => {
    try {
      const response = await apiInstance.post(
        "/user/customer/delete_transporter_from_allowed_companies/",
        { transporter_company_id }
      );
      return response.data.message;
    } catch (error) {
      logger.error(error);
    }
  }
);

export const addTransportToAllowed = createEvent<number>().watch(
  (transporter_company_id) => {
    addToAllowedFx(transporter_company_id);
  }
);

export const deleteTransportFromAllowed = createEvent<number>().watch(
  (transporter_company_id) => {
    deleteFromAllowedFx(transporter_company_id);
  }
);
