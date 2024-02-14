import { HTMLAttributes, FC } from "react";
import icon from "./createNote.png";

interface ImgProps extends HTMLAttributes<HTMLImageElement> {}

export const CreateNoteIcon: FC<ImgProps> = (props) => {
  return (
    <img
      src={icon}
      alt="create-note-icon"
      style={{ width: "100%", height: "100%" }}
      {...props}
    />
  );
};
