import { NavLink } from "react-router-dom";
import styles from "./styles.module.scss";
import { RiArrowRightSLine } from "react-icons/ri";

export const Paginator = (paginator: { size: number; currentPage: number }) => {
  let pages = [];
  const { size, currentPage } = paginator;
  if (size <= 10) {
    for (let i = 1; i <= size; i++) pages.push(i);
  } else if (currentPage - 5 <= 0) {
    for (let i = 1; i <= 10; i++) pages.push(i);
  } else if (size - currentPage <= 5) {
    for (let i = size - 10; i <= size; i++) pages.push(i);
  } else {
    for (let i = currentPage - 5; i <= currentPage + 5; i++) pages.push(i);
  }
  return (
    <div className={styles.pagination}>
      {pages.map((page) => (
        <NavLink
          to="#"
          key={page}
          className={paginator.currentPage === page ? styles.activePage : ""}
          onClick={(e) => {
            if (paginator.currentPage === page) {
              e.preventDefault();
            }
          }}
        >
          {page}
        </NavLink>
      ))}
      <NavLink to="#" style={{ marginTop: "-3px" }}>
        <RiArrowRightSLine />
      </NavLink>
    </div>
  );
};
