import { useState, ChangeEvent, KeyboardEvent } from "react";
import { Header, OrderSections } from "~/widgets";
import {
  MainTitle,
  Preloader,
  RoundedWhiteBox,
  SearchInput,
  TextCenter,
} from "~/shared/ui";
import { useUnit } from "effector-react";
import { $selectedOrder, getOrderFx, selectOrder } from "~/entities/Order";
import { Modal } from "react-bootstrap";
import { useModalState } from "~/shared/lib";

export default function FindCargo() {
  const order = useUnit($selectedOrder);
  const [show, changeShow] = useModalState(false);
  const [transportation_number, setTransportationNumber] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const findCargo = async () => {
    if (transportation_number == 0) return;
    if (order?.transportation_number === transportation_number) {
      changeShow();
      return;
    }
    setLoading(true);
    setError("");
    try {
      const data = await getOrderFx(transportation_number);
      selectOrder(data.id);
      changeShow();
    } catch (error: any) {
      if (typeof error === "string" && error === "order_not_found")
        setError("Рейс с таким трек-номером не найден");
      else setError(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="main-bg">
      <Header />
      <div
        className="app-wrapper justify-content-center my-5"
        style={{ height: "calc(100vh - 17rem)" }}
      >
        <RoundedWhiteBox
          className="d-flex justify-content-center"
          style={{ width: "90%" }}
        >
          <div
            className="d-flex flex-column align-items-center m-5"
            style={{ width: "35rem" }}
          >
            <MainTitle className="mb-5">
              <TextCenter>Поиск рейса по треку-номеру</TextCenter>
            </MainTitle>
            <SearchInput
              value={transportation_number !== 0 ? transportation_number : ""}
              onChange={(e: ChangeEvent<HTMLInputElement>) => {
                const value = Number(e.target.value);
                if (isNaN(value) || value < 0) return;
                setTransportationNumber(value);
              }}
              onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                if (e.key === "-" || e.key === "+") {
                  e.preventDefault();
                }
              }}
              placeholder="Трек номер отправителя"
              container_style={{ width: "100%" }}
              iconOnClick={findCargo}
            />
            <div className="mt-5 w-100">
              {loading && <Preloader />}
              <Modal show={show} onHide={changeShow} className="rounded-modal">
                <Modal.Body>
                  <OrderSections />
                </Modal.Body>
              </Modal>
              {order?.transportation_number === transportation_number && (
                <TextCenter className="mt-5">
                  <MainTitle style={{ fontSize: "2.5rem", fontWeight: 500 }}>
                    Чтобы посмотреть информацию о текущем рейсе, нажмите на
                    значок поиска
                  </MainTitle>
                </TextCenter>
              )}
              {error && (
                <TextCenter className="mt-5">
                  <MainTitle style={{ fontSize: "2.5rem", fontWeight: 500 }}>
                    {error}
                  </MainTitle>
                </TextCenter>
              )}
            </div>
          </div>
        </RoundedWhiteBox>
      </div>
    </div>
  );
}
