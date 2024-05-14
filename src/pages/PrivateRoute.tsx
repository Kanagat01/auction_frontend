import { useUnit } from "effector-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Header, Sidebar } from "~/widgets";
import { $isAuthenticated } from "~/features/authorization";
import { LOGIN_ROUTE } from "~/shared/routes";

export const PrivateRoute = () => {
  const isAuthenticated = useUnit($isAuthenticated);
  const location = useLocation();

  return isAuthenticated ? (
    <div className="main-bg">
      <Header />
      <div className="app-wrapper">
        <Sidebar />
        <Outlet />
      </div>
    </div>
  ) : (
    <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />
  );
};
