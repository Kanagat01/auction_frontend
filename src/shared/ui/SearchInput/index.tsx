import { InputHTMLAttributes, FC } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

const SearchInput: FC<InputProps> = (props) => {
  return (
    <div className={styles["search-box"]}>
      <span className={styles["search-icon"]}>
        <FiSearch style={{ width: "100%", height: "100%" }} />
      </span>
      <input className={styles["search-input"]} type="text" {...props} />
    </div>
  );
};

export default SearchInput;
