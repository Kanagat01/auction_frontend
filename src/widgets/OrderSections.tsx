import { useState } from "react";
import { useUnit } from "effector-react";
import { useLocation } from "react-router-dom";
import { DataSection, MapSection } from "~/widgets";
import { AcceptOffer, OffersList } from "~/entities/Offer";
import { $userType, getRole } from "~/entities/User";
import { $selectedOrder } from "~/entities/Order";
import {
  AddDocument,
  DeleteDocument,
  DocumentsList,
} from "~/entities/Document";
import { documentButtonProps, OutlineButton, TitleLg } from "~/shared/ui";
import { useMediaQuery } from "~/shared/lib";
import Routes from "~/shared/routes";

type TSection = "documents" | "map" | "data" | "offers";
const sections: [string, TSection][] = [
  ["Данные", "data"],
  ["Трекинг", "map"],
  ["Документы", "documents"],
];

export function OrderSections() {
  const userType = useUnit($userType);
  const order = useUnit($selectedOrder);

  const currentRoute = useLocation().pathname;
  const showOffers =
    getRole(userType) === "customer" &&
    ([Routes.ORDERS_IN_BIDDING, Routes.ORDERS_IN_AUCTION] as string[]).includes(
      currentRoute
    );

  const [currentSection, setCurrentSection] = useState<TSection>("data");
  const Section = () => {
    if (order) {
      switch (currentSection) {
        case "documents":
          return <DocumentsList documents={order.documents ?? []} />;
        case "map":
          return <MapSection tracking={order!.tracking ?? null} />;
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
  return (
    <>
      <div className="d-flex align-items-center justify-content-between my-4">
        {sections.map(([text, section], key) => (
          <OutlineButton
            key={key}
            style={{
              padding: "0.5rem 2rem",
              fontSize: "1.4rem",
              ...(useMediaQuery("(max-width: 375px)") && {
                padding: "0.5rem 1rem",
              }),
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
