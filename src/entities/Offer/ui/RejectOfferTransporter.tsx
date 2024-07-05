import { ButtonHTMLAttributes } from "react";
import { useUnit } from "effector-react";
import { $selectedOrder, isOrderSelected } from "~/entities/Order";
import { useModalState } from "~/shared/lib";
import { BlueText, ConfirmationModal, PrimaryButton } from "~/shared/ui";
import { rejectOfferTransporter } from "..";

export const RejectOfferTransporter = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const order = useUnit($selectedOrder);
  const offer = order?.price_data ? order.price_data : null;
  const [show, changeShow] = useModalState(false);
  return (
    <>
      <PrimaryButton {...props} onClick={() => isOrderSelected(changeShow)}>
        Отказаться
      </PrimaryButton>
      {order && offer && (
        <ConfirmationModal
          show={show}
          onHide={changeShow}
          onConfirm={() => {
            rejectOfferTransporter({
              transportation_number: order.transportation_number,
              order_offer_id: offer.offer_id,
            });
            changeShow();
          }}
          title={
            <>
              Вы уверены, что хотите отказаться от заказа{" "}
              {<BlueText>№{order.transportation_number}</BlueText>} на сумму{" "}
              {<BlueText>{offer.price}</BlueText>}?
            </>
          }
        />
      )}
    </>
  );
};
