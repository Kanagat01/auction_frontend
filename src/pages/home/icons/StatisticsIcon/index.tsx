import { HTMLAttributes, FC } from "react";
import icon from "./statisticIcon.png";

interface ImgProps extends HTMLAttributes<HTMLImageElement> {}

export const StatisticsIcon: FC<ImgProps> = (props) => {
  return (
    <img
      src={icon}
      alt="statistics-icon"
      style={{ width: "100%", height: "100%" }}
      {...props}
    />
  );
};
