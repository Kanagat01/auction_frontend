import { FiCheck } from "react-icons/fi";
import { Company } from "./model";

export const CompanyCard = (comp: Company) => {
  return (
    <div className="d-flex align-items-center">
      <div
        className="rounded-block"
        style={{
          backgroundColor: "var(company-logo-bg)",
          color: "#fff",
          fontFamily: "Gilroy",
          fontSize: "2rem",
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
            lineHeight: "2.0rem",
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
            lineHeight: "1.7rem",
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
  );
};
