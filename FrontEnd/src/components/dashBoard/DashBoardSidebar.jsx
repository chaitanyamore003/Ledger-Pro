import useSidebar from "../../hooks/useSideBar";
import useAuth from "../../hooks/useAuth";
import { logoutUser } from "../../services/authApi";

import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Landmark,
  ReceiptText,
  PlusCircle,
  User,
  Settings,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";

const navItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Accounts",
    path: "/dashboard/accounts",
    icon: Landmark,
  },
  {
    title: "Transactions",
    path: "/dashboard/transactions",
    icon: ReceiptText,
  },
  {
    title: "Add Entry",
    path: "/dashboard/add-entry",
    icon: PlusCircle,
  },
];

const bottomItems = [
  {
    title: "Profile",
    path: "/dashboard/profile",
    icon: User,
  },
  {
    title: "Settings",
    path: "/dashboard/settings",
    icon: Settings,
  },
];

const getLinkClasses = (isActive, collapsed) =>
  [
    "group flex h-11 items-center gap-3 rounded-lg px-3 text-sm font-medium transition-colors duration-200",
    collapsed ? "lg:justify-center lg:gap-0 lg:px-0" : "lg:gap-3 lg:px-3",
    isActive
      ? "bg-[#FFBA7D] text-black shadow-sm"
      : "text-neutral-600 hover:bg-neutral-100 hover:text-neutral-950 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white",
  ].join(" ");

function SidebarItem({ title, path, icon: Icon, collapsed, onNavigate }) {
  return (
    <NavLink
      to={path}
      end={path === "/dashboard"}
      onClick={onNavigate}
      title={collapsed ? title : undefined}
      className={({ isActive }) => getLinkClasses(isActive, collapsed)}
    >
      <Icon size={20} className="shrink-0" />

      <span
        className={`min-w-0 overflow-hidden whitespace-nowrap transition-[width,opacity,transform] duration-200 ease-out ${
          collapsed
            ? "lg:w-0 lg:-translate-x-2 lg:opacity-0"
            : "lg:w-40 lg:translate-x-0 lg:opacity-100"
        }`}
      >
        {title}
      </span>
    </NavLink>
  );
}

function DashboardSidebar() {
  const [loggingOut, setLoggingOut] = useState(false);
  const { collapsed, mobileOpen, toggleSidebar, closeMobileSidebar } =
    useSidebar();
  const { logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    closeMobileSidebar();
  }, [closeMobileSidebar, location.pathname]);

  const handleLogout = async () => {
    if (loggingOut) return;

    try {
      setLoggingOut(true);
      await logoutUser();
      logout();
      closeMobileSidebar();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={closeMobileSidebar}
        className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col overflow-hidden border-r border-black/10 bg-white px-4 py-5 shadow-2xl shadow-black/10 transition-[transform,width,padding] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] dark:border-white/10 dark:bg-black lg:translate-x-0 lg:shadow-none ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${collapsed ? "lg:w-20 lg:px-3" : "lg:w-72 lg:px-4"}`}
      >
        <div
          className={`mb-7 flex h-12 items-center gap-3 transition-[height] duration-300 ${
            collapsed
              ? "lg:h-auto lg:flex-col lg:justify-start"
              : "lg:justify-between"
          }`}
        >
          <Link
            to="/"
            onClick={closeMobileSidebar}
            className={`relative flex min-w-0 items-center ${
              collapsed ? "lg:h-10 lg:w-10 lg:flex-none" : "flex-1"
            }`}
            aria-label="Ledger Pro dashboard"
          >
            <img
              src="/ledger-pro-logo-no-background.png"
              alt="Ledger Pro"
              draggable={false}
              className={`h-28 w-auto object-contain transition-[width,opacity,transform] duration-300 dark:hidden ${
                collapsed
                  ? "lg:w-0 lg:scale-95 lg:opacity-0"
                  : "lg:w-40 lg:scale-100 lg:opacity-100"
              }`}
            />
            <img
              src="/ledger-pro-logo-no-background-white.png"
              alt="Ledger Pro"
              draggable={false}
              className={`hidden h-28 w-auto object-contain transition-[width,opacity,transform] duration-300 dark:block ${
                collapsed
                  ? "lg:w-0 lg:scale-95 lg:opacity-0"
                  : "lg:w-40 lg:scale-100 lg:opacity-100"
              }`}
            />
            <img
              src="/ledger-pro-symbol-no-background.png"
              alt=""
              draggable={false}
              aria-hidden="true"
              className={`absolute left-1/2 hidden h-10 w-10 -translate-x-1/2 object-contain transition-all duration-300 dark:hidden lg:block ${
                collapsed ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            />
            <img
              src="/ledger-pro-symbol-no-background-white.png"
              alt=""
              draggable={false}
              aria-hidden="true"
              className={`absolute left-1/2 hidden h-10 w-10 -translate-x-1/2 object-contain transition-all duration-300 dark:lg:block ${
                collapsed ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            />
          </Link>

          <button
            type="button"
            onClick={toggleSidebar}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black/10 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white lg:inline-flex"
          >
            {collapsed ? (
              <PanelLeftOpen size={19} />
            ) : (
              <PanelLeftClose size={19} />
            )}
          </button>

          <button
            type="button"
            onClick={closeMobileSidebar}
            aria-label="Close sidebar"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black/10 text-neutral-600 transition hover:bg-neutral-100 hover:text-neutral-950 dark:border-white/10 dark:text-neutral-300 dark:hover:bg-neutral-900 dark:hover:text-white lg:hidden"
          >
            <X size={19} />
          </button>
        </div>

        <nav className="flex flex-1 flex-col gap-1.5">
          {navItems.map((item) => (
            <SidebarItem
              key={item.title}
              {...item}
              collapsed={collapsed}
              onNavigate={closeMobileSidebar}
            />
          ))}
        </nav>

        <div className="border-t border-black/10 pt-4 dark:border-white/10">
          <div className="space-y-1.5">
            {bottomItems.map((item) => (
              <SidebarItem
                key={item.title}
                {...item}
                collapsed={collapsed}
                onNavigate={closeMobileSidebar}
              />
            ))}

            <button
              type="button"
              onClick={handleLogout}
              disabled={loggingOut}
              aria-label={loggingOut ? "Logging out" : "Logout"}
              className={`group flex h-11 w-full items-center gap-3 rounded-lg px-3 text-sm font-medium text-red-500 transition-colors duration-200 hover:bg-red-50 dark:hover:bg-red-500/10 ${
                collapsed ? "lg:justify-center lg:gap-0 lg:px-0" : "lg:gap-3"
              } disabled:cursor-not-allowed disabled:opacity-60`}
              title={
                collapsed ? (loggingOut ? "Logging out" : "Logout") : undefined
              }
            >
              <LogOut size={20} className="shrink-0" />

              <span
                className={`min-w-0 overflow-hidden whitespace-nowrap transition-[width,opacity,transform] duration-200 ease-out ${
                  collapsed
                    ? "lg:w-0 lg:-translate-x-2 lg:opacity-0"
                    : "lg:w-40 lg:translate-x-0 lg:opacity-100"
                }`}
              >
                {loggingOut ? "Logging out..." : "Logout"}
              </span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;
