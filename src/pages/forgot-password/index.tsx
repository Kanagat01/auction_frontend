import { PrimaryButton, RoundedInputGroup } from "~/shared/ui";

function ForgotPassword() {
  return (
    <div className="login-page">
      <form className="login-form">
        <span className="login-title">Название</span>
        <span className="forgot-password-text">
          Для восстановления пароля введите <br /> Ваш адрес электронной почты
        </span>
        <RoundedInputGroup>
          <RoundedInputGroup.Input placeholder="Номер телефона" />
        </RoundedInputGroup>
        <PrimaryButton type="submit">Войти</PrimaryButton>
      </form>
    </div>
  );
}
export default ForgotPassword;
