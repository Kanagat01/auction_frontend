import { TableTanstack } from "~/widgets";
import {
  InputContainer,
  MainTitle,
  OutlineButton,
  RoundedWhiteBox,
} from "~/shared/ui";

const CargoPlan = () => {
  return (
    <RoundedWhiteBox>
      <div className="p-5">
        <MainTitle>План погрузки</MainTitle>
        <div className="control-panel">
          {[
            ["", "Пункт погрузки", "Пункт погрузки"],
            ["", "Дата", "04.07.2023"],
          ].map(([name, label, placeholder], idx) => (
            <InputContainer
              key={idx}
              variant="input"
              container_style={{ justifyContent: "end" }}
              name={name}
              label={label}
              placeholder={placeholder}
            />
          ))}
          <div className="actions flex-row">
            {[
              ["Прибытие", "Закрыть для перевозчика"],
              ["Погрузка", "Открыть для перевозчика"],
              ["Отбытие"],
              ["Проблема", "Подать данные"],
            ].map((arr, key) => (
              <div
                key={key}
                className="d-inline-flex flex-column"
                style={{ gap: "0.8rem", maxWidth: "13rem" }}
              >
                {arr.map((text, idx) => (
                  <OutlineButton
                    key={idx}
                    className={
                      idx === 1 && [0, 1].includes(key)
                        ? "px-4 me-3"
                        : "px-4 py-2 me-3"
                    }
                    style={{
                      lineHeight: "1.4rem",
                      height: key !== 2 ? "-webkit-fill-available" : "",
                    }}
                  >
                    {text}
                  </OutlineButton>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
      <TableTanstack />
    </RoundedWhiteBox>
  );
};

export default CargoPlan;
