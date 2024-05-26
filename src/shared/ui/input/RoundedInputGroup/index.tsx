import { FC, InputHTMLAttributes, ReactNode, useState } from "react";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const RoundedInput: FC<InputProps> = (props) => {
  return (
    <div className="w-100">
      <input type="text" className={styles["rounded-input"]} {...props} />
    </div>
  );
};

const PasswordInput: FC<InputProps> = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className={styles["password-input-container"]}>
      <RoundedInput
        placeholder="Пароль"
        type={showPassword ? "text" : "password"}
        {...props}
      />
      <span
        className={styles.hidePasswordBtn}
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      >
        {showPassword ? <BsEyeSlash /> : <BsEye />}
      </span>
    </div>
  );
};

interface GroupProps {
  children: ReactNode;
}

const Group: FC<GroupProps> = ({ children }) => {
  return <div className={styles["input-group"]}>{children}</div>;
};

export const RoundedInputGroup: FC<GroupProps> & {
  Input: typeof RoundedInput;
  PasswordInput: typeof PasswordInput;
} = ({ children }) => {
  return <Group>{children}</Group>;
};

RoundedInputGroup.Input = RoundedInput;
RoundedInputGroup.PasswordInput = PasswordInput;
