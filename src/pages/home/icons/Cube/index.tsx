import { HTMLAttributes, FC } from "react";
import icon from "./cube.png";

interface ImgProps extends HTMLAttributes<HTMLImageElement> {}

export const CubeIcon: FC<ImgProps> = (props) => {
  return (
    <img
      src={icon}
      alt="cube-icon"
      style={{ width: "100%", height: "100%" }}
      {...props}
    />
  );
};
