import { useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import toast from "react-hot-toast";
import { ModalTitle } from "~/shared/ui";
import { Stage } from "./Stage";
import {
  clearStages,
  addStageCouple,
  setStageType,
  editStageCouple,
} from "./state";
import styles from "./styles.module.scss";

type ModalProps = {
  mode: "create" | "edit" | "copy";
  show: boolean;
  changeShow: () => void;
};

export const OrderStageModal = ({ mode, show, changeShow }: ModalProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const toLoadStage = () => {
    setStageType("load_stage");
    if (containerRef.current) {
      containerRef.current.style.transform = "translateX(0)";
    }
  };

  const toUnloadStage = () => {
    setStageType("unload_stage");
    if (containerRef.current) {
      containerRef.current.style.transform = "translateX(-50%)";
    }
  };

  const onReset = () => {
    setStageType("load_stage");
    clearStages();
    changeShow();
  };
  const onSubmit = () => {
    let isSuccessful: boolean;
    if (mode === "create" || mode === "copy") {
      isSuccessful = addStageCouple();
    } else {
      isSuccessful = editStageCouple();
    }
    if (isSuccessful) {
      setStageType("load_stage");
      changeShow();
    }
  };
  useEffect(() => {
    if (show) toast.remove();
  }, [show]);
  return (
    <Modal show={show} onHide={changeShow} className="gradient-modal">
      <Modal.Body>
        <form className="position-relative overflow-hidden">
          <ModalTitle>Поставка</ModalTitle>
          <div
            ref={containerRef}
            className={`d-flex ${styles.animation}`}
            style={{ width: "200%" }}
          >
            <Stage
              stageType="load_stage"
              text1="Отмена"
              onClick1={onReset}
              text2="Далее"
              onClick2={toUnloadStage}
            />
            <Stage
              stageType="unload_stage"
              text1="Назад"
              onClick1={toLoadStage}
              text2="Сохранить"
              onClick2={onSubmit}
            />
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export { getStage, updateStages, removeStage, clearStages } from "./state";
