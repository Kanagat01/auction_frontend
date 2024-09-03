import { useUnit } from "effector-react";
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

  const today = new Date();
  const isActive =
    subscription &&
    (mainData?.user.subscription_paid ||
      today.getDate() <= subscription.days_without_payment);

  return isActive;
};
