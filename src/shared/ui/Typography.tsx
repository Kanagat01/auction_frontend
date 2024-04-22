import { ReactNode } from "react";

export const TitleMd = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      color: "rgb(5, 10, 4)",
      fontFamily: "Gilroy",
      fontSize: "2rem",
      fontWeight: 500,
      lineHeight: "2.4rem",
    }}
  >
    {children}
  </div>
);

export const ModalTitle = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      color: "#000",
      fontFamily: "Gilroy",
      fontSize: "1.6rem",
      fontWeight: 600,
      lineHeight: "1.8rem",
      textAlign: "center",
      marginBottom: "2rem",
    }}
  >
    {children}
  </div>
);
