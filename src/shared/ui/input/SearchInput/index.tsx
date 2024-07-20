import { InputHTMLAttributes, FC, CSSProperties } from "react";
import { FiSearch } from "react-icons/fi";
import styles from "./styles.module.scss";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  container_style?: CSSProperties;
  iconOnClick?: () => void;
}

export const SearchInput: FC<InputProps> = ({ iconOnClick, ...props }) => {
  return (
    <div className={styles["search-box"]} style={props.container_style}>
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
