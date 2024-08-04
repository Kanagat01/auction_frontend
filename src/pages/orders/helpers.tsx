import {
  useState,
  useEffect,
  useCallback,
  KeyboardEvent,
  ChangeEvent,
} from "react";
import { useLocation } from "react-router-dom";
import { createEvent, createStore } from "effector";
import { useUnit } from "effector-react";
import { ControlPanel, ControlPanelProps, OrderSections } from "~/widgets";
import {
  $orders,
  $ordersPagination,
  getOrdersFx,
  OrdersList,
  TOrderStatus,
} from "~/entities/Order";
import {
  CollapsableSidebar,
  MainTitle,
  RoundedWhiteBox,
  TextCenter,
} from "~/shared/ui";
import { COLLAPSED_STORAGE_KEY } from "~/shared/lib";
import { renderPromise } from "~/shared/api";
import Routes from "~/shared/routes";

export const iconActionProps = {
  className: "outline-btn px-2 py-0 me-2",
  style: { fontSize: "2rem" },
};
export const textActionProps = { className: "me-2 px-3 py-2" };

export function usePageFromSearchParams(): number | undefined {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  return Number(searchParams.get("page")) || undefined;
}

type TOrdersPage = {
  title: string;
  pageData: ControlPanelProps;
  status: TOrderStatus;
};

const setCollapsed = createEvent<boolean>();
const $collapsed = createStore<boolean>(false).on(
  setCollapsed,
  (_, state) => state
);

export function OrdersPage({ title, pageData, status }: TOrdersPage) {
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

  const orders = useUnit($orders);
  const paginator = useUnit($ordersPagination);
  const [cityFrom, setCityFrom] = useState<string>("");
  const [cityTo, setCityTo] = useState<string>("");
  const [transportationNumber, setTransportationNumber] = useState<number>(0);
  const defaultInputs = [
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

  const page = usePageFromSearchParams();
  const fetchOrders = useCallback(
    () => getOrdersFx({ status, page, cityFrom, cityTo, transportationNumber }),
    [status, page, cityFrom, cityTo, transportationNumber]
  );
  return (
    <>
      <RoundedWhiteBox style={{ width: "90%" }}>
        {title === "forbidden" ? (
          <TextCenter className="p-5 mt-5">
            <MainTitle style={{ fontSize: "2.5rem", fontWeight: 500 }}>
              У вас нет прав для просмотра данной страницы
            </MainTitle>
          </TextCenter>
        ) : (
          <>
            <div className="p-5">
              <MainTitle>{title}</MainTitle>
              <ControlPanel inputs={defaultInputs} {...pageData} />
            </div>
            {renderPromise(fetchOrders, {
              success: (
                <OrdersList
                  orders={orders}
                  paginator={paginator ?? undefined}
                />
              ),
              error: (err) => (
                <TextCenter className="p-5 mt-5">
                  <MainTitle style={{ fontSize: "2.5rem", fontWeight: 500 }}>
                    Произошла ошибка: {err?.message}
                  </MainTitle>
                </TextCenter>
              ),
            })}
          </>
        )}
      </RoundedWhiteBox>
      <CollapsableSidebar
        collapsed={collapsed}
        toggleExpand={() => setCollapsed(!collapsed)}
      >
        <OrderSections />
      </CollapsableSidebar>
    </>
  );
}
