import { preCreateOrderFx } from "~/entities/OrderStage";
import { OrderForm } from "~/widgets/OrderForm";
import { RoundedWhiteBox, TitleLg } from "~/shared/ui";
import { renderPromise } from "~/shared/api";
import { logger } from "~/shared/config";

export default function OrderPage() {
  return (
    <RoundedWhiteBox className="me-3">
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
