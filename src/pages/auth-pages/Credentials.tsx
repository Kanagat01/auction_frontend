import { useUnit } from "effector-react";
import { useTranslation } from "react-i18next";
import { createEffect, createStore } from "effector";
import { apiInstance } from "~/shared/api";

type TSettings = { phone_number: string; email: string };

const getSettingsFx = createEffect<void, TSettings>(async () => {
  try {
    const response = await apiInstance.get("user/common/get_settings/");
    return response.data.message;
  } catch (err) {
    console.error(err);
  }
});
getSettingsFx();

const $settings = createStore<TSettings | null>(null).on(
  getSettingsFx.doneData,
  (_, state) => state
);

export function Credentials() {
  const { t } = useTranslation();
  const settings = useUnit($settings);
  return (
    <div className="login-page-bottom">
      <div className="d-flex align-items-center justify-content-between">
        <a href={`mailto:${settings?.email}`}>{settings?.email}</a>
        <a href={`tel:${settings?.phone_number}`}>{settings?.phone_number}</a>
      </div>
      <p className="copyright">&copy; {t("common.credentials")}</p>
    </div>
  );
}
