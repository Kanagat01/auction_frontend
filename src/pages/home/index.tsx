import { FaRegTrashCan } from "react-icons/fa6";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import "./style.scss";
import { Header, Sidebar, TableTanstack } from "~/widgets";
import { PrimaryButton, FolderPlusIcon, InputContainer } from "~/shared/ui";

const HomePage = () => {
  return (
    <div
      style={{
        background: "var(--main-bg-color)",
      }}
    >
      <Header />
      <div className="app-wrapper">
        <Sidebar />
        <main>
          <div className="main-head">
            <div className="main-title">
              <span>Заказы</span>
              <button>...</button>
            </div>
            <div className="control-panel">
              {[
                ["id", "№ Транспортировки", "00000000"],
                ["city_from", "Город-старт", "Москва"],
                ["city_to", "Город-место назначения", "Балашиха"],
              ].map(([name, label, placeholder]) => (
                <InputContainer
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
                    {[
                      FolderPlusIcon,
                      LuCopyPlus,
                      LuPenSquare,
                      FaRegTrashCan,
                    ].map((Icon) => (
                      <button className="me-2">
                        <Icon style={{ width: "2rem", height: "2rem" }} />
                      </button>
                    ))}
                  </div>
                  <div className="d-inline-flex ms-3">
                    {["В аукцион", "На торги", "Назначить"].map(
                      (buttonText) => (
                        <PrimaryButton
                          style={{
                            background: "var(--primary)",
                            color: "#fff",
                            fontSize: "1.2rem",
                            fontWeight: 400,
                            borderRadius: "5px",
                          }}
                          className="me-2 px-3 py-2"
                        >
                          {buttonText}
                        </PrimaryButton>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="main-body">
            <TableTanstack />
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
