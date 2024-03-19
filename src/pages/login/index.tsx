import { FormPage, RoundedInputGroup } from "~/shared/ui";

function Login() {
  return (
    <>
      <FormPage title="Название" buttonText="Войти" isLoginPage={true}>
        <RoundedInputGroup>
          <RoundedInputGroup.Input placeholder="Логин или Email" />
          <RoundedInputGroup.PasswordInput placeholder="Пароль" />
        </RoundedInputGroup>
      </FormPage>
    </>
  );
}
export default Login;
