import { useUnit } from "effector-react";
import { $mainData, CustomerCompany } from "~/entities/User";
import { RoundedTable, TextCenter } from "~/shared/ui";
import { fontSize } from "./helpers";

export function ManagersList() {
  const mainData = useUnit($mainData);
  return (
    <RoundedTable
      columns={[
        <TextCenter style={fontSize}>ID</TextCenter>,
        <TextCenter style={fontSize}>Менеджер</TextCenter>,
        <TextCenter style={fontSize}>Email</TextCenter>,
      ]}
      data={(mainData as CustomerCompany).managers.map(
        ({ customer_manager_id, user }) => [
          <TextCenter style={fontSize}>№{customer_manager_id}</TextCenter>,
          <TextCenter className="p-1" style={fontSize}>
            {user.full_name}
          </TextCenter>,
          <TextCenter
            className="p-1"
            style={{ ...fontSize, wordBreak: "break-word" }}
          >
            {user.email}
          </TextCenter>,
        ]
      )}
      layoutFixed={false}
    />
  );
}
