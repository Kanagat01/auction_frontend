import { ReactNode } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import * as routes from "~/shared/routes";
import { PrivateRoute } from "./auth-routes";
import {
  UnpublishedOrders,
  CancelledOrders,
  OrdersInBidding,
  OrdersInAuction,
  OrdersBeingExecuted,
  OrdersInDirect,
} from "./orders";
import OrderPage from "./order-page";
import Cabinet from "./cabinet";
import {
  Login,
  ForgotPassword,
  Register,
  ResetPasswordConfirm,
} from "./auth-pages";

export const Routing = () => {
  const private_routes: Array<[string, ReactNode]> = [
    [routes.ORDERS_BEING_EXECUTED, <OrdersBeingExecuted />],
    [routes.ORDERS_IN_AUCTION, <OrdersInAuction />],
    [routes.ORDERS_IN_BIDDING, <OrdersInBidding />],
    [routes.ORDERS_IN_DIRECT, <OrdersInDirect />],
    [routes.CANCELLED_ORDERS, <CancelledOrders />],
    [routes.UNPUBLISHED_ORDERS, <UnpublishedOrders />],
    [routes.NEW_ORDER_ROUTE, <OrderPage />],
    [routes.EDIT_ORDER_ROUTE, <OrderPage />],
    [routes.PROFILE_ROUTE, <Cabinet />],
    // [routes.CARGO_PLAN_ROUTE, <CargoPlan />],
  ];

  return (
    <Routes>
      <Route path={routes.LOGIN_ROUTE} element={<Login />} />
      <Route path={routes.REGISTER_ROUTE} element={<Register />} />
      <Route path={routes.FORGOT_PASSWORD_ROUTE} element={<ForgotPassword />} />
      <Route
        path={routes.RESET_PASSWORD_CONFIRM_ROUTE}
        element={<ResetPasswordConfirm />}
      />
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
