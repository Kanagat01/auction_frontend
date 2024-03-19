import { HTMLAttributes, FC } from "react";
import icon from "./hammer.png";

interface ImgProps extends HTMLAttributes<HTMLImageElement> {}

export const HammerIcon: FC<ImgProps> = (props) => {
  return (
    <img
      src={icon}
      alt="hammer-icon"
      style={{ width: "100%", height: "100%" }}
      {...props}
    />
  );
};
