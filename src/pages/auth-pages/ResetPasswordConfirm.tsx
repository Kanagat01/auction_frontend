import { FormEvent, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { resetPasswordConfirm } from "~/features/reset-password";
import { PrimaryButton, RoundedInputGroup } from "~/shared/ui";
import { useTextInputState } from "~/shared/lib";
import Routes from "~/shared/routes";
import { Credentials } from "./Credentials";

export function ResetPasswordConfirm() {
  const { token } = useParams<{ token: string }>();
  const [isValidToken, setIsValidToken] = useState<boolean>(Boolean(token));

  const [new_password, changeNewPassword] = useTextInputState("");
  const [confirm_password, changeConfirmPassword] = useTextInputState("");

  const navigate = useNavigate();

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (token)
      resetPasswordConfirm({
        token,
        new_password,
        confirm_password,
        setIsValidToken,
        navigate,
      });
  };
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <span className="login-title">Cargonika</span>
        {isValidToken ? (
          <>
            <span className="login-subtitle">
              Для сброса пароля введите <br />
              новый пароль и повторите его
            </span>
            <RoundedInputGroup>
              <RoundedInputGroup.PasswordInput
                value={new_password}
                onChange={changeNewPassword}
                placeholder="Новый пароль"
                required
              />
              <RoundedInputGroup.PasswordInput
                value={confirm_password}
                onChange={changeConfirmPassword}
                placeholder="Повторите пароль"
                required
              />
            </RoundedInputGroup>
            <PrimaryButton type="submit">Сбросить</PrimaryButton>
            <span className="link-text">
              Уже есть аккаунт? <NavLink to={Routes.LOGIN}>Войти</NavLink>
            </span>
          </>
        ) : (
          <>
            <span className="login-subtitle">
              Неправильный адрес. Возможно ссылка для сброса пароля истекла
            </span>
            <NavLink to={Routes.FORGOT_PASSWORD}>Забыли пароль?</NavLink>
          </>
        )}
      </form>
      <Credentials />
    </div>
  );
}
