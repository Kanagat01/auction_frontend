import { useEffect, useState } from "react";
import { useUnit } from "effector-react";
import { Modal } from "react-bootstrap";
import { DataSection, MapSection } from "~/widgets";
import { $currentOrder, $orderModal, changeOrderModal } from "~/entities/Order";
import { DocumentsList } from "~/entities/Document";
import { OutlineButton } from "~/shared/ui";

export function OrderSections() {
  const orderModal = useUnit($orderModal);
  const order = useUnit($currentOrder);
  const [currentSection, setCurrentSection] = useState<string>("data");
  useEffect(() => {
    if (!orderModal) {
      setCurrentSection("data");
    }
  }, [orderModal]);
  return (
    order && (
      <Modal
        show={orderModal}
        onHide={changeOrderModal}
        className="rounded-modal"
      >
        <Modal.Body>
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
          {currentSection === "documents" ? (
            <DocumentsList documents={order.documents ?? []} />
          ) : currentSection === "map" ? (
            <MapSection tracking={order.tracking} />
          ) : (
            <DataSection order={order} />
          )}
        </Modal.Body>
      </Modal>
    )
  );
}
