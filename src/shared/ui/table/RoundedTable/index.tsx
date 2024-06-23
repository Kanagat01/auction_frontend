import { FC, HTMLAttributes, ReactNode } from "react";
import { TextCenter } from "~/shared/ui";
import styles from "./styles.module.scss";

type RoundedTableProps = HTMLAttributes<HTMLTableElement> & {
  columns?: ReactNode[];
  data: ReactNode[][];
  lightBorderMode?: boolean;
};

export const RoundedTable: FC<RoundedTableProps> = ({
  columns,
  data,
  lightBorderMode = false,
  ...props
}) => (
  <div
    className={`${styles.tableResponsive} ${
      lightBorderMode ? styles.lightBorder : ""
    }`}
  >
    <table
      className={`${styles.table} ${lightBorderMode ? styles.lightBorder : ""}`}
      {...props}
    >
      {columns ? (
        <thead>
          <tr>
            {columns.map((column, key) => (
              <th key={key}>{column}</th>
            ))}
          </tr>
        </thead>
      ) : (
        ""
      )}
      <tbody>
        {data.length !== 0 ? (
          data.map((arr, key1) => (
            <tr key={key1}>
              {arr.map((value, key2) => (
                <td key={key2}>{value}</td>
              ))}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns?.length}>
              <TextCenter>Нет данных для отображения</TextCenter>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  </div>
);
