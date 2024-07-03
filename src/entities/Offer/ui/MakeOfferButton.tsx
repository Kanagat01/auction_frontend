import { ButtonHTMLAttributes, ChangeEvent, useState } from "react";
import { Modal } from "react-bootstrap";
import { useUnit } from "effector-react";
import { $selectedOrder, isOrderSelected } from "~/entities/Order";
import { createOffer } from "~/entities/Offer";
import { useModalState } from "~/shared/lib";
import {
  InputContainer,
  ModalTitle,
  OutlineButton,
  PrimaryButton,
} from "~/shared/ui";

const btnStyle = {
  width: "100%",
  padding: "0.5rem 2rem",
  fontSize: "1.6rem",
};

export const MakeOfferButton = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const order_id = useUnit($selectedOrder);
  const [price, setPrice] = useState<number>(0);
  const [show, changeShow] = useModalState(false);
  return (
    <>
      <PrimaryButton {...props} onClick={() => isOrderSelected(changeShow)}>
        Сделать ставку
      </PrimaryButton>
      <Modal show={show} onHide={changeShow} className="gradient-modal">
        <Modal.Body>
          <ModalTitle>Предложение</ModalTitle>
          <InputContainer
            name="price"
            label="Цена [rub]"
            value={price}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPrice(Number(e.target.value))
            }
            variant="input"
            type="number"
            label_style={{
              color: "var(--default-font-color)",
              fontSize: "1.4rem",
              marginBottom: "0.5rem",
            }}
            className="w-100 mb-2 px-4 py-3"
            style={{ border: "none", borderRadius: "10px" }}
          />
          <div className="buttons">
            <OutlineButton
              style={btnStyle}
              onClick={() =>
                order_id ? createOffer({ order_id, price, changeShow }) : ""
              }
            >
              Подтвердить
            </OutlineButton>
            <OutlineButton
              style={btnStyle}
              onClick={() => {
                setPrice(0);
                changeShow();
              }}
            >
              Отмена
            </OutlineButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
