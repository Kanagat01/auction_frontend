import { Fragment } from "react";
import { useUnit } from "effector-react";
import { TStages } from "~/entities/OrderStage";
import { Checkbox, TextCenter, TitleMd } from "~/shared/ui";
import {
  $notValidStageNumber,
  $selectedStage,
  setSelectedStage,
} from "../state";
import styles from "./styles.module.scss";
import { dateToString } from "~/shared/lib";

export function OrderStagesTable({ orderStages }: { orderStages: TStages[] }) {
  const selectedStage = useUnit($selectedStage);
  const notValidStageNumber = useUnit($notValidStageNumber);
  return (
    <div className={styles["table-wrapper"]}>
      <table className={styles.table}>
        <thead>
          <tr>
            {[
              "№ Поставки",
              "Этап",
              "Дата время",
              "Компания",
              "Индекс",
              "Город",
              "Адрес",
            ].map((text, idx) => (
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
            orderStages.map(
              (
                {
                  order_stage_number,
                  load_stage,
                  unload_stage,
                  cargo,
                  volume,
                  weight,
                },
                stageIdx
              ) =>
                [
                  { stageName: "load", ...load_stage },
                  { stageName: "unload", ...unload_stage },
                ].map(({ stageName, ...stageData }, key) => (
                  <Fragment key={key}>
                    <tr>
                      {key === 0 ? (
                        <td rowSpan={4} style={{ width: "12rem" }}>
                          <Checkbox
                            label={
                              <span style={{ wordBreak: "break-word" }}>
                                {order_stage_number}{" "}
                                {order_stage_number === notValidStageNumber
                                  ? "❌"
                                  : ""}
                              </span>
                            }
                            className="me-2"
                            // style={{ textWrap: "nowrap" }}
                            checked={
                              selectedStage?.order_stage_number ===
                              order_stage_number
                            }
                            onChange={() =>
                              setSelectedStage(
                                selectedStage?.order_stage_number !==
                                  order_stage_number
                                  ? orderStages[stageIdx]
                                  : null
                              )
                            }
                          />
                        </td>
                      ) : (
                        ""
                      )}
                      <td rowSpan={2}>
                        {stageName === "load" ? "Погрузка" : "Выгрузка"}
                      </td>
                      <td rowSpan={2}>
                        {dateToString(stageData.date)}{" "}
                        {stageData.time_start.slice(0, 5)}-
                        {stageData.time_end.slice(0, 5)}
                      </td>
                      <td rowSpan={2}>{stageData.company}</td>
                      <td rowSpan={2}>{stageData.postal_code}</td>
                      <td rowSpan={2}>{stageData.city}</td>
                      <td rowSpan={2}>{stageData.address}</td>
                      <td colSpan={2}>{cargo}</td>
                      <td rowSpan={2}>{stageData.contact_person}</td>
                    </tr>
                    <tr>
                      <td>{weight}</td>
                      <td>{volume}</td>
                    </tr>
                  </Fragment>
                ))
            )
          ) : (
            <tr>
              <td colSpan={10}>
                <TitleMd className="p-4">
                  <TextCenter>Нет данных для отображения</TextCenter>
                </TitleMd>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
