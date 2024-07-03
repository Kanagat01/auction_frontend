import { ButtonHTMLAttributes, ReactNode } from "react";
import { useUnit } from "effector-react";
import { Modal, ModalTitle } from "react-bootstrap";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  OutlineButton,
  PrimaryButton,
  TextCenter,
  TitleMd,
  BlueText,
  RoundedTable,
  Checkbox,
} from "~/shared/ui";
import { useModalState } from "~/shared/lib";
import {
  $orders,
  $selectedOrder,
  cancelOrder,
  completeOrder,
  isOrderSelected,
  publishOrder,
  unpublishOrder,
} from "..";

const btnProps = { className: "py-2 px-4", style: { fontSize: "1.4rem" } };

type ConfirmationModalProps = {
  show: boolean;
  onHide: () => void;
  onConfirm: () => void;
  title: ReactNode;
};

const ConfirmationModal = ({
  show,
  onHide,
  onConfirm,
  title,
}: ConfirmationModalProps) => (
  <Modal
    show={show}
    onHide={onHide}
    className="rounded-modal d-flex justify-content-center"
  >
    <Modal.Body>
      <TextCenter>
        <TitleMd style={{ fontSize: "1.7rem" }}>{title}</TitleMd>
      </TextCenter>
    </Modal.Body>
    <Modal.Footer className="justify-content-evenly">
      <OutlineButton {...btnProps} onClick={onHide}>
        Отмена
      </OutlineButton>
      <PrimaryButton {...btnProps} onClick={onConfirm}>
        Подтвердить
      </PrimaryButton>
    </Modal.Footer>
  </Modal>
);

export const CancelOrder = ({
  variant,
  ...props
}: { variant: "icon" | "text" } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const orderId = useUnit($selectedOrder);
  const orders = useUnit($orders);
  const order = orders.find((order) => order.id === orderId);

  const [show, changeShow] = useModalState(false);
  return (
    <>
      {variant === "icon" ? (
        <OutlineButton {...props} onClick={changeShow}>
          <FaRegTrashCan />
        </OutlineButton>
      ) : (
        <PrimaryButton {...props} onClick={changeShow}>
          Отменить
        </PrimaryButton>
      )}
      <ConfirmationModal
        show={show}
        onHide={changeShow}
        onConfirm={() => {
          cancelOrder();
          changeShow();
        }}
        title={
          <>
            Вы уверены, что хотите отменить заказ{" "}
            {<BlueText>№{order?.transportation_number}</BlueText>}
          </>
        }
      />
    </>
  );
};

export const PublishOrder = ({
  publishTo,
  ...props
}: {
  publishTo: "in_auction" | "in_bidding";
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const orderId = useUnit($selectedOrder);
  const orders = useUnit($orders);
  const order = orders.find((order) => order.id === orderId);

  const [show, changeShow] = useModalState(false);
  const publishText = publishTo === "in_auction" ? "в аукцион" : "на торги";
  return (
    <>
      <PrimaryButton {...props} onClick={() => isOrderSelected(changeShow)}>
        {publishText[0].toUpperCase() + publishText.slice(1)}
      </PrimaryButton>
      <ConfirmationModal
        show={show}
        onHide={changeShow}
        onConfirm={() => {
          publishOrder(publishTo);
          changeShow();
        }}
        title={
          <>
            Вы уверены, что хотите отправить заказ{" "}
            {<BlueText>№{order?.transportation_number}</BlueText>} {publishText}
            ?
          </>
        }
      />
    </>
  );
};

export const UnpublishOrder = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const orderId = useUnit($selectedOrder);
  const orders = useUnit($orders);
  const order = orders.find((order) => order.id === orderId);

  const [show, changeShow] = useModalState(false);
  return (
    <>
      <PrimaryButton {...props} onClick={() => isOrderSelected(changeShow)}>
        Вернуть в заказы
      </PrimaryButton>
      <ConfirmationModal
        show={show}
        onHide={changeShow}
        onConfirm={() => {
          unpublishOrder();
          changeShow();
        }}
        title={
          <>
            Вы уверены, что хотите "Вернуть в заказы" заказ{" "}
            {<BlueText>№{order?.transportation_number}</BlueText>}?
          </>
        }
      />
    </>
  );
};

export const CompleteOrder = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const orderId = useUnit($selectedOrder);
  const orders = useUnit($orders);
  const order = orders.find((order) => order.id === orderId);

  const [show, changeShow] = useModalState(false);
  return (
    <>
      <PrimaryButton {...props} onClick={() => isOrderSelected(changeShow)}>
        Завершить
      </PrimaryButton>
      <ConfirmationModal
        show={show}
        onHide={changeShow}
        onConfirm={() => {
          completeOrder();
          changeShow();
        }}
        title={
          <>
            Вы уверены, что хотите завершить заказ{" "}
            {<BlueText>№{order?.transportation_number}</BlueText>}?
          </>
        }
      />
    </>
  );
};

export function PublishOrderInDirect() {
  const fontSize = { fontSize: "1.4rem" };
  const btnStyle = {
    width: "100%",
    padding: "0.5rem 2rem",
    fontSize: "1.6rem",
  };

  const [show, changeShow] = useModalState(false);
  // const mainData = useUnit($mainData);
  // console.log(mainData); TODO

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
          <div className="buttons">
            <OutlineButton style={btnStyle}>Назначить</OutlineButton>
            <OutlineButton style={btnStyle}>Отмена</OutlineButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
