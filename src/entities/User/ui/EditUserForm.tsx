import {
  ChangeEvent,
  Dispatch,
  FormEvent,
  SetStateAction,
  useState,
} from "react";
import { useUnit } from "effector-react";
import { EditField, InputProps, PrimaryButton } from "~/shared/ui";
import { $mainData, CustomerCompany, editUser, EditUserRequest } from "..";

type EditUserFormProps = {
  isEditing: boolean;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
};

export function EditUserForm({ isEditing, setIsEditing }: EditUserFormProps) {
  const mainData = useUnit($mainData);
  const isCompany = mainData?.user.user_type.split("_")[1] === "company";

  const initialData = {
    email: mainData?.user.email ?? "",
    full_name: mainData?.user.full_name ?? "",
    company_name: (mainData as CustomerCompany).company_name ?? "",
  };
  const [data, setData] = useState<EditUserRequest>(initialData);
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const inputs: Omit<InputProps, "variant">[] = [
    { label: "Email", value: data.email, name: "email" },
    { label: "Ф.И.О.", value: data.full_name, name: "full_name" },
    {
      style: !isCompany ? { display: "none" } : {},
      labelStyle: !isCompany ? { display: "none" } : {},
      name: "company_name",
      label: "Название компании",
      value: data.company_name,
      required: isCompany,
    },
  ];

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    editUser({ setIsEditing, ...data });
  };
  const onReset = () => {
    setData(initialData);
    setIsEditing(false);
  };
  return (
    <form className="w-100" onSubmit={onSubmit} onReset={onReset}>
      {inputs.map((props, key) => (
        <EditField
          variant="input"
          className="mb-4"
          required
          {...{ key, onChange, disabled: !isEditing }}
          {...props}
        />
      ))}
      <div
        className="d-flex justify-content-evenly w-100 mt-3"
        // style={{ height: "3.6rem" }}
      >
        {isEditing ? (
          <>
            <PrimaryButton
              type="submit"
              style={{ padding: "0.5rem 3rem", fontSize: "1.6rem" }}
            >
              Сохранить
            </PrimaryButton>
            <PrimaryButton
              type="reset"
              style={{ padding: "0.5rem 3rem", fontSize: "1.6rem" }}
            >
              Отмена
            </PrimaryButton>
          </>
        ) : (
          ""
        )}
      </div>
    </form>
  );
}
