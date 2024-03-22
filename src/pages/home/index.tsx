import { ReactSVG } from "react-svg";
import { FaRegTrashCan } from "react-icons/fa6";
import { LuCopyPlus, LuPenSquare } from "react-icons/lu";
import { Header, Sidebar, TableTanstack } from "~/widgets";
import { Button, InputContainer } from "~/shared/ui";
import { FolderPlus } from "~/shared/assets";
import "./style.scss";

const HomePage = () => {
  return (
    <div className="main-bg">
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
                      () => <ReactSVG src={FolderPlus} />,
                      LuCopyPlus,
                      LuPenSquare,
                      FaRegTrashCan,
                    ].map((Icon) => (
                      <Button
                        variant="outline"
                        className="me-2"
                        style={{ fontSize: "2rem" }}
                      >
                        <Icon />
                      </Button>
                    ))}
                  </div>
                  <div className="d-inline-flex ms-3">
                    {["В аукцион", "На торги", "Назначить"].map(
                      (buttonText) => (
                        <Button variant="primary" className="me-2 px-3 py-2">
                          {buttonText}
                        </Button>
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
