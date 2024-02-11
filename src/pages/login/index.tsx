// Страница входа
import FormPage from "~/shared/ui/FormPage";
import PasswordInputContainer from "~/shared/ui/PasswordInputContainer";
import RoundedInput from "~/shared/ui/RoundedInput";
import styles from "./styles.module.scss";

const LoginPage: React.FC = () => {
  return (
    <FormPage
      title="Название"
      buttonText="Войти"
      inputGroup={
        <>
          <RoundedInput placeholder="Логин или Email" />{" "}
          <PasswordInputContainer />
        </>
      }
    >
      <a href="!#" className={styles["forgot-password"]}>
        Забыли пароль?
      </a>
    </FormPage>
  );
};

export default LoginPage;
