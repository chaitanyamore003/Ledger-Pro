import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Login from "../pages/Auth/Login";
import Dashboard from "../pages/DashBoard";
import Register from "../pages/Auth/Register";
import Page404 from "../pages/404";
import AddTransactions from "../pages/DashBoard/AddTransactions";
import Accounts from "../pages/DashBoard/Accounts";
import Overview from "../pages/DashBoard/Overview";
import Profile from "../pages/DashBoard/Profile";
import Settings from "../pages/DashBoard/Settings";
import Transactions from "../pages/DashBoard/Transactions";

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
        >
          <Route index element={<Overview />} />
          <Route path="accounts" element={<Accounts />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="add-entry" element={<AddTransactions />} />
          <Route path="profile" element={<Profile />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<Page404 />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
