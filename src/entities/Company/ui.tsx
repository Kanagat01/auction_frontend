import { Modal } from "react-bootstrap";
import { FaAngleDown } from "react-icons/fa";
import { FiCheck } from "react-icons/fi";
import { useModalState } from "~/shared/lib";
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
        <FaAngleDown
          style={{
            width: "2rem",
            height: "2rem",
            transform: show ? "rotate(180deg)" : "none",
          }}
        />
      </button>
      <Modal show={show} onHide={changeShow}>
        <Modal.Body
          style={{
            borderRadius: "10px",
            background: "#fff",
            padding: "3rem 2rem",
          }}
        >
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
          {companies.map((comp) => (
            <div className="d-flex align-items-center">
              <div
                className="rounded-block"
                style={{
                  backgroundColor: "var(company-logo-bg)",
                  color: "#fff",
                  fontFamily: "Gilroy",
                  fontSize: "2rem",
                  width: "4rem",
                  height: "4rem",
                  background: "var(--company-logo-bg)",
                }}
              >
                {comp.logo}
              </div>
              <div className="d-flex flex-column ms-3">
                <span
                  style={{
                    color: "rgb(5, 10, 4)",
                    fontFamily: "Gilroy",
                    fontSize: "1.6rem",
                    fontWeight: 600,
                    textAlign: "left",
                    lineHeight: "20px",
                  }}
                >
                  {comp.name}
                </span>
                <span
                  style={{
                    color: "rgba(5, 10, 4, 0.5)",
                    fontFamily: "Gilroy",
                    fontSize: "1.4rem",
                    fontWeight: 400,
                    textAlign: "left",
                    lineHeight: "17px",
                  }}
                >
                  {comp.role}
                </span>
              </div>
              {comp.checked ? (
                <FiCheck
                  className="ms-auto"
                  color="var(--green)"
                  style={{ width: "3rem", height: "2rem" }}
                />
              ) : (
                ""
              )}
            </div>
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
