import toast from "react-hot-toast";
import { Modal } from "react-bootstrap";
import { useUnit } from "effector-react";
import { useEffect, ChangeEvent, ButtonHTMLAttributes } from "react";

import { ModalTitle, InputContainer, OutlineButton } from "~/shared/ui";
import {
  clearStages,
  addStageCouple,
  $stageType,
  setStageType,
  editStageCouple,
  $selectedStage,
  setOrderForm,
  $orderForm,
  setSelectedStage,
} from "..";
import { Stage } from "./inputs";
import { CopyStage, CreateStage, EditStage, RemoveStageModal } from "./buttons";
import {
  $mode,
  $showStageFormModal,
  changeShowStageFormModal,
  resetStageTypeAndCloseModal,
} from "./helpers";
import styles from "./styles.module.scss";

const buttonProps: ButtonHTMLAttributes<HTMLButtonElement> = {
  className: "px-2 py-0 me-2",
  type: "button",
  style: { fontSize: "2rem" },
};

export function CrudOrderStage({
  orderStageNumber,
}: {
  orderStageNumber: number | "";
}) {
  const mode = useUnit($mode);
  const show = useUnit($showStageFormModal);
  const stageType = useUnit($stageType);

  const resetStages = () => {
    setStageType("load_stage");
    clearStages();
    changeShowStageFormModal();
  };
  const saveStages = () => {
    let isSuccessful: boolean;
    if (mode === "create" || mode === "copy") isSuccessful = addStageCouple();
    else isSuccessful = editStageCouple();
    if (isSuccessful) resetStageTypeAndCloseModal(changeShowStageFormModal);
  };

  useEffect(() => {
    if (show) toast.remove();
  }, [show]);
  return (
    <>
      <CreateStage {...buttonProps} />
      <CopyStage orderStageNumber={orderStageNumber} {...buttonProps} />
      <EditStage orderStageNumber={orderStageNumber} {...buttonProps} />
      <RemoveStageModal orderStageNumber={orderStageNumber} {...buttonProps} />
      <Modal
        show={show}
        onHide={changeShowStageFormModal}
        className="gradient-modal"
      >
        <Modal.Body>
          <form className="position-relative overflow-hidden">
            <ModalTitle>Поставка</ModalTitle>
            <div
              className={`d-flex ${styles.animation}`}
              style={
                stageType === "load_stage"
                  ? { width: "200%", transform: "translateX(0)" }
                  : { width: "200%", transform: "translateX(-50%)" }
              }
            >
              <Stage
                stageType="load_stage"
                text1="Отмена"
                onClick1={resetStages}
                text2="Далее"
                onClick2={() => setStageType("unload_stage")}
              />
              <Stage
                stageType="unload_stage"
                text1="Назад"
                onClick1={() => setStageType("load_stage")}
                text2="Сохранить"
                onClick2={saveStages}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export function OrderStageForm() {
  const selectedStage = useUnit($selectedStage);
  const orderStageNumber = selectedStage?.order_stage_number ?? "";
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (selectedStage) {
      const value = Number(e.target.value);
      const prevState = $orderForm.getState();
      const newStage = prevState.stages.find(
        (el) => el.order_stage_number === selectedStage.order_stage_number
      );
      if (newStage) {
        newStage.order_stage_number = value;
        const newStages = prevState.stages.map((stage) =>
          stage.order_stage_number === selectedStage.order_stage_number
            ? newStage
            : stage
        );
        setOrderForm({ ...prevState, stages: newStages });
        setSelectedStage(newStage);
      }
    }
  };
  return (
    <div className={styles.gridContainer}>
      <InputContainer
        label="№ Поставки"
        name="order_stage_number"
        value={orderStageNumber}
        onChange={onChange}
        variant="input"
        type="number"
        labelStyle={{ color: "var(--default-font-color)" }}
        className="w-100"
        containerStyle={{
          justifySelf: "start",
          marginBottom: "1.5rem",
        }}
      />
      <OutlineButton className={styles.formButton} type="submit">
        Сохранить
      </OutlineButton>
      <div
        className={`d-flex justify-content-between`}
        style={{ justifySelf: "start", width: "15rem" }}
      >
        <CrudOrderStage orderStageNumber={orderStageNumber} />
      </div>
      <OutlineButton className={styles.formButton} type="reset">
        Отмена
      </OutlineButton>
    </div>
  );
}
