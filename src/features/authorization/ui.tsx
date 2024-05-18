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
        <ReactSVG src={Logout} />
      </button>
      <Modal show={show} onHide={changeShow} className="rounded-modal">
        <Modal.Body>
          <TextCenter>
            <TitleMd style={{ fontSize: "1.7rem" }}>
              Вы уверены, что хотите выйти со своего аккаунта?
            </TitleMd>
          </TextCenter>
        </Modal.Body>
        <Modal.Footer className="justify-content-evenly">
          <OutlineButton style={{ fontSize: "1.4rem" }} onClick={changeShow}>
            Отмена
          </OutlineButton>
          <PrimaryButton style={{ fontSize: "1.4rem" }} onClick={logout}>
            Выйти
          </PrimaryButton>
        </Modal.Footer>
      </Modal>
    </>
  );
}
