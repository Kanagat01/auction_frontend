import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useUnit } from "effector-react";

import { Header, Sidebar } from "~/widgets";
import { $isAuthenticated } from "~/features/authorization";
import { $mainData } from "~/entities/User";
import { LOGIN_ROUTE } from "~/shared/routes";
import { Preloader } from "~/shared/ui";

export function PrivateRoute() {
  const isAuthenticated = useUnit($isAuthenticated);
  const location = useLocation();
  const mainData = useUnit($mainData);

  if (!isAuthenticated)
    return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />;

  return mainData ? (
    <div className="main-bg">
      <Header />
      <div className="app-wrapper">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  ) : (
    <Preloader full_screen_mode />
  );
}
