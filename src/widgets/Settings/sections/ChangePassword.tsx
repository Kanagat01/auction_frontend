import { ChangeEvent, FormEvent, useState } from "react";
import {
  changePassword,
  ChangePasswordRequest,
} from "~/features/change-password";
import { InputContainer, PrimaryButton } from "~/shared/ui";
import { btnStyle, inputProps } from "./helpers";

export function ChangePassword() {
  const initialState = {
    old_password: "",
    new_password: "",
    repeat_password: "",
  };
  const [data, setData] = useState<ChangePasswordRequest>(initialState);
  const onChange = (e: ChangeEvent<HTMLInputElement>) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    changePassword({ ...data, onSuccess: () => setData(initialState) });
  };
  return (
    <form onSubmit={onSubmit}>
      <InputContainer
        variant="password-input"
        label="Текущий пароль"
        {...{ name: "old_password", value: data.old_password, onChange }}
        {...inputProps}
        autoComplete="old-password"
        required
      />
      <InputContainer
        variant="password-input"
        label="Новый пароль"
        {...{ name: "new_password", value: data.new_password, onChange }}
        {...inputProps}
        autoComplete="new-password"
        required
      />
      <InputContainer
        variant="password-input"
        label="Повторите пароль"
        {...{ name: "repeat_password", value: data.repeat_password, onChange }}
        {...inputProps}
        autoComplete="repeat-password"
        required
      />
      <div className="d-flex justify-content-evenly w-100 mt-5">
        <PrimaryButton type="submit" style={btnStyle}>
          Обновить пароль
        </PrimaryButton>
      </div>
    </form>
  );
}
