import { ChangeEvent, FormEvent, useState } from "react";
import { useTranslation } from "react-i18next";
import { useUnit } from "effector-react";
import { $mainData, CustomerCompany, editDetails } from "~/entities/User";
import { InputContainer, PrimaryButton } from "~/shared/ui";
import { btnStyle, inputProps } from "./helpers";

export function CompanyDetails() {
  const { t } = useTranslation();
  const mainData = useUnit($mainData);
  const [details, setDetails] = useState<string>(
    (mainData as CustomerCompany).details ?? ""
  );
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    editDetails({ details });
  };
  const onReset = (e: FormEvent) => {
    e.preventDefault();
    setDetails((mainData as CustomerCompany).details ?? "");
  };
  return (
    <form onSubmit={onSubmit} onReset={onReset}>
      <InputContainer
        variant="textarea"
        name="details"
        label={t("details")}
        value={details}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
          setDetails(e.target.value)
        }
        {...inputProps}
        rows={20}
        required
      />
      <div className="d-flex justify-content-evenly w-100 mt-4">
        <PrimaryButton type="submit" style={btnStyle}>
          Сохранить
        </PrimaryButton>
        <PrimaryButton type="reset" style={btnStyle}>
          Отмена
        </PrimaryButton>
      </div>
    </form>
  );
}
