import { lazy } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

const HomePage = lazy(() => import("./home"));
const Login = lazy(() => import("./login"));
const ForgotPassword = lazy(() => import("./forgot-password"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
