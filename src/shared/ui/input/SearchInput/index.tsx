import { InputHTMLAttributes, FC, CSSProperties } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  containerStyle?: CSSProperties;
  iconOnClick?: () => void;
}

export const SearchInput: FC<InputProps> = ({ iconOnClick, ...props }) => {
  return (
    <div className={styles["search-box"]} style={props.containerStyle}>
      <input className={styles["search-input"]} type="text" {...props} />
      <span
        className={styles["search-icon"]}
        onClick={iconOnClick}
        style={iconOnClick ? { cursor: "pointer" } : {}}
      >
        <FiSearch className="w-100 h-100" />
      </span>
    </div>
  );
};
