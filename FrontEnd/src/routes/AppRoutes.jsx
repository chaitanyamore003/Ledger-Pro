import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/DashBoard";
import Register from "../pages/Auth/Register";
import Page404 from "../pages/404";

import AuthLayout from "../layouts/AuthLayout";
import ProtectedRoute from "./protectedRoutes";
import VerifyEmail from "../pages/Auth/VerfiyEmail";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route element={<AuthLayout />}>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verify-email" element={<VerifyEmail />} />
        </Route>

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 Page */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
