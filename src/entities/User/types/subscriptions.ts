export enum CustomerSubscriptionTranslation {
  customer_unpaid = "Заказчик НЕоплаченный",
  customer_paid = "Заказчик оплаченный",
}
export type CustomerSubscriptions =
  keyof typeof CustomerSubscriptionTranslation;

export enum TransporterSubscriptionTranslation {
  transporter_unpaid = "Перевозчик НЕоплаченный",
  transporter_paid = "Перевозчик оплаченный",
}

export type TransporterSubscriptions =
  keyof typeof TransporterSubscriptionTranslation;
