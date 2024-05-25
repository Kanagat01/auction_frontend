import { Modal } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { Logout } from "~/shared/assets";
import { useModalState } from "~/shared/lib";
import { logout } from ".";
import { OutlineButton, PrimaryButton, TextCenter, TitleMd } from "~/shared/ui";

export function LogoutBtn() {
  const [show, changeShow] = useModalState(false);
  return (
    <>
      <button onClick={changeShow}>
        <ReactSVG
          src={Logout}
          style={{ fontSize: "3rem", lineHeight: "2rem" }}
        />
      </button>
      <Modal
        show={show}
        onHide={changeShow}
        className="rounded-modal d-flex justify-content-center"
      >
        <Modal.Body>
          <TextCenter>
            <TitleMd style={{ fontSize: "1.7rem" }}>
              Вы уверены, что хотите выйти со своего аккаунта?
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
            onClick={logout}
          >
            Выйти
          </PrimaryButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
