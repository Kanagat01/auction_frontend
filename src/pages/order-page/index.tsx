import { useCallback } from "react";
import { useMatch, useParams } from "react-router";
import { OrderForm } from "~/widgets/OrderForm";
import { preCreateOrderFx } from "~/entities/OrderStage";
import { RoundedWhiteBox, TextCenter, TitleLg } from "~/shared/ui";
import { RenderPromise } from "~/shared/api";
import Routes from "~/shared/routes";

export default function OrderPage() {
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
      {RenderPromise(fetchPreCreateOrder, {
        error: (err) => {
          let errorMessage;
          if (typeof err === "string") {
            if (err === "order_not_found")
              errorMessage = "Заказ с таким номером транспортировки не найден";
          } else errorMessage = `${err.name} ${err.message}`;
          return (
            <TextCenter className="p-5">
              <TitleLg>{errorMessage}</TitleLg>
            </TextCenter>
          );
        },
        success: (response) => <OrderForm {...response} />,
      })}
    </RoundedWhiteBox>
  );
}
