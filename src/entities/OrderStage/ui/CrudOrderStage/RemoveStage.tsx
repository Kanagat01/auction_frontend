import { Modal } from "react-bootstrap";
import { OutlineButton, PrimaryButton, TextCenter, TitleMd } from "~/shared/ui";
import { removeStage } from "../OrderStageModal";

type ModalProps = {
  orderStageNumber: number;
  show: boolean;
  changeShow: () => void;
};

export function RemoveStageModal({
  orderStageNumber,
  show,
  changeShow,
}: ModalProps) {
  const onClick = () => {
    removeStage(orderStageNumber);
    changeShow();
  };
  return (
    <>
      <Modal
        show={show}
        onHide={changeShow}
        className="rounded-modal d-flex justify-content-center"
      >
        <Modal.Body>
          <TextCenter>
            <TitleMd style={{ fontSize: "1.7rem" }}>
              Вы уверены, что хотите удалить поставку{" "}
              <span style={{ color: "var(--primary)" }}>
                №{orderStageNumber}
              </span>{" "}
              ?
            </TitleMd>
          </TextCenter>
        </Modal.Body>
        <Modal.Footer className="justify-content-evenly">
          <OutlineButton
            className="py-2 px-4"
            style={{ fontSize: "1.4rem" }}
            onClick={changeShow}
          >
            Отмена
          </OutlineButton>
          <PrimaryButton
            className="py-2 px-4"
            style={{ fontSize: "1.4rem" }}
            onClick={onClick}
          >
            Удалить
          </PrimaryButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
