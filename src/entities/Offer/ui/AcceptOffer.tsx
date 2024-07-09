import toast from "react-hot-toast";
import { ButtonHTMLAttributes } from "react";
import { createEvent, createStore } from "effector";
import { useUnit } from "effector-react";
import { useModalState } from "~/shared/lib";
import { BlueText, ConfirmationModal, OutlineButton } from "~/shared/ui";
import { OrderOffer, acceptOffer } from "..";
import { $selectedOrder } from "~/entities/Order";

export const selectOffer = createEvent<OrderOffer | null>();
export const $selectedOffer = createStore<OrderOffer | null>(null).on(
  selectOffer,
  (_, newState) => newState
);

export const AcceptOffer = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const order = useUnit($selectedOrder);
  const offer = useUnit($selectedOffer);
  const [show, changeShow] = useModalState(false);

  const onClick = () =>
    offer ? changeShow() : toast.error("Выберите предложение");
  return (
    <>
      <OutlineButton {...props} onClick={onClick}>
        Принять
      </OutlineButton>
      {offer && (
        <ConfirmationModal
          show={show}
          onHide={changeShow}
          onConfirm={() => {
            acceptOffer({
              isBestOffer: false,
              transportation_number: order!.transportation_number,
              order_offer_id: offer.id,
            });
            changeShow();
          }}
          title={
            <>
              Вы уверены, что хотите принять предложение{" "}
              <BlueText>#{offer.id}</BlueText> от{" "}
              <BlueText>
                {offer.transporter_manager.company.company_name}{" "}
                {offer.transporter_manager.user.full_name}
              </BlueText>{" "}
              ?
            </>
          }
        />
      )}
    </>
  );
};
