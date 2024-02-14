import SearchInput from "~/shared/ui/SearchInput";
import person from "./icons/ava.jpg";
import { FaAngleDown } from "react-icons/fa";
import { FaRegBell } from "react-icons/fa6";
import { RxPerson } from "react-icons/rx";
import { CiSettings } from "react-icons/ci";
import { HiOutlineLogout } from "react-icons/hi";
import { TbBrandGoogleAnalytics } from "react-icons/tb";
import Sidebar1 from "./icons/sidebar1";
import "./style.scss";

const HomePage = () => {
  return (
    <div className="container">
      <header>
        <div className="logo">
          <span className="logo-circle">Logo</span>
          <div className="logo-name">Transpareon</div>
        </div>
        <div className="left-side">
          <SearchInput placeholder="Поиск" />
          <div className="menu-profile-info">
            <div className="profile-img">
              <img src={person} alt="person-img" />
            </div>
            <div className="profile-main">
              <span className="full-name">Anton Zheltyshev</span>
              <span className="org-name">ООО “Евразия” (312362)</span>
            </div>
            <span>
              <FaAngleDown style={{ width: "2rem", height: "2rem" }} />
            </span>
          </div>
          <div className="actions">
            <a href="#">
              <FaRegBell />
            </a>
            <a href="#">
              <RxPerson />
            </a>
            <a href="#">
              <CiSettings />
            </a>
            <a href="#">
              <HiOutlineLogout />
            </a>
          </div>
        </div>
      </header>
      <div style={{ display: "flex", padding: "3rem 0 3rem 1.5rem" }}>
        <aside>
          <a href="#">
            <Sidebar1 style={{ width: "100%", height: "100%" }} />
          </a>
          <a href="#">
            <TbBrandGoogleAnalytics style={{ width: "100%", height: "100%" }} />
          </a>
          <a href="#">
            <TbBrandGoogleAnalytics style={{ width: "100%", height: "100%" }} />
          </a>
          <a href="#">
            <TbBrandGoogleAnalytics style={{ width: "100%", height: "100%" }} />
          </a>
        </aside>
        <main>
          <h1>Заказчики</h1>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
