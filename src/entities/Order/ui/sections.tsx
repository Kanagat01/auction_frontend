import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { DataSection, MapSection } from "~/widgets";
import { $currentOrder } from "~/entities/Order";
import { DocumentsList } from "~/entities/Document";
import { OutlineButton, TitleLg } from "~/shared/ui";

export function OrderSections() {
  const order = useUnit($currentOrder);
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
      <Section />
    </>
  );
}
