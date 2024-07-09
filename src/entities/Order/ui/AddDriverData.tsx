import {
  useState,
  ChangeEvent,
  CSSProperties,
  ButtonHTMLAttributes,
} from "react";
import { Modal } from "react-bootstrap";
import { DriverProfileTranslations } from "~/entities/User";
import { useModalState } from "~/shared/lib";
import {
  InputContainer,
  modalInputProps,
  ModalTitle,
  OutlineButton,
  PrimaryButton,
} from "~/shared/ui";
import {
  isOrderSelected,
  AddDriverDataRequest,
  addDriverData,
  $selectedOrder,
} from "..";
import toast from "react-hot-toast";

const btnStyle: CSSProperties = {
  width: "100%",
  padding: "0.5rem 2rem",
  fontSize: "1.6rem",
  textWrap: "nowrap",
};
const inputs: [keyof Omit<AddDriverDataRequest, "order_id">, string][] = [
  ["full_name", "Имя"],
  ["phone_number", "+7 (777) 777 7777"],
  ["passport_number", "000000"],
  ["machine_data", "Данные"],
  ["machine_number", "000000"],
];
const initialState = {
  full_name: "",
  machine_data: "",
  machine_number: "",
  passport_number: "",
  phone_number: "",
};

export const AddDriverData = (
  props: ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const [show, changeShow] = useModalState(false);
  const [driverData, setDriverData] =
    useState<Omit<AddDriverDataRequest, "order_id">>(initialState);

  const onClick = () =>
    isOrderSelected(() => {
      if ($selectedOrder.getState()?.driver)
        toast.error("Данные о водителе уже существуют");
      else changeShow();
    });
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setDriverData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };
  const onReset = () => {
    setDriverData(initialState);
    changeShow();
  };
  const onSubmit = () => addDriverData({ ...driverData, onReset });
  return (
    <>
      <PrimaryButton {...props} onClick={onClick}>
        Подать данные
      </PrimaryButton>
      <Modal show={show} onHide={changeShow} className="gradient-modal">
        <Modal.Body>
          <ModalTitle className="mb-4">Подать данные</ModalTitle>
          {inputs.map(([name, placeholder], key) => (
            <InputContainer
              {...{ key, name, placeholder, onChange }}
              label={DriverProfileTranslations[name]}
              value={driverData[name]}
              variant="input"
              type={name !== "phone_number" ? "text" : "tel"}
              {...modalInputProps}
              className={modalInputProps.className.replace("mb-4", "mb-3")}
            />
          ))}
          <div className="buttons">
            <OutlineButton onClick={onSubmit} style={btnStyle}>
              Подать данные
            </OutlineButton>
            <OutlineButton onClick={onReset} style={btnStyle}>
              Отмена
            </OutlineButton>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
