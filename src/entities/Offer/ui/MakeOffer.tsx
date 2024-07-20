import toast from "react-hot-toast";
import { Modal } from "react-bootstrap";
import { useUnit } from "effector-react";
import { ButtonHTMLAttributes, ChangeEvent, useEffect, useState } from "react";
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
  const priceData = order?.price_data;

  const [price, setPrice] = useState<number>(0);

  const changePrice = (num: number) => {
    if (inAuction) return;
    if (num > 0) setPrice(num);
  };
  const [show, changeShow] = useModalState(false);
  const onClick = () => {
    if (order && priceData && "is_best_offer" in priceData) {
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
    let newPrice = price;
    if (inAuction && order) {
      if (priceData && "current_price" in priceData)
        newPrice = priceData.current_price - order.price_step;
      else newPrice = order.start_price - order.price_step;
    } else if (order && priceData && "price" in priceData)
      newPrice = priceData.price;

    setPrice(newPrice);
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
            min={0}
            {...modalInputProps}
          />
          <div className="buttons">
            <OutlineButton
              style={btnStyle}
              onClick={() =>
                order && price > 0
                  ? createOffer({
                      order_id: order.id,
                      price,
                      inAuction,
                      onReset,
                    })
                  : toast.error("Цена должна быть больше 0")
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
