import { FormEvent, Fragment, useState } from "react";
import { useUnit } from "effector-react";
import { Modal } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import {
  $createOrderStages,
  OrderStages,
  addOrderStage,
} from "~/entities/OrderStage";
import { FolderPlus } from "~/shared/assets";
import { useModalState } from "~/shared/lib";
import { InputContainer, ModalTitle, OutlineButton } from "~/shared/ui";
import {
  OrderStageTranslations,
  baseInputProps,
  modalBtnStyle,
  modalButtonsStyle,
  stageInputProps,
  timeDivStyle,
  timeInputProps,
} from "./consts";

export const CreateOrderStage = () => {
  const [show, changeShow] = useModalState(false);
  const initialOrderStage =
    useUnit($createOrderStages).length % 2 === 0 ? "load" : "unload";
  const initialState = {
    address: "",
    cargo: "",
    comments: "",
    company: "",
    contact_person: "",
    date: "",
    time_end: "",
    time_start: "",
    volume: 0,
    weight: 0,
  };

  const [orderStage, setOrderStage] =
    useState<Omit<OrderStages, "id">>(initialState);
  const updateStageField = (field: string, value: any) => {
    setOrderStage((prevState) => ({ ...prevState, [field]: value }));
  };

  const createOrderStage = (e: FormEvent) => {
    e.preventDefault();

    addOrderStage({ stageName: initialOrderStage, ...orderStage });
    setOrderStage(initialState);
    changeShow();
  };
  const onReset = () => {
    setOrderStage(initialState);
    changeShow();
  };
  return (
    <>
      <ReactSVG
        src={FolderPlus}
        style={{ color: "gray" }}
        onClick={changeShow}
      />
      <Modal show={show} onHide={changeShow} className="gradient-modal">
        <Modal.Body>
          <form onSubmit={createOrderStage} onReset={onReset}>
            <ModalTitle>Поставка</ModalTitle>
            <InputContainer
              name="stage"
              label="Тип этапа"
              variant="bootstrap-select"
              options={[
                ["load", "Погрузка"],
                ["unload", "Выгрузка"],
              ]}
              defaultValue={initialOrderStage}
              {...stageInputProps}
            />
            {Object.entries(OrderStageTranslations).map(([name, label]) => {
              return (
                <Fragment key={name}>
                  <InputContainer
                    name={name}
                    label={label}
                    value={orderStage[name as keyof typeof orderStage]}
                    onChange={(
                      e: any // TODO
                    ) => updateStageField(name, e.target.value)}
                    variant={name === "comments" ? "textarea" : "input"}
                    type={name === "date" ? "date" : "text"}
                    {...baseInputProps}
                  />
                  {name === "date" ? (
                    <div style={timeDivStyle}>
                      {[
                        ["time_start", "С"],
                        ["time_end", "По"],
                      ].map(([name, label]) => (
                        <InputContainer
                          key={name}
                          name={name}
                          label={label}
                          variant="input"
                          value={orderStage[name as keyof typeof orderStage]}
                          onChange={(e) =>
                            updateStageField(name, e.target.value)
                          }
                          {...timeInputProps}
                        />
                      ))}
                    </div>
                  ) : (
                    ""
                  )}
                </Fragment>
              );
            })}
            <div style={modalButtonsStyle}>
              {["Сохранить", "Отмена"].map((text, idx) => (
                <OutlineButton
                  key={idx}
                  style={modalBtnStyle}
                  type={idx === 0 ? "submit" : "reset"}
                >
                  {text}
                </OutlineButton>
              ))}
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};
