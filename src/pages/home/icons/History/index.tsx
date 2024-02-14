import { HTMLAttributes, FC } from "react";
import icon from "./history.png";

interface ImgProps extends HTMLAttributes<HTMLImageElement> {}

export const HistoryIcon: FC<ImgProps> = (props) => {
  return (
    <img
      src={icon}
      alt="history-icon"
      style={{ width: "100%", height: "100%" }}
      {...props}
    />
  );
};
