import { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useLocation } from "react-router-dom";
import { useUnit } from "effector-react";
import { createEvent, createStore } from "effector";
import { COLLAPSED_STORAGE_KEY } from "~/shared/lib";
import { InputProps } from "~/shared/ui";
import Routes from "~/shared/routes";

export function usePageFromSearchParams(): number | undefined {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return Number(searchParams.get("page")) || undefined;
}

export const useDefaultInputs = (): {
  cityFrom: string;
  cityTo: string;
  transportationNumber: number;
  defaultInputs: Omit<InputProps, "variant">[];
} => {
  const [cityFrom, setCityFrom] = useState<string>("");
  const [cityTo, setCityTo] = useState<string>("");
  const [transportationNumber, setTransportationNumber] = useState<number>(0);
  const defaultInputs: Omit<InputProps, "variant">[] = [
    {
      name: "transportation_number",
      label: "№ Транспортировки",
      placeholder: "00000000",
      type: "number",
      min: 0,
      value: transportationNumber !== 0 ? transportationNumber : "",
      onChange: (e: ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (isNaN(value) || value < 0) return;
        setTransportationNumber(value);
      },
      onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "-" || e.key === "+") {
          e.preventDefault();
        }
      },
    },
    {
      name: "city_from",
      label: "Город-старт",
      placeholder: "Москва",
      value: cityFrom,
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setCityFrom(e.target.value),
    },
    {
      name: "city_to",
      label: "Город-место назначения",
      placeholder: "Балашиха",
      value: cityTo,
      onChange: (e: ChangeEvent<HTMLInputElement>) => setCityTo(e.target.value),
    },
  ];
  return { cityFrom, cityTo, transportationNumber, defaultInputs };
};

const setCollapsed = createEvent<boolean>();
const $collapsed = createStore<boolean>(false).on(
  setCollapsed,
  (_, state) => state
);

export const useCollapsed = (): [boolean, () => void] => {
  const currentRoute = useLocation().pathname;
  const savedCollapsed = localStorage.getItem(COLLAPSED_STORAGE_KEY);

  const [collapsedDict, setCollapsedDict] = useState(
    savedCollapsed
      ? JSON.parse(savedCollapsed)
      : {
          [Routes.ORDERS_IN_AUCTION]: false,
          [Routes.ORDERS_IN_BIDDING]: false,
          [Routes.ORDERS_IN_DIRECT]: false,
          [Routes.ORDERS_BEING_EXECUTED]: false,
          [Routes.CANCELLED_ORDERS]: false,
          [Routes.UNPUBLISHED_ORDERS]: false,
        }
  );
  const collapsed = useUnit($collapsed);

  useEffect(() => {
    setTimeout(() => setCollapsed(collapsedDict[currentRoute]), 50);
  }, [currentRoute]);

  useEffect(() => {
    const newCollapsedDict = { ...collapsedDict, [currentRoute]: collapsed };
    setCollapsedDict(newCollapsedDict);
    localStorage.setItem(
      COLLAPSED_STORAGE_KEY,
      JSON.stringify(newCollapsedDict)
    );
  }, [collapsed]);

  return [collapsed, () => setCollapsed(!collapsed)];
};
