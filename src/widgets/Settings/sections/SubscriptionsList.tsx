import toast from "react-hot-toast";
import { useUnit } from "effector-react";
import { FormEvent, useState } from "react";
import { $mainData, changeSubscription } from "~/entities/User";
import { Checkbox, PrimaryButton, RoundedTable, TextCenter } from "~/shared/ui";
import { btnStyle, fontSize } from "./helpers";

export function SubscriptionsList() {
  const mainData = useUnit($mainData);
  if (!mainData || !("subscriptions_list" in mainData)) return null;

  const [subscriptionId, setSubscriptionId] = useState(
    mainData.subscription?.id
  );
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (subscriptionId) changeSubscription({ subscription_id: subscriptionId });
    else toast.error("Выберите тариф");
  };

  const onReset = (e: FormEvent) => {
    e.preventDefault();
    setSubscriptionId(mainData.subscription?.id);
  };

  const style = {
    ...fontSize,
    paddingTop: "0.25rem",
    paddingBottom: "0.25rem",
  };
  return (
    <form onSubmit={onSubmit} onReset={onReset}>
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
              checked={subscription.id === subscriptionId}
              onChange={() => setSubscriptionId(subscription.id)}
            />
          </TextCenter>,
        ])}
        layoutFixed={false}
      />
      <div className="d-flex justify-content-evenly w-100 mt-5">
        <PrimaryButton type="submit" style={btnStyle}>
          Сохранить
        </PrimaryButton>
        <PrimaryButton type="reset" style={btnStyle}>
          Отмена
        </PrimaryButton>
      </div>
    </form>
  );
}
