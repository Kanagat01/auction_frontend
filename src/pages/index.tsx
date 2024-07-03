import { ReactNode, lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import * as routes from "~/shared/routes";
import OrdersPage from "./orders";
import { PrivateRoute } from "./auth-routes";

const Login = lazy(() => import("./login"));
const ForgotPassword = lazy(() => import("./forgot-password"));
const OrderPage = lazy(() => import("./order-page"));
const Cabinet = lazy(() => import("./cabinet"));

export const Routing = () => {
  const order_pages = [
    routes.ORDERS_BEING_EXECUTED,
    routes.ORDERS_IN_AUCTION,
    routes.ORDERS_IN_BIDDING,
    routes.ORDERS_IN_DIRECT,
    routes.CANCELLED_ORDERS,
    routes.UNPUBLISHED_ORDERS,
  ].map((route): [string, ReactNode] => [
    route,
    <OrdersPage currentRoute={route} />,
  ]);

  const private_routes: Array<[string, ReactNode]> = [
    ...order_pages,
    [routes.NEW_ORDER_ROUTE, <OrderPage />],
    [routes.EDIT_ORDER_ROUTE, <OrderPage />],
    [routes.PROFILE_ROUTE, <Cabinet />],
    // [routes.CARGO_PLAN_ROUTE, CargoPlan],
  ];

  return (
    <Routes>
      <Route path={routes.LOGIN_ROUTE} element={<Login />} />
      <Route path={routes.FORGOT_PASSWORD_ROUTE} element={<ForgotPassword />} />
      <Route element={<PrivateRoute />}>
        {private_routes.map(([path, element]) => (
          <Route key={path} path={path} element={element} />
        ))}
      </Route>
      <Route
        path="*"
        element={<Navigate to={routes.ORDERS_BEING_EXECUTED} replace />}
      />
    </Routes>
  );
};
