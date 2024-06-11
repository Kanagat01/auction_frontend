import { Modal } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { FolderPlus } from "~/shared/assets";
import { useModalState } from "~/shared/lib";
import { ModalTitle, OutlineButton } from "~/shared/ui";
import styles from "./styles.module.scss";
import {
  StageTypeInput,
  clearStages,
  addStageCouple,
  TimeInput,
  Field,
} from "./consts";

export const CreateOrderStageCouple = () => {
  const [show, changeShow] = useModalState(false);
  const onReset = () => {
    clearStages();
    changeShow();
  };
  const onSubmit = () => {
    addStageCouple();
    changeShow();
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
          <form>
            <ModalTitle>Поставка</ModalTitle>
            <StageTypeInput />
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
              {["Сохранить", "Отмена"].map((text, idx) => (
                <OutlineButton
                  key={idx}
                  className={styles.modalBtn}
                  type={idx === 0 ? "button" : "reset"}
                  onClick={idx === 0 ? onSubmit : onReset}
                >
                  {text}
                </OutlineButton>
              ))}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
