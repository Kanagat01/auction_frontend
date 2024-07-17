import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useUnit } from "effector-react";
import { DataSection, MapSection } from "~/widgets";
import { $userType, getRole } from "~/entities/User";
import { $selectedOrder } from "~/entities/Order";
import { AcceptOffer, OffersList } from "~/entities/Offer";
import {
  AddDocument,
  DeleteDocument,
  DocumentsList,
} from "~/entities/Document";
import { documentButtonProps, OutlineButton, TitleLg } from "~/shared/ui";
import { ORDERS_IN_AUCTION, ORDERS_IN_BIDDING } from "~/shared/routes";

export function OrderSections() {
  const userType = useUnit($userType);
  const order = useUnit($selectedOrder);

  const currentRoute = useLocation().pathname;
  const showOffers =
    getRole(userType) === "customer" &&
    [ORDERS_IN_BIDDING, ORDERS_IN_AUCTION].includes(currentRoute);

  const [currentSection, setCurrentSection] = useState<string>("data");
  const Section = () => {
    if (order) {
      switch (currentSection) {
        case "documents":
          return <DocumentsList documents={order.documents ?? []} />;
        case "map":
          return <MapSection tracking={order.tracking ?? null} />;
        case "data":
          return <DataSection order={order} />;
        case "offers":
          return <OffersList offers={order.offers ?? []} />;
      }
    } else
      return (
        <div style={{ display: "grid", placeItems: "center", height: "5rem" }}>
          <TitleLg>Выберите заказ</TitleLg>
        </div>
      );
  };

  useEffect(() => {
    setCurrentSection(order ? "data" : "");
  }, [order]);

  return (
    <>
      <div className="d-flex align-items-center justify-content-between my-4">
        {[
          ["Данные", "data"],
          ["Трекинг", "map"],
          ["Документы", "documents"],
        ].map(([text, section], key) => (
          <OutlineButton
            key={key}
            style={{
              padding: "0.5rem 2rem",
              fontSize: "1.4rem",
            }}
            onClick={() => setCurrentSection(section)}
            className={currentSection === section ? "active" : ""}
          >
            {text}
          </OutlineButton>
        ))}
      </div>

      {showOffers ? (
        <div className="d-flex align-items-center justify-content-between my-4">
          <OutlineButton
            style={{
              padding: "0.5rem 2rem",
              fontSize: "1.4rem",
            }}
            onClick={() => setCurrentSection("offers")}
            className={currentSection === "offers" ? "active" : ""}
          >
            Предложения
          </OutlineButton>
          <AcceptOffer
            style={{
              padding: "0.5rem 2rem",
              fontSize: "1.4rem",
              color: "#fff",
              background: "#8BC34A",
              border: "none",
            }}
            className={currentSection !== "offers" ? "d-none" : ""}
          />
          <div
            style={
              currentSection === "documents"
                ? { height: "3.5rem" }
                : { display: "none" }
            }
          >
            <AddDocument {...documentButtonProps} />
            <DeleteDocument
              documents={(order && order.documents) ?? []}
              {...documentButtonProps}
            />
          </div>
        </div>
      ) : (
        ""
      )}

      <Section />
    </>
  );
}