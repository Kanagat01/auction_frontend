import { ChangeEvent, useState } from "react";
import { CrudOrderStage } from "~/entities/OrderStage";
import { InputContainer, OutlineButton } from "~/shared/ui";
import styles from "./styles.module.scss";

export function OrderStageForm() {
  const [orderStageNumber, setOrderStageNumber] = useState<number | "">("");
  return (
    <div className={styles.gridContainer}>
      <InputContainer
        label="№ Поставки"
        name="order_stage_number"
        value={orderStageNumber}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setOrderStageNumber(Number(e.target.value))
        }
        variant="input"
        type="number"
        label_style={{ color: "var(--default-font-color)" }}
        className="w-100"
        container_style={{
          justifySelf: "start",
          marginBottom: "1.5rem",
        }}
      />
      <OutlineButton className={styles.button} type="submit">
        Сохранить
      </OutlineButton>
      <div
        className={`d-flex justify-content-between`}
        style={{ justifySelf: "start", width: "15rem" }}
      >
        <CrudOrderStage orderStageNumber={orderStageNumber} />
      </div>
      <OutlineButton className={styles.button} type="reset">
        Отмена
      </OutlineButton>
    </div>
  );
}
