import { preCreateOrderFx } from "~/entities/OrderStage";
import { RoundedWhiteBox, TitleLg } from "~/shared/ui";
import { renderPromise } from "~/shared/api";
import { logger } from "~/shared/config";
import { OrderForm } from "~/widgets/OrderForm";

export default function OrderPage() {
  return (
    <RoundedWhiteBox>
      {renderPromise(preCreateOrderFx, {
        error: (err) => {
          logger.error(err);
          return (
            <TitleLg>
              {err.name} {err.message}
            </TitleLg>
          );
        },
        success: (response) => <OrderForm {...response} />,
      })}
    </RoundedWhiteBox>
  );
}
