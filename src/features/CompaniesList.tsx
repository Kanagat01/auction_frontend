import { Modal } from "react-bootstrap";
import { Company, CompanyCard } from "~/entities/Company";
import { useModalState } from "~/shared/lib";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";

export function CompaniesList() {
  const [show, changeShow] = useModalState(false);
  const companies = [
    {
      logo: "E",
      name: "ООО “Евразия” (312362)",
      role: "Руководитель",
      checked: true,
    },
  ];
  return (
    <>
      <button
        style={{ border: "none", background: "none" }}
        onClick={changeShow}
      >
        {show ? (
          <FaAngleDown className="avg-icon" />
        ) : (
          <FaAngleUp className="avg-icon" />
        )}
      </button>
      <Modal show={show} onHide={changeShow}>
        <Modal.Body>
          <div
            style={{
              color: "rgba(5, 10, 4, 0.6)",
              fontFamily: "Gilroy",
              fontSize: "1.5rem",
              textAlign: "left",
            }}
            className="mb-4"
          >
            Ваши компании
          </div>
          {companies.map((comp: Company) => (
            <CompanyCard {...comp} />
          ))}
          <a
            href="#"
            className="d-inline-flex align-items-center mt-4"
            style={{ gap: "1rem", textDecoration: "none" }}
          >
            <div
              className="rounded-block"
              style={{
                boxSizing: "border-box",
                border: "1px solid rgba(5, 10, 4, 0.2)",
              }}
            >
              <FiPlus style={{ width: "3rem", height: "3rem" }} />
            </div>
            <span
              style={{
                color: "rgb(48, 84, 232)",
                fontFamily: "Gilroy",
                fontSize: "1.8rem",
                fontWeight: 600,
                lineHeight: "2rem",
                textAlign: "left",
              }}
            >
              Добавить компанию
            </span>
          </a>
        </Modal.Body>
      </Modal>
    </>
  );
}
