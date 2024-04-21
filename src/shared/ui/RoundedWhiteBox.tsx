import { FC, HTMLAttributes, PropsWithChildren } from "react";

export const RoundedWhiteBox: FC<
  PropsWithChildren<HTMLAttributes<HTMLDivElement>>
> = ({ children, ...props }) => (
  <div
    style={{
      background: "#fff",
      borderRadius: "30px",
      flex: 1,
    }}
    {...props}
  >
    {children}
  </div>
);
