import { lazy, Suspense } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

const TasksListPage = lazy(() => import("./tasks-list"));
const TaskDetailsPage = lazy(() => import("./task-details"));
const ForgotPassword = lazy(() => import("./forgot-password"));
const Login = lazy(() => import("./login"));

export const Routing = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<TasksListPage />} />
        <Route path="/:taskId" element={<TaskDetailsPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  );
};
