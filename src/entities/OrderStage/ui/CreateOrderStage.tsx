import { Modal } from "react-bootstrap";
import { ReactSVG } from "react-svg";
import { FolderPlus } from "~/shared/assets";
import { useModalState } from "~/shared/lib";
import { InputContainer, ModalTitle, OutlineButton } from "~/shared/ui";

export const CreateOrderStage = () => {
  const [show, changeShow] = useModalState(false);
  const createOrderStage = () => {
    // toast.promise(addOrderStageFx({ order_id: 5 }), {
    //   loading: "Создаем поставку...",
    //   success: () => "Поставка успешно создана",
    //   error: (err) => `Произошла ошибка: ${err}`,
    // });
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
          <ModalTitle>Поставка</ModalTitle>
          {[
            ["stage", "Тип этапа", "Погрузка"],
            ["date", "Дата", "23.02.2022"],
            ["company", "Компания", ""],
            ["address", "Адрес", ""],
            ["contact_person", "Контактное лицо", ""],
            ["cargo", "Груз", ""],
            ["weight", "Вес", ""],
            ["volume", "Обьем", ""],
            ["comment", "Комментарий к поставке", ""],
          ].map(([name, label, placeholder]) => (
            <InputContainer
              key={name}
              name={name}
              label={label}
              placeholder={placeholder}
              variant="input"
              label_style={{ color: "var(--default-font-color)" }}
              className={`w-100 mb-2`}
            />
          ))}
          <div
            className="d-flex align-items-center mt-4"
            style={{ gap: "3rem" }}
          >
            {[
              { text: "Сохранить", onClick: createOrderStage },
              { text: "Отмена", onClick: changeShow },
            ].map(({ text, onClick }) => (
              <OutlineButton
                style={{
                  width: "100%",
                  padding: "0.5rem 2rem",
                  fontSize: "1.6rem",
                }}
                onClick={onClick}
              >
                {text}
              </OutlineButton>
            ))}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};
