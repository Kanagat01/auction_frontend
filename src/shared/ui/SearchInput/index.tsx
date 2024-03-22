import { InputHTMLAttributes, FC } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput: FC<InputProps> = (props) => {
  return (
    <div className={styles["search-box"]}>
      <span className={styles["search-icon"]}>
        <FiSearch className="w-100 h-100" />
      </span>
      <input className={styles["search-input"]} type="text" {...props} />
    </div>
  );
};
