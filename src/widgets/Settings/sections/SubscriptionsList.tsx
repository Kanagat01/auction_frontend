import { useUnit } from "effector-react";
import { $mainData } from "~/entities/User";
import { Checkbox, PrimaryButton, RoundedTable, TextCenter } from "~/shared/ui";
import { btnStyle, fontSize } from "./helpers";

export function SubscriptionsList() {
  const mainData = useUnit($mainData);
  const style = {
    ...fontSize,
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
  };
  return (
    mainData &&
    "subscriptions_list" in mainData && (
      <>
        <RoundedTable
          columns={[
            <TextCenter style={style}>Тариф</TextCenter>,
            <TextCenter style={style}>Стоимость</TextCenter>,
            <TextCenter style={style}>Выбран</TextCenter>,
          ]}
          data={mainData.subscriptions_list.map((subscription) => [
            <TextCenter style={style}>{subscription.name}</TextCenter>,
            <TextCenter style={style}>
              {Number(subscription.price).toLocaleString("ru-RU", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 2,
              })}
            </TextCenter>,
            <TextCenter style={{ display: "grid", justifyItems: "center" }}>
              <Checkbox
                checked={subscription.id === mainData.subscription?.id}
                onChange={() => {}}
              />
            </TextCenter>,
          ])}
          layoutFixed={false}
        />
        <div className="d-flex justify-content-evenly w-100 mt-3">
          <PrimaryButton type="submit" style={btnStyle}>
            Сохранить
          </PrimaryButton>
          <PrimaryButton type="reset" style={btnStyle}>
            Отмена
          </PrimaryButton>
        </div>
      </>
    )
  );
}
