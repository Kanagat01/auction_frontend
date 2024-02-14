import React, { FC, InputHTMLAttributes, useState } from "react";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const RoundedInput: FC<InputProps> = (props) => {
  return <input type="text" className={styles["rounded-input"]} {...props} />;
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
        className={styles["hide-btn"]}
        onClick={() => {
          setShowPassword(!showPassword);
        }}
      ></span>
    </div>
  );
};

interface GroupProps {
  children: React.ReactNode;
}

const Group: FC<GroupProps> = ({ children }) => {
  return <div className={styles["input-group"]}>{children}</div>;
};

const RoundedInputGroup: FC<GroupProps> & {
  Input: typeof RoundedInput;
  PasswordInput: typeof PasswordInput;
} = ({ children }) => {
  return <Group>{children}</Group>;
};

RoundedInputGroup.Input = RoundedInput;
RoundedInputGroup.PasswordInput = PasswordInput;

export default RoundedInputGroup;
