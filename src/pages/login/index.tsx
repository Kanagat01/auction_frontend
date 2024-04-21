import { FormEvent, useContext } from "react";
import { AuthContext } from "~/app/providers/withAuthContext";
import { useLocation, useNavigate } from "react-router";
import { NavLink } from "react-router-dom";
import { FORGOT_PASSWORD_ROUTE } from "~/shared/routes";
import { PrimaryButton, RoundedInputGroup } from "~/shared/ui";

function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from;
  const { setAuth } = useContext(AuthContext);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setAuth(true);
    navigate(from);
  }

  return (
    <div className="login-page">
      <form className="login-form">
        <span className={"login-title"}>Название</span>
        <RoundedInputGroup>
          <RoundedInputGroup.Input placeholder="Логин или Email" />
          <RoundedInputGroup.PasswordInput placeholder="Пароль" />
        </RoundedInputGroup>
        <PrimaryButton type="submit" onSubmit={handleSubmit}>
          Войти
        </PrimaryButton>
        <NavLink to={FORGOT_PASSWORD_ROUTE}>Забыли пароль?</NavLink>
      </form>
    </div>
  );
}
export default Login;
