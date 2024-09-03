import { FormEvent, useState } from "react";
import { NavLink } from "react-router-dom";
import { forgotPassword } from "~/features/reset-password";
import { PrimaryButton, RoundedInputGroup } from "~/shared/ui";
import { useTextInputState } from "~/shared/lib";
import Routes from "~/shared/routes";
import { Credentials } from "./Credentials";

export function ForgotPassword() {
  const [success, setSuccess] = useState<boolean>(false);
  const [email, emailOnChange] = useTextInputState("");
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    forgotPassword({ email, setSuccess });
  };
  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <span className="login-title">Cargonika</span>
        <span className="login-subtitle">
          {success ? (
            'На введенный вами email было отправлено сообщение со ссылкой для сброса пароля. Если письмо не пришло проверьте папку "Спам"'
          ) : (
            <>
              Для восстановления пароля введите <br /> Ваш адрес электронной
              почты
            </>
          )}
        </span>
        {!success ? (
          <>
            <RoundedInputGroup>
              <RoundedInputGroup.Input
                value={email}
                onChange={emailOnChange}
                placeholder="example@gmail.com"
                required
              />
            </RoundedInputGroup>
            <PrimaryButton type="submit">Восстановить</PrimaryButton>
            <span className="link-text">
              Уже есть аккаунт? <NavLink to={Routes.LOGIN}>Войти</NavLink>
            </span>
          </>
        ) : (
          <a href="#" className="mt-1" onClick={() => setSuccess(false)}>
            Изменить Email
          </a>
        )}
      </form>
      <Credentials />
    </div>
  );
}
