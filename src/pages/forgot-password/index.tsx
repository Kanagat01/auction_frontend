import { NavLink } from "react-router-dom";
import { LOGIN_ROUTE } from "~/shared/routes";
import { PrimaryButton, RoundedInputGroup } from "~/shared/ui";

export default function ForgotPassword() {
  return (
    <div className="login-page">
      <form className="login-form">
        <span className="login-title">Kargonika</span>
        <span className="login-subtitle">
          Для восстановления пароля введите <br /> Ваш адрес электронной почты
        </span>
        <RoundedInputGroup>
          <RoundedInputGroup.Input placeholder="example@gmail.com" required />
        </RoundedInputGroup>
        <PrimaryButton type="submit">Восстановить</PrimaryButton>
        <span className="link-text">
          Уже есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войти</NavLink>
        </span>
      </form>
    </div>
  );
}
