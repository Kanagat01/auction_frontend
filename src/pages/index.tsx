import { ComponentType, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import * as routes from "~/shared/routes";
import { PrivateRoute } from "./PrivateRoute";

const Login = lazy(() => import("./login"));
const ForgotPassword = lazy(() => import("./forgot-password"));
const OrdersPage = lazy(() => import("./orders"));
const NewOrder = lazy(() => import("./new-order"));
const Cabinet = lazy(() => import("./cabinet"));

export const Routing = () => {
  const order_pages = [
    routes.ORDERS_BEING_EXECUTED,
    routes.ORDERS_IN_AUCTION,
    routes.ORDERS_IN_BIDDING,
    routes.ORDERS_IN_DIRECT,
    routes.CANCELLED_ORDERS,
    routes.UNPUBLISHED_ORDERS,
  ].map((route): [string, ComponentType] => [route, OrdersPage]);

  const private_routes: Array<[string, ComponentType]> = [
    ...order_pages,
    [routes.NEW_ORDER_ROUTE, NewOrder],
    [routes.PROFILE_ROUTE, Cabinet],
    // [routes.CARGO_PLAN_ROUTE, CargoPlan],
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
      <Route
        path="*"
        element={<Navigate to={routes.UNPUBLISHED_ORDERS} replace />}
      />
    </Routes>
  );
};
