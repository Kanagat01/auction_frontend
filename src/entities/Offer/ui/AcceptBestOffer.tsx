import toast from "react-hot-toast";
import { ButtonHTMLAttributes } from "react";
import { useUnit } from "effector-react";
import { $selectedOrder, isOrderSelected } from "~/entities/Order";
import { useModalState } from "~/shared/lib";
import { BlueText, ConfirmationModal, PrimaryButton } from "~/shared/ui";
import { acceptOffer } from "..";

export const AcceptBestOffer = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const order = useUnit($selectedOrder);
  const bestOffer =
    order?.offers && order?.offers.length !== 0 ? order?.offers[0] : null;

  const [show, changeShow] = useModalState(false);
  const onClick = () => {
    if (order && !bestOffer)
      return toast.error("На этот заказ еще нет предложений");
    isOrderSelected(changeShow);
  };
  return (
    <>
      <PrimaryButton {...props} onClick={onClick}>
        Принять
      </PrimaryButton>
      {order && bestOffer && (
        <ConfirmationModal
          show={show}
          onHide={changeShow}
          onConfirm={() => {
            acceptOffer({
              transportation_number: order?.transportation_number,
              order_offer_id: bestOffer.id,
            });
            changeShow();
          }}
          title={
            <>
              Вы уверены, что хотите принять лучшее предложение на{" "}
              <BlueText>{bestOffer.price}</BlueText> от{" "}
              <BlueText>
                {bestOffer.transporter_manager.user.full_name}
              </BlueText>{" "}
              для заказа {<BlueText>№{order?.transportation_number}</BlueText>}?
            </>
          }
        />
      )}
    </>
  );
};
