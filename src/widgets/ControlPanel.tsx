import { useUnit } from "effector-react";
import { ReactNode } from "react";
import { $selectedOrder } from "~/entities/Order";
import { InputContainer, InputProps } from "~/shared/ui";

export type ControlPanelProps = {
  inputs?: Omit<InputProps, "variant">[];
  iconActions?: ReactNode;
  textActions?: ReactNode;
  priceInputs?: boolean;
};

export function ControlPanel({
  inputs,
  iconActions,
  textActions,
  priceInputs = false,
}: ControlPanelProps) {
  const order = useUnit($selectedOrder);
  const priceData = order?.price_data;
  if (priceInputs) {
    const auctionInputs: Omit<InputProps, "variant">[] = [
      {
        name: "price",
        label: "Актуальная цена",
        defaultValue:
          priceData && "current_price" in priceData
            ? priceData.current_price
            : order?.start_price,
        readOnly: true,
      },
      {
        name: "price_step",
        label: "Шаг цены",
        defaultValue: order?.price_step,
        readOnly: true,
      },
    ];
    if (inputs) inputs = [...inputs, ...auctionInputs];
    else inputs = auctionInputs;
  }
  return (
    <div className="control-panel">
      {inputs?.map((props, idx) => (
        <InputContainer
          key={idx}
          {...props}
          variant="input"
          style={{ width: "100%", height: "-webkit-fill-available" }}
          autoComplete="off"
        />
      ))}
      <div className="actions">
        {iconActions && <span className="actions-title">Действия</span>}
        <div className="d-flex">
          <div className="d-inline-flex">{iconActions}</div>
          <div className="d-inline-flex ms-3">{textActions}</div>
        </div>
      </div>
    </div>
  );
}
