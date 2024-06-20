import { ButtonHTMLAttributes } from "react";
import { useUnit } from "effector-react";
import { Modal } from "react-bootstrap";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  BlueText,
  OutlineButton,
  PrimaryButton,
  TextCenter,
  TitleMd,
} from "~/shared/ui";
import { useModalState } from "~/shared/lib";
import {
  $selectedOrder,
  cancelOrder,
  completeOrder,
  isOrderSelected,
  publishOrder,
  unpublishOrder,
} from "..";

const btnProps = { className: "py-2 px-4", style: { fontSize: "1.4rem" } };

export const CancelOrder = ({
  variant,
  ...props
}: { variant: "icon" | "text" } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const transportationNumber = useUnit($selectedOrder);
  const [show, changeShow] = useModalState(false);
  return (
    <>
      {variant === "icon" ? (
        <OutlineButton {...props} onClick={() => isOrderSelected(changeShow)}>
          <FaRegTrashCan />
        </OutlineButton>
      ) : (
        <PrimaryButton {...props} onClick={() => isOrderSelected(changeShow)}>
          Отменить
        </PrimaryButton>
      )}
      <Modal
        show={show}
        onHide={changeShow}
        className="rounded-modal d-flex justify-content-center"
      >
        <Modal.Body>
          <TextCenter>
            <TitleMd style={{ fontSize: "1.7rem" }}>
              Вы уверены, что хотите отменить заказ{" "}
              <BlueText>№{transportationNumber}</BlueText>?
            </TitleMd>
          </TextCenter>
        </Modal.Body>
        <Modal.Footer className="justify-content-evenly">
          <OutlineButton {...btnProps} onClick={changeShow}>
            Закрыть
          </OutlineButton>
          <PrimaryButton
            {...btnProps}
            onClick={() => {
              cancelOrder();
              changeShow();
            }}
          >
            Отменить
          </PrimaryButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const PublishOrder = ({
  publishTo,
  ...props
}: {
  publishTo: "in_auction" | "in_bidding";
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const transportationNumber = useUnit($selectedOrder);
  const [show, changeShow] = useModalState(false);
  return (
    <>
      <PrimaryButton {...props} onClick={() => isOrderSelected(changeShow)}>
        {publishTo === "in_auction" ? "В аукцион" : "На торги"}
      </PrimaryButton>
      <Modal
        show={show}
        onHide={changeShow}
        className="rounded-modal d-flex justify-content-center"
      >
        <Modal.Body>
          <TextCenter>
            <TitleMd style={{ fontSize: "1.7rem" }}>
              Вы уверены, что хотите отправить заказ{" "}
              <BlueText>№{transportationNumber}</BlueText>{" "}
              {publishTo === "in_auction" ? "в аукцион" : "на торги"}?
            </TitleMd>
          </TextCenter>
        </Modal.Body>
        <Modal.Footer className="justify-content-evenly">
          <OutlineButton {...btnProps} onClick={changeShow}>
            Отмена
          </OutlineButton>
          <PrimaryButton
            {...btnProps}
            onClick={() => {
              publishOrder(publishTo);
              changeShow();
            }}
          >
            Отправить
          </PrimaryButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const UnpublishOrder = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const transportationNumber = useUnit($selectedOrder);
  const [show, changeShow] = useModalState(false);
  return (
    <>
      <PrimaryButton {...props} onClick={() => isOrderSelected(changeShow)}>
        Вернуть в заказы
      </PrimaryButton>
      <Modal
        show={show}
        onHide={changeShow}
        className="rounded-modal d-flex justify-content-center"
      >
        <Modal.Body>
          <TextCenter>
            <TitleMd style={{ fontSize: "1.7rem" }}>
              Вы уверены, что хотите "Вернуть в заказы" заказ{" "}
              <BlueText>№{transportationNumber}</BlueText>?
            </TitleMd>
          </TextCenter>
        </Modal.Body>
        <Modal.Footer className="justify-content-evenly">
          <OutlineButton {...btnProps} onClick={changeShow}>
            Отмена
          </OutlineButton>
          <PrimaryButton
            {...btnProps}
            onClick={() => {
              unpublishOrder();
              changeShow();
            }}
          >
            Вернуть в заказы
          </PrimaryButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const CompleteOrder = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const transportationNumber = useUnit($selectedOrder);
  const [show, changeShow] = useModalState(false);
  return (
    <>
      <PrimaryButton {...props} onClick={() => isOrderSelected(changeShow)}>
        Завершить
      </PrimaryButton>
      <Modal
        show={show}
        onHide={changeShow}
        className="rounded-modal d-flex justify-content-center"
      >
        <Modal.Body>
          <TextCenter>
            <TitleMd style={{ fontSize: "1.7rem" }}>
              Вы уверены, что хотите завершить заказ{" "}
              <BlueText>№{transportationNumber}</BlueText>?
            </TitleMd>
          </TextCenter>
        </Modal.Body>
        <Modal.Footer className="justify-content-evenly">
          <OutlineButton {...btnProps} onClick={changeShow}>
            Отмена
          </OutlineButton>
          <PrimaryButton
            {...btnProps}
            onClick={() => {
              completeOrder();
              changeShow();
            }}
          >
            Завершить
          </PrimaryButton>
        </Modal.Footer>
      </Modal>
    </>
  );
};
