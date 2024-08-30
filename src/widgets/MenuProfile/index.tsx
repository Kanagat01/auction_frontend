import { useUnit } from "effector-react";
import {
  $mainData,
  $settings,
  CompaniesList,
  CustomerCompany,
  TransporterCompany,
} from "~/entities/User";
import { formatPhoneNumber, useModalState } from "~/shared/lib";
import styles from "./styles.module.scss";
import { PopupModal } from "~/entities/Notification";

export function MenuProfile() {
  const mainData = useUnit($mainData);
  const settings = useUnit($settings);
  let orgName;
  if (mainData) {
    const company = "company" in mainData ? mainData?.company : mainData;
    const companyId =
      (company as CustomerCompany)?.customer_company_id ||
      (company as TransporterCompany)?.transporter_company_id;

    const companyName = company?.company_name || "";
    orgName = `${companyName} (${companyId})`;
  }

  const [show, changeShow] = useModalState(true);
  return (
    <div className={styles["menu-profile-info"]}>
      {mainData && "subscription" in mainData && !mainData.subscription && (
        <PopupModal
          show={show}
          title="Выберите тариф"
          description={
            <>
              Для того чтобы получить доступ ко всему функционалу сайта,
              выберите тариф и сделайте абонентскую плату. Для этого вам нужно
              перейти в <br /> "Настройки {">"} Тарифы"
            </>
          }
          handleClose={changeShow}
        />
      )}
      {mainData &&
        "transporter_company_id" in mainData &&
        mainData.balance <= 0 && (
          <PopupModal
            show={show}
            title="Пополните баланс"
            description={
              <>
                Ваш баланс равен или меньше нуля. Функционал будет ограничен
                просмотром информации и переходом по разделам. Пожалуйста
                пополните баланс
              </>
            }
            handleClose={changeShow}
          />
        )}

      <div className={`${styles["profile-main"]} align-items-end`}>
        <span className={styles["full-name"]}>
          {mainData
            ? `${Number(
                ("balance" in mainData ? mainData : mainData.company).balance
              ).toLocaleString("ru-RU", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })} Rub`
            : ""}
        </span>
        <span className={styles["org-name"]}>
          {settings?.phone_number
            ? formatPhoneNumber(settings.phone_number)
            : ""}
        </span>
      </div>
      <div className="rounded-block company-logo">
        {mainData?.user.full_name[0]}
      </div>
      <div className={styles["profile-main"]}>
        <span className={styles["full-name"]}>{mainData?.user.full_name}</span>
        <span className={styles["org-name"]}>{orgName}</span>
      </div>
      {mainData?.user.user_type === "customer_company" ? (
        <CompaniesList
          companies={
            (mainData as CustomerCompany).allowed_transporter_companies
          }
        />
      ) : (
        ""
      )}
    </div>
  );
}
