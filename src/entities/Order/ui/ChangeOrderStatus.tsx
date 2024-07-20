import toast from "react-hot-toast";
import { ButtonHTMLAttributes, ChangeEvent, useState } from "react";
import { useUnit } from "effector-react";
import { Modal, ModalTitle } from "react-bootstrap";
import { FaRegTrashCan } from "react-icons/fa6";
import { $mainData, CustomerManager } from "~/entities/User";
import {
  OutlineButton,
  PrimaryButton,
  TextCenter,
  BlueText,
  RoundedTable,
  Checkbox,
  ConfirmationModal,
  InputContainer,
  modalInputProps,
} from "~/shared/ui";
import { useModalState } from "~/shared/lib";
import {
  $selectedOrder,
  cancelOrder,
  completeOrder,
  isOrderSelected,
  OrderStatus,
  publishOrder,
  unpublishOrder,
} from "..";

export const CancelOrder = ({
  variant,
  ...props
}: { variant: "icon" | "text" } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const order = useUnit($selectedOrder);
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

export const UnpublishOrder = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const order = useUnit($selectedOrder);
  const [show, changeShow] = useModalState(false);
  const onClick = () => {
    if (order?.status === OrderStatus.completed)
      toast.error('Вы не можете "Вернуть в заказы" завершенный заказ');
    else isOrderSelected(changeShow);
  };
  return (
    <>
      <PrimaryButton {...props} onClick={onClick}>
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

export const PublishOrder = ({
  publishTo,
  ...props
}: {
  publishTo: "in_auction" | "in_bidding";
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const order = useUnit($selectedOrder);
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
          publishOrder({ publish_to: publishTo });
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

export function PublishOrderInDirect() {
  const fontSize = { fontSize: "1.4rem" };
  const btnStyle = {
    width: "100%",
    padding: "0.5rem 2rem",
    fontSize: "1.6rem",
  };

  const mainData = useUnit($mainData);
  const [show, changeShow] = useModalState(false);
  const [companyId, setCompanyId] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const onReset = () => {
    setCompanyId(0);
    setPrice(0);
    changeShow();
  };
  const onSubmit = () => {
    if (companyId === 0) {
      toast.error("Выберите компанию перевозчика");
    } else if (price === 0) {
      toast.error("Цена должна быть больше нуля");
    } else {
      publishOrder({
        publish_to: "in_direct",
        transporter_company_id: companyId,
        price,
      });
      onReset();
    }
  };
  return (
    <>
      <PrimaryButton
        className="me-2 px-3 py-2"
        onClick={() => isOrderSelected(changeShow)}
      >
        Назначить
      </PrimaryButton>
      <Modal show={show} onHide={changeShow} className="gradient-modal">
        <Modal.Body>
          <ModalTitle>Назначить</ModalTitle>
          <InputContainer
            name="price"
            label="Предлагаемая цена [rub]"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPrice(Number(e.target.value))
            }
            variant="input"
            type="number"
            {...modalInputProps}
          />
          <RoundedTable
            lightBorderMode={true}
            columns={[
              <TextCenter style={fontSize}>Перевозчик</TextCenter>,
              <TextCenter style={fontSize}>Выбор</TextCenter>,
            ]}
            data={(
              mainData as CustomerManager
            ).allowed_transporter_companies.map(
              ({ transporter_company_id, company_name }) => [
                <TextCenter className="p-1" style={fontSize}>
                  №{transporter_company_id} {company_name}
                </TextCenter>,
                <TextCenter className="p-1">
                  <Checkbox
                    checked={transporter_company_id === companyId}
                    onChange={() =>
                      setCompanyId(
                        transporter_company_id !== companyId
                          ? transporter_company_id
                          : 0
                      )
                    }
                  />
                </TextCenter>,
              ]
            )}
          />
          <div className="buttons">
            <OutlineButton onClick={onSubmit} style={btnStyle}>
              Назначить
            </OutlineButton>
            <OutlineButton onClick={onReset} style={btnStyle}>
              Отмена
            </OutlineButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export const CompleteOrder = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const order = useUnit($selectedOrder);
  const [show, changeShow] = useModalState(false);
  const onClick = () => {
    if (order?.status == OrderStatus.completed)
      toast.error("Этот заказ уже завершен");
    else isOrderSelected(changeShow);
  };
  return (
    <>
      <PrimaryButton {...props} onClick={onClick}>
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
