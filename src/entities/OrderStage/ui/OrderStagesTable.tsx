import { TStages } from "../types";
import styles from "./styles.module.scss";

export function OrderStagesTable(props: { orderStageCouples: TStages[] }) {
  return (
    <table className={styles.table}>
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

      {props.orderStageCouples.map(({ load_stage, unload_stage }) =>
        [
          { stageName: "Погрузка", stageData: load_stage },
          { stageName: "Выгрузка", stageData: unload_stage },
        ].map(({ stageName, stageData }) => (
          <>
            <tr>
              <td rowSpan={2}>{stageName}</td>
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
          </>
        ))
      )}
    </table>
  );
}
