import { Fragment } from "react";
import { TStages } from "~/entities/OrderStage";
import { TextCenter, TitleMd } from "~/shared/ui";
import styles from "./styles.module.scss";

export function OrderStagesTable({ orderStages }: { orderStages: TStages[] }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          {["Этап", "Дата время", "Компания", "Адрес"].map((text, idx) => (
            <th key={idx} rowSpan={2}>
              {text}
            </th>
          ))}
          <th colSpan={2}>Груз</th>
          <th rowSpan={2}>Контактное лицо</th>
        </tr>
        <tr>
          <th>Вес</th>
          <th>Обьем</th>
        </tr>
      </thead>
      <tbody>
        {orderStages.length !== 0 ? (
          orderStages.map(({ load_stage, unload_stage }) =>
            [
              { stageName: "load", ...load_stage },
              { stageName: "unload", ...unload_stage },
            ].map(({ stageName, ...stageData }, key) => (
              <Fragment key={key}>
                <tr>
                  <td rowSpan={2}>
                    {stageName === "load" ? "Погрузка" : "Выгрузка"}
                  </td>
                  <td rowSpan={2}>
                    {stageData.date} {stageData.time_start}-{stageData.time_end}
                  </td>
                  <td rowSpan={2}>{stageData.company}</td>
                  <td rowSpan={2}>{stageData.address}</td>
                  <td colSpan={2}>{stageData.cargo}</td>
                  <td rowSpan={2}>{stageData.contact_person}</td>
                </tr>
                <tr>
                  <td>{stageData.weight}</td>
                  <td>{stageData.volume}</td>
                </tr>
              </Fragment>
            ))
          )
        ) : (
          <tr>
            <td colSpan={7}>
              <TitleMd className="p-4">
                <TextCenter>Нет данных для отображения</TextCenter>
              </TitleMd>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
