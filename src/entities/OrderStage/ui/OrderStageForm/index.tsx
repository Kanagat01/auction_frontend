import { InputContainer, OutlineButton } from "~/shared/ui";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";
import { CreateOrderStage } from "../CreateOrderStage";
import styles from "./styles.module.scss";

export function OrderStageForm() {
  return (
    <div className={styles.gridContainer}>
      <InputContainer
        name=""
        label="№ Поставки"
        variant="input"
        type="number"
        label_style={{ color: "var(--default-font-color)" }}
        container_style={{ justifySelf: "start", width: "15rem" }}
      />
      <OutlineButton
        className={styles.button}
        style={{ justifySelf: "end" }}
        type="submit"
      >
        Сохранить
      </OutlineButton>
      <div
        className={`d-flex justify-content-between`}
        style={{ justifySelf: "start", width: "15rem" }}
      >
        {[CreateOrderStage, LuCopyPlus, LuPenSquare, FaRegTrashCan].map(
          (Icon, idx) => (
            <OutlineButton
              key={idx}
              className="px-2 py-0 me-2"
              style={{
                fontSize: "2rem",
                border: "1px solid gray",
              }}
            >
              <Icon color="gray" />
            </OutlineButton>
          )
        )}
      </div>
      <OutlineButton
        className={styles.button}
        style={{ justifySelf: "end" }}
        type="reset"
      >
        Отмена
      </OutlineButton>
    </div>
  );
}
