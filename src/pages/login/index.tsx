import { FormEvent } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";

import { login } from "~/features/authorization";
import { useTextInputState } from "~/shared/lib";
import { FORGOT_PASSWORD_ROUTE, HOME_ROUTE } from "~/shared/routes";
import { PrimaryButton, RoundedInputGroup } from "~/shared/ui";

function Login() {
  const [email, onChangeEmail] = useTextInputState("");
  const [password, onChangePassword] = useTextInputState("");

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from || HOME_ROUTE;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    toast.promise(login(email, password), {
      loading: "Авторизуемся...",
      success: () => {
        navigate(from);
        return "Вы успешно авторизованы";
      },
      error: (err) => `Произошла ошибка: ${err}`,
    });
  }

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleSubmit}>
        <span className={"login-title"}>Kargonika</span>
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
        <NavLink to={FORGOT_PASSWORD_ROUTE}>Забыли пароль?</NavLink>
      </form>
    </div>
  );
}
export default Login;
