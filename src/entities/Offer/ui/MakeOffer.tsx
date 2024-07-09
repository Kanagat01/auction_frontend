import { ButtonHTMLAttributes, ChangeEvent, useEffect, useState } from "react";
import { Modal } from "react-bootstrap";
import { useUnit } from "effector-react";
import { $selectedOrder, isOrderSelected } from "~/entities/Order";
import { createOffer } from "~/entities/Offer";
import { useModalState } from "~/shared/lib";
import {
  InputContainer,
  modalInputProps,
  ModalTitle,
  OutlineButton,
  PrimaryButton,
} from "~/shared/ui";
import toast from "react-hot-toast";

const btnStyle = {
  width: "100%",
  padding: "0.5rem 2rem",
  fontSize: "1.6rem",
};

export const MakeOffer = ({
  inAuction = false,
  ...props
}: { inAuction?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const order = useUnit($selectedOrder);
  const price_max =
    (order?.offers ? order.offers[0].price : order ? order.start_price : 0) -
    (order && order.price_step ? order.price_step : 0);
  const [price, setPrice] = useState<number>(0);

  const changePrice = (num: number) => {
    if (inAuction && num <= 0 && num > price_max) return;
    setPrice(num);
  };
  const [show, changeShow] = useModalState(false);
  const onClick = () => {
    if (order && order.price_data && order.price_data.by_you) {
      toast.error("Вы уже сделали предложение");
      return;
    }
    isOrderSelected(changeShow);
  };
  const onReset = () => {
    changePrice(0);
    changeShow();
  };

  useEffect(() => {
    if (inAuction) setPrice(price_max);
    else if (order && order.price_data && order.price_data.by_you)
      setPrice(order.price_data.price);
  }, [order]);

  return (
    <>
      <PrimaryButton {...props} onClick={onClick}>
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
              changePrice(Number(e.target.value))
            }
            variant="input"
            type="number"
            {...modalInputProps}
            readOnly={inAuction}
          />
          <div className="buttons">
            <OutlineButton
              style={btnStyle}
              onClick={() =>
                order ? createOffer({ order_id: order.id, price, onReset }) : ""
              }
            >
              Подтвердить
            </OutlineButton>
            <OutlineButton style={btnStyle} onClick={onReset}>
              Отмена
            </OutlineButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
