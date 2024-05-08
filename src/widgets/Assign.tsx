import { Modal } from "react-bootstrap";
import { useModalState } from "~/shared/lib";
import {
  Checkbox,
  ModalTitle,
  OutlineButton,
  PrimaryButton,
  RoundedTable,
  TextCenter,
} from "~/shared/ui";

export function Assign() {
  const [show, changeShow] = useModalState(false);
  const fontSize = { fontSize: "1.4rem" };
  return (
    <>
      <PrimaryButton className="me-2 px-3 py-2" onClick={changeShow}>
        Назначить
      </PrimaryButton>
      <Modal show={show} onHide={changeShow} className="gradient-modal">
        <Modal.Body>
          <ModalTitle>Назначить</ModalTitle>
          <RoundedTable
            lightBorderMode={true}
            columns={[
              <TextCenter style={fontSize}>Перевозчик</TextCenter>,
              <TextCenter style={fontSize}>Выбор</TextCenter>,
            ]}
            data={[
              [
                <TextCenter className="p-1" style={fontSize}>
                  ЕВРАЗИЯ ООО
                  <br />
                  Инн 3247984543
                </TextCenter>,
                <TextCenter className="p-1">
                  <Checkbox />
                </TextCenter>,
              ],
            ]}
          />
          <div
            className="d-flex align-items-center mt-4"
            style={{ gap: "3rem" }}
          >
            <OutlineButton
              style={{
                width: "100%",
                padding: "0.5rem 2rem",
                fontSize: "1.6rem",
              }}
            >
              Назначить
            </OutlineButton>
            <OutlineButton
              style={{
                width: "100%",
                padding: "0.5rem 2rem",
                fontSize: "1.6rem",
              }}
            >
              Отмена
            </OutlineButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
