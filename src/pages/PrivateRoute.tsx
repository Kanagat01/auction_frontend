import { useEffect } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUnit } from "effector-react";
import { Header, Sidebar } from "~/widgets";
import { $isAuthenticated } from "~/features/authorization";
import { $mainData } from "~/entities/User";
import { LOGIN_ROUTE } from "~/shared/routes";
import { Preloader } from "~/shared/ui";
import { getMainDataFx } from "~/entities/User/model/api";

export const PrivateRoute = () => {
  const isAuthenticated = useUnit($isAuthenticated);
  const location = useLocation();
  const mainData = useUnit($mainData);

  useEffect(() => {
    if (isAuthenticated && mainData === null) {
      getMainDataFx();
    }
  }, [isAuthenticated]);

  if (isAuthenticated) {
    if (mainData === null) {
      return <Preloader full_screen_mode />;
    }
    return (
      <div className="main-bg">
        <Header />
        <div className="app-wrapper">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    );
  }
  return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />;
};
