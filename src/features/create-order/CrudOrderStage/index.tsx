import toast from "react-hot-toast";
import { useUnit } from "effector-react";
import { useEffect, ButtonHTMLAttributes } from "react";
import { Modal } from "react-bootstrap";

import { ModalTitle } from "~/shared/ui";
import {
  clearStages,
  addStageCouple,
  $stageType,
  setStageType,
  editStageCouple,
} from "..";
import { Stage } from "./inputs";
import styles from "./styles.module.scss";
import {
  $mode,
  $showStageFormModal,
  changeShowStageFormModal,
  resetStageTypeAndCloseModal,
} from "./helpers";
import { CopyStage, CreateStage, EditStage, RemoveStageModal } from "./buttons";

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
