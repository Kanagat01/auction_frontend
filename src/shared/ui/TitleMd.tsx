import { ReactNode } from "react";

export const TitleMd = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      color: "rgb(5, 10, 4)",
      fontFamily: "Gilroy",
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: "2.4rem",
      marginLeft: "2rem",
    }}
  >
    {children}
  </div>
);
