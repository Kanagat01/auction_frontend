import { useRef } from "react";
import { Modal } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { ModalTitle, OutlineButton } from "~/shared/ui";
import { useModalState } from "~/shared/lib";
import { FolderPlus } from "~/shared/assets";
import { clearStages, addStageCouple, setStageType } from "./state";
import { Field, StageTypeInput, TimeInput } from "./inputs";
import styles from "./styles.module.scss";
import { TStage } from "~/entities/OrderStage";

type StageProps = {
  value: TStage;
  text1: string;
  text2: string;
  onClick1: () => void;
  onClick2: () => void;
};

const Stage = ({ value, text1, text2, onClick1, onClick2 }: StageProps) => (
  <div style={{ width: "50%" }}>
    <StageTypeInput value={value} />
    <Field name="date" />
    <div className={styles.timeBlock}>
      <TimeInput name="time_start" />
      <TimeInput name="time_end" />
    </div>
    <Field name="company" />
    <Field name="address" />
    <Field name="contact_person" />
    <Field name="cargo" />
    <Field name="weight" />
    <Field name="volume" />
    <Field name="comments" />
    <div className={styles.buttonsBlock}>
      <OutlineButton
        className={styles.modalBtn}
        type="button"
        onClick={onClick1}
      >
        {text1}
      </OutlineButton>
      <OutlineButton
        className={styles.modalBtn}
        type="button"
        onClick={onClick2}
      >
        {text2}
      </OutlineButton>
    </div>
  </div>
);

export const CreateOrderStageCouple = () => {
  const [show, changeShow] = useModalState(false);
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
    clearStages();
    changeShow();
  };
  const onSubmit = () => {
    if (addStageCouple()) changeShow();
  };
  return (
    <>
      <ReactSVG
        src={FolderPlus}
        style={{ color: "gray" }}
        onClick={changeShow}
      />
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
                value="load_stage"
                text1="Отмена"
                onClick1={onReset}
                text2="Далее"
                onClick2={toUnloadStage}
              />
              <Stage
                value="unload_stage"
                text1="Назад"
                onClick1={toLoadStage}
                text2="Сохранить"
                onClick2={onSubmit}
              />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
