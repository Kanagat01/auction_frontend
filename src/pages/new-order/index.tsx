import { Col, Row } from "react-bootstrap";
import { InputContainer, OutlineButton, RoundedWhiteBox } from "~/shared/ui";
import styles from "./styles.module.scss";
import { ReactSVG } from "react-svg";
import { FolderPlus } from "~/shared/assets";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import { FaRegTrashCan } from "react-icons/fa6";

export default function NewOrder() {
  const options1: Array<[string, string]> = [
    ["1", "Тентовый"],
    ["2", "Контейнер"],
    ["3", "Фургон"],
    ["4", "Решрижератор"],
  ];
  const options2: Array<[string, string]> = [
    ["1", "Верхняя"],
    ["2", "Боковая"],
    ["3", "Задняя"],
    ["4", "С полной растен.."],
  ];
  const pogruzka = [
    "09.09.2022 15:00-16:00",
    "Москва РОКВУП ООО",
    "Адрес доставки",
  ];
  return (
    <RoundedWhiteBox>
      <Row className="p-4">
        <Col md={6} lg={3} className="mb-4">
          <div className={styles.title}>Заказчик</div>
          {[
            ["customer", "Заказчик", "Поиск"],
            ["contact_person", "Контактное лицо", "Поиск"],
            ["start_price", "Стартовая цена", "10000"],
            ["price_step", "Шаг цены", "1000"],
            ["id", "№ Транспортировки", "00000000"],
          ].map(([name, label, placeholder]) => (
            <InputContainer
              key={name}
              name={name}
              label={label}
              placeholder={placeholder}
              variant="input"
              label_style={{ color: "var(--default-font-color)" }}
              className={`${styles.input} w-100 mb-2`}
            />
          ))}
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <div className={styles.title}>Дополнительно</div>
          {[
            ["", "Комментарий для перевозчиков"],
            ["", "Доп. требования"],
          ].map(([name, label]) => (
            <InputContainer
              key={label}
              variant="textarea"
              name={name}
              label={label}
              label_style={{ color: "var(--default-font-color)" }}
              className={`${styles.textarea} w-100 mb-2`}
              rows={7}
            />
          ))}
        </Col>
        <Col md={12} lg={5} className="mb-4">
          <div className={styles.title}>Транспорт</div>
          <Row>
            {[
              { name: "", label: "Тип кузова", options: options1 },
              { name: "", label: "Загрузка", options: options2 },
              { name: "", label: "Выгрузка", options: options2 },
            ].map((props, idx) => (
              <Col key={idx} md={4} className="p-0">
                <InputContainer
                  variant="select"
                  label_style={{ color: "var(--default-font-color)" }}
                  className={styles.select}
                  multiple={true}
                  size={5}
                  {...props}
                />
              </Col>
            ))}
            {[
              { name: "", label: "ТС, м3" },
              { name: "", label: "Темп. режим" },
              { name: "", label: "ADR" },
              { name: "", label: "Длина кузова" },
              { name: "", label: "Ширина кузова" },
              { name: "", label: "Высота кузова" },
            ].map((props, idx) => (
              <Col key={idx} md={4} className="p-0 mt-3">
                <InputContainer
                  variant="input"
                  label_style={{ color: "var(--default-font-color)" }}
                  className={styles.input}
                  {...props}
                />
              </Col>
            ))}
          </Row>
        </Col>
        <Col md={12} lg={8}>
          <table className={styles.table}>
            <tr>
              {["Этап", "Дата время", "Компания", "Адрес"].map((text, idx) => (
                <th key={idx} rowSpan={2}>
                  {text}
                </th>
              ))}
              <th colSpan={2} className={styles.upperCell}>
                Груз
              </th>
              <th rowSpan={2}>
                Контактное лицо <br />
                Телефон
              </th>
            </tr>
            <tr>
              <th className={styles.lowerCell1}>Вес</th>
              <th className={styles.lowerCell2}>Обьем</th>
            </tr>
            {["Погрузка", "Выгрузка"].map((stage) => (
              <>
                <tr>
                  <td rowSpan={2}>{stage}</td>
                  {pogruzka.map((text, idx) => (
                    <td key={idx} rowSpan={2}>
                      {text}
                    </td>
                  ))}
                  <td colSpan={2} className={styles.upperCell}>
                    Минераловый утеплитель
                  </td>
                  <td rowSpan={2} style={{ fontSize: "1.2rem" }}>
                    <div className="text-center">Фио контактное лицо</div>
                    <div className="text-center">(578) 564-45-74</div>
                  </td>
                </tr>
                <tr>
                  <td className={`${styles.lowerCell1} text-center`}>468</td>
                  <td className={`${styles.lowerCell2} text-center`}>34</td>
                </tr>
              </>
            ))}
          </table>
        </Col>
        <Col md={12} lg={4}>
          <InputContainer
            name=""
            label="№ Поставки"
            variant="input"
            label_style={{ color: "var(--default-font-color)" }}
            className={styles.input}
          />

          {[
            () => <ReactSVG src={FolderPlus} />,
            LuCopyPlus,
            LuPenSquare,
            FaRegTrashCan,
          ].map((Icon, idx) => (
            <OutlineButton
              key={idx}
              className="px-2 py-0 me-2"
              style={{ fontSize: "2rem" }}
            >
              <Icon />
            </OutlineButton>
          ))}
        </Col>
      </Row>
    </RoundedWhiteBox>
  );
}
