import { ComponentType, lazy, useContext } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import { AuthContext } from "~/app/providers/withAuthContext";
import * as routes from "~/shared/routes";
import { Header, Sidebar } from "~/widgets";

const Login = lazy(() => import("./login"));
const ForgotPassword = lazy(() => import("./forgot-password"));
const HomePage = lazy(() => import("./home"));
const NewOrder = lazy(() => import("./new-order"));
const Cabinet = lazy(() => import("./cabinet"));

const PrivateRoute = () => {
  const { isAuthenticated } = useContext(AuthContext);
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
    <Navigate to={routes.LOGIN_ROUTE} state={{ from: location }} replace />
  );
};

export const Routing = () => {
  const private_routes: Array<[string, ComponentType]> = [
    [routes.HOME_ROUTE, HomePage],
    [routes.NEW_ORDER_ROUTE, NewOrder],
    [routes.PROFILE_ROUTE, Cabinet],
  ];
  return (
    <Routes>
      <Route path={routes.LOGIN_ROUTE} element={<Login />} />
      <Route path={routes.FORGOT_PASSWORD_ROUTE} element={<ForgotPassword />} />
      <Route element={<PrivateRoute />}>
        {private_routes.map(([path, Component]) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
