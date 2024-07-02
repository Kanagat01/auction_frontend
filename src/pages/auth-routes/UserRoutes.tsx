import { useUnit } from "effector-react";
import { Outlet } from "react-router-dom";
import { $mainData } from "~/entities/User";
import { TitleLg } from "~/shared/ui";

export function TransporterRoute() {
  const mainData = useUnit($mainData);
  return ["transporter_company", "transporter_manager"].includes(
    mainData?.user.user_type ?? ""
  ) ? (
    <Outlet />
  ) : (
    <TitleLg>У вас нет разрешений для просмотра данной страницы</TitleLg>
  );
}

export function CustomerRoute() {
  const mainData = useUnit($mainData);
  return ["customer_company", "customer_manager"].includes(
    mainData?.user.user_type ?? ""
  ) ? (
    <Outlet />
  ) : (
    <TitleLg>У вас нет разрешений для просмотра данной страницы</TitleLg>
  );
}
