import { t } from "i18next";
import toast from "react-hot-toast";
import { createEvent } from "effector";
import { $selectedOrder, setSelectedOrder } from "./store";
import { AddDriverDataRequest } from "./api_types";
import { addDriverDataFx } from "./api";
import { updateOrder } from "./order_crud_events";

const isDriverDataValid = (data: Omit<AddDriverDataRequest, "order_id">) => {
  const regex = /^\+?1?\d{9,15}$/;
  const notFilledIn: string[] = [];

  const fields = [
    { value: data.full_name, label: t("driverProfileTranslations.full_name") },
    {
      value: data.machine_data,
      label: t("driverProfileTranslations.machine_data"),
    },
    {
      value: data.machine_number,
      label: t("driverProfileTranslations.machine_number"),
    },
    {
      value: data.passport_number,
      label: t("driverProfileTranslations.passport_number"),
    },
    {
      value: data.phone_number,
      label: t("driverProfileTranslations.phone_number"),
    },
  ];

  fields.forEach(({ value, label }) => {
    if (value === "") notFilledIn.push(label);
  });
  if (notFilledIn.length > 0) {
    toast.error(
      t("common.fillOutRequired", { fields: notFilledIn.join(", ") })
    );
    return false;
  }
  if (!regex.test(data.phone_number)) {
    toast.error(t("addDriverData.wrongPhoneNumber"));
    return false;
  }
  return true;
};

export const addDriverData = createEvent<
  Omit<AddDriverDataRequest, "order_id"> & { onReset: () => void }
>();
addDriverData.watch(({ onReset, ...data }) => {
  const order_id = $selectedOrder.getState()?.id;
  if (!order_id) return;
  if (!isDriverDataValid(data)) return;

  toast.promise(addDriverDataFx({ order_id, ...data }), {
    loading: t("addDriverData.loading"),
    success: (driver) => {
      updateOrder({ orderId: order_id, newData: { driver } });
      setSelectedOrder(null);
      onReset();
      return t("addDriverData.success");
    },
    error: (error) => {
      if (error === "Status should be being_executed") {
        return t("addDriverData.shouldBeBeingExecuted");
      } else if (typeof error === "object") {
        const getErrorValue = (value: unknown) => {
          if (Array.isArray(value) && typeof value[0] === "string") {
            if (value[0].startsWith("max_length is")) {
              const maxLength = value[0].split(" ").at(-2);
              return t("addDriverData.maxLengthIs", { maxLength });
            } else if (value[0] === "required")
              return t("common.requiredField");
            else if (value[0] === "must_be_unique")
              return t("addDriverData.mustBeUnique");
          }
          return value;
        };
        return Object.entries(error)
          .map(
            ([key, value]) =>
              `${t(`driverProfileTranslations.${key}`)}: ${getErrorValue(
                value
              )}`
          )
          .join("\n");
      }
      return t("common.errorMessage", { error });
    },
  });
});
