import { FormEvent } from "react";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

import { login } from "~/features/authorization";
import { useTextInputState } from "~/shared/lib";
import { PrimaryButton, RoundedInputGroup } from "~/shared/ui";
import Routes from "~/shared/routes";

export function Login() {
  const [email, onChangeEmail] = useTextInputState("");
  const [password, onChangePassword] = useTextInputState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || Routes.HOME;
  const navigateFunc = () => navigate(from);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    login({ username: email, password, navigateFunc });
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <span className="login-title">Kargonika</span>
        <RoundedInputGroup>
          <RoundedInputGroup.Input
            value={email}
            onChange={onChangeEmail}
            placeholder="Логин или Email"
            required
          />
          <RoundedInputGroup.PasswordInput
            value={password}
            onChange={onChangePassword}
            placeholder="Пароль"
            required
          />
        </RoundedInputGroup>
        <PrimaryButton type="submit">Войти</PrimaryButton>
        <NavLink to={Routes.REGISTER}>Регистрация</NavLink>
        <NavLink to={Routes.FORGOT_PASSWORD} className="mt-2">
          Забыли пароль?
        </NavLink>
      </form>
    </div>
  );
}
