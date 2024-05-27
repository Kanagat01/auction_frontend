import { ReactNode } from "react";
import { InputContainer, InputProps } from "~/shared/ui";

type ControlPanelProps = {
  inputs?: Omit<InputProps, "variant">[];
  iconActions?: ReactNode;
  textActions?: ReactNode;
};

export function ControlPanel({
  inputs,
  iconActions,
  textActions,
}: ControlPanelProps) {
  return (
    <div className="control-panel">
      {inputs &&
        inputs.map((props, idx) => (
          <InputContainer
            key={idx}
            {...props}
            variant="input"
            style={{ width: "100%", height: "-webkit-fill-available" }}
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
