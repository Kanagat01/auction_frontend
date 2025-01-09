import { t } from "i18next";
import { createEffect } from "effector";
import { AxiosError, AxiosRequestConfig } from "axios";
import { apiInstance } from ".";

export const apiRequestFx = createEffect<
  AxiosRequestConfig<object>,
  any,
  Error
>(async ({ method, url, data }) => {
  try {
    const response = await apiInstance({ method, url, data });
    return response?.data?.message;
  } catch (error) {
    if (error instanceof AxiosError) {
      if (error.response?.status! > 499)
        throw t("common.serverError", { code: error.response?.status });
      const data = error.response?.data;
      if (data && "detail" in data && !("message" in data)) {
        if (
          data.detail ===
          "У вас недостаточно прав для выполнения данного действия." // Джанго ошибка, не переводим
        ) {
          setTimeout(() => {
            window.location.reload();
          }, 5000);
          throw t("common.actionForbidden");
        }
        throw data.detail;
      }
      throw data?.message;
    } else {
      throw error;
    }
  }
});
