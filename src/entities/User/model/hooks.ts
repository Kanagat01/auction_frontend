import { useUnit } from "effector-react";
import { isDayPassed } from "~/shared/lib";
import { $mainData } from "./state";

export const useIsActive = () => {
  const mainData = useUnit($mainData);
  if (!mainData) return false;

  if ("transporter_company_id" in mainData) {
    if (mainData.balance <= 0) return false;
  } else if ("transporter_manager_id" in mainData) {
    if (mainData.company.balance <= 0) return false;
  }

  const subscription =
    "company" in mainData
      ? mainData.company.subscription
      : mainData.subscription;

  const isActive =
    subscription &&
    !(
      mainData?.user.has_unpaid_subscription &&
      isDayPassed(subscription.days_without_payment)
    );

  return isActive;
};
