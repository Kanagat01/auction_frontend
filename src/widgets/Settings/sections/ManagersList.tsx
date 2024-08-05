import { useUnit } from "effector-react";
import { $mainData, CustomerCompany } from "~/entities/User";
import { Checkbox, RoundedTable, TextCenter } from "~/shared/ui";
import { $selectedManager, fontSize, setSelectedManager } from "./helpers";

export function ManagersList() {
  const mainData = useUnit($mainData);
  const selectedManager = useUnit($selectedManager);
  return (
    <RoundedTable
      columns={[
        <TextCenter style={fontSize}>ID</TextCenter>,
        <TextCenter style={fontSize}>Менеджер</TextCenter>,
        <TextCenter style={fontSize}>Email</TextCenter>,
      ]}
      data={(mainData as CustomerCompany).managers.map(
        ({ customer_manager_id: id, user: { email, full_name } }) => [
          <Checkbox
            id={id.toString()}
            label={`№${id}`}
            checked={selectedManager?.manager_id === id}
            onChange={() =>
              setSelectedManager(
                selectedManager?.manager_id !== id
                  ? { manager_id: id, full_name, email }
                  : null
              )
            }
            className="me-2"
            labelStyle={fontSize}
          />,
          <TextCenter className="p-1" style={fontSize}>
            {full_name}
          </TextCenter>,
          <TextCenter
            className="p-1"
            style={{ ...fontSize, wordBreak: "break-word" }}
          >
            {email}
          </TextCenter>,
        ]
      )}
      layoutFixed={false}
    />
  );
}
