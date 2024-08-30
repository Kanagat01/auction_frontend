import { useCallback } from "react";
import { useMatch, useParams } from "react-router";
import { OrderForm } from "~/widgets/OrderForm";
import { useIsActive } from "~/entities/User";
import { preCreateOrderFx } from "~/entities/OrderStage";
import { PageError, RoundedWhiteBox } from "~/shared/ui";
import { RenderPromise } from "~/shared/api";
import Routes from "~/shared/routes";

export default function OrderPage() {
  const isActive = useIsActive();
  const match = useMatch(Routes.EDIT_ORDER);
  const { transportationNumber } = useParams<{
    transportationNumber: string;
  }>();
  const trNumber = Number(transportationNumber);
  const fetchPreCreateOrder = useCallback(
    () =>
      preCreateOrderFx({
        transportation_number: match && trNumber ? trNumber : undefined,
      }),
    [match, transportationNumber]
  );
  return (
    <RoundedWhiteBox className="me-3">
      {isActive ? (
        RenderPromise(fetchPreCreateOrder, {
          error: (err) => {
            let errorMessage;
            if (typeof err === "string") {
              if (err === "order_not_found")
                errorMessage =
                  "Заказ с таким номером транспортировки не найден";
            } else errorMessage = `${err.name} ${err.message}`;
            return <PageError>{errorMessage}</PageError>;
          },
          success: (response) => <OrderForm {...response} />,
        })
      ) : (
        <PageError>
          У вас нет доступа к этой странице. Оплатите свой тариф, чтобы получить
          доступ
        </PageError>
      )}
    </RoundedWhiteBox>
  );
}
