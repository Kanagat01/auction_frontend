import { createEvent, createEffect, attach, Effect } from "effector";
import { RequestParams, apiInstance, apiRequestFx } from "~/shared/api";
import { logger } from "~/shared/config";

// TODO: change type any
const addToAllowedFx: Effect<{ transporter_company_id: number }, any> = attach({
  effect: apiRequestFx,
  mapParams: (data): RequestParams => ({
    method: "post",
    url: "/user/customer/add_transporter_to_allowed_companies/",
    data,
  }),
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

export const addTransportToAllowed = createEvent<number>();
addTransportToAllowed.watch((transporter_company_id) => {
  addToAllowedFx({ transporter_company_id });
});

export const deleteTransportFromAllowed = createEvent<number>();
deleteTransportFromAllowed.watch((transporter_company_id) => {
  deleteFromAllowedFx(transporter_company_id);
});
