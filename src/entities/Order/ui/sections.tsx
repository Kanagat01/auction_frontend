import { DataSection, DocumentsSection, MapSection } from "~/widgets";
import { OutlineButton } from "~/shared/ui";
import { useState } from "react";
import { TGetOrder } from "~/entities/Order";

export function OrderSections({ order }: { order: TGetOrder }) {
  const [currentSection, setCurrentSection] = useState<string>("data");
  const RenderSection = () => {
    switch (currentSection) {
      case "documents":
        return <DocumentsSection documents={order.documents ?? []} />;
      case "map":
        return <MapSection tracking={order.tracking} />;
      default:
        return <DataSection order={order} />;
    }
  };
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
      <RenderSection />
    </>
  );
}
