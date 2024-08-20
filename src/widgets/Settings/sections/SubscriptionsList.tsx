import { useUnit } from "effector-react";
import { FiCheck } from "react-icons/fi";
import {
  $mainData,
  CustomerCompany,
  CustomerSubscriptionTranslation,
  getRole,
  TransporterCompany,
  TransporterSubscriptionTranslation,
} from "~/entities/User";
import { RoundedTable, TextCenter } from "~/shared/ui";
import { fontSize } from "./helpers";

export function SubscriptionsList() {
  const mainData = useUnit($mainData);
  const role = getRole(mainData?.user.user_type ?? "");
  const translation =
    role === "customer"
      ? CustomerSubscriptionTranslation
      : TransporterSubscriptionTranslation;
  return (
    <RoundedTable
      columns={[
        <TextCenter style={fontSize}>Тариф</TextCenter>,
        <TextCenter style={fontSize}>Выбран</TextCenter>,
      ]}
      data={Object.keys(translation).map((key) => [
        <TextCenter style={fontSize}>
          {translation[key as keyof typeof translation]}
        </TextCenter>,
        <TextCenter>
          {key ===
          (mainData as CustomerCompany | TransporterCompany).subscription ? (
            <FiCheck
              className="ms-auto"
              color="var(--success)"
              style={{ width: "3rem", height: "2.5rem" }}
            />
          ) : (
            ""
          )}
        </TextCenter>,
      ])}
      layoutFixed={false}
    />
  );
}
