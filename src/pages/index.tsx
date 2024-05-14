import { ComponentType, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import * as routes from "~/shared/routes";
import { PrivateRoute } from "./PrivateRoute";

const Login = lazy(() => import("./login"));
const ForgotPassword = lazy(() => import("./forgot-password"));
const HomePage = lazy(() => import("./home"));
const NewOrder = lazy(() => import("./new-order"));
const Cabinet = lazy(() => import("./cabinet"));
const CargoPlan = lazy(() => import("./cargo-plan"));

export const Routing = () => {
  const private_routes: Array<[string, ComponentType]> = [
    [routes.HOME_ROUTE, HomePage],
    [routes.NEW_ORDER_ROUTE, NewOrder],
    [routes.PROFILE_ROUTE, Cabinet],
    [routes.CARGO_PLAN_ROUTE, CargoPlan],
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
