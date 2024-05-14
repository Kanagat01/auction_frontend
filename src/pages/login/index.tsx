import { FormEvent, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

import { login } from "~/features/authorization";
import { useTextInputState } from "~/shared/lib";
import { FORGOT_PASSWORD_ROUTE, HOME_ROUTE } from "~/shared/routes";
import { PrimaryButton, RoundedInputGroup } from "~/shared/ui";

function Login() {
  const [email, onChangeEmail] = useTextInputState("");
  const [password, onChangePassword] = useTextInputState("");
  const [errorMessage, setErrorMessage] = useState<string | undefined>(
    undefined
  );

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || HOME_ROUTE;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const result = await login(email, password);
    if (result === "success") {
      navigate(from);
    } else {
      setErrorMessage(result);
    }
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <span className={"login-title"}>Название</span>
        <RoundedInputGroup>
          <RoundedInputGroup.Input
            value={email}
            onChange={onChangeEmail}
            placeholder="Логин или Email"
            error={
              email === ""
                ? "Это поле обязательно для заполнения"
                : errorMessage
                ? ""
                : undefined
            }
          />
          <RoundedInputGroup.PasswordInput
            value={password}
            onChange={onChangePassword}
            placeholder="Пароль"
            error={
              password === ""
                ? "Это поле обязательно для заполнения"
                : errorMessage
            }
          />
        </RoundedInputGroup>
        <PrimaryButton type="submit">Войти</PrimaryButton>
        <NavLink to={FORGOT_PASSWORD_ROUTE}>Забыли пароль?</NavLink>
      </form>
    </div>
  );
}
export default Login;
