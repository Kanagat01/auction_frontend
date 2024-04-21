import { NavLink } from "react-router-dom";
import { ReactSVG } from "react-svg";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import { TableTanstack } from "~/widgets";
import {
  InputContainer,
  OutlineButton,
  PrimaryButton,
  RoundedWhiteBox,
} from "~/shared/ui";
import { FolderPlus } from "~/shared/assets";
import { NEW_ORDER_ROUTE } from "~/shared/routes";
import "./style.scss";

const HomePage = () => {
  return (
    <RoundedWhiteBox>
      <div className="p-5">
        <div className="main-title">
          <span>Заказы</span>
          <button>...</button>
        </div>
        <div className="control-panel">
          {[
            ["id", "№ Транспортировки", "00000000"],
            ["city_from", "Город-старт", "Москва"],
            ["city_to", "Город-место назначения", "Балашиха"],
          ].map(([name, label, placeholder], idx) => (
            <InputContainer
              key={idx}
              variant="input"
              name={name}
              label={label}
              placeholder={placeholder}
              style={{ height: "-webkit-fill-available" }}
            />
          ))}
          <div className="actions">
            <span className="actions-title">Действия</span>
            <div className="d-flex">
              <div className="d-inline-flex">
                <NavLink
                  to={NEW_ORDER_ROUTE}
                  className="outline-btn px-2 py-0 me-2"
                  style={{ fontSize: "2rem" }}
                >
                  <ReactSVG src={FolderPlus} />
                </NavLink>
                {[LuCopyPlus, LuPenSquare, FaRegTrashCan].map((Icon, idx) => (
                  <OutlineButton
                    key={idx}
                    className="px-2 py-0 me-2"
                    style={{ fontSize: "2rem" }}
                  >
                    <Icon />
                  </OutlineButton>
                ))}
              </div>
              <div className="d-inline-flex ms-3">
                {["В аукцион", "На торги", "Назначить"].map((buttonText) => (
                  <PrimaryButton key={buttonText} className="me-2 px-3 py-2">
                    {buttonText}
                  </PrimaryButton>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <TableTanstack />
    </RoundedWhiteBox>
  );
};

export default HomePage;
