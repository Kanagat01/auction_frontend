import { HTMLAttributes, FC } from "react";
import icon from "./book.png";

interface ImgProps extends HTMLAttributes<HTMLImageElement> {}

export const BookIcon: FC<ImgProps> = (props) => {
  return (
    <img
      src={icon}
      alt="book-icon"
      style={{ width: "100%", height: "100%" }}
      {...props}
    />
  );
};
