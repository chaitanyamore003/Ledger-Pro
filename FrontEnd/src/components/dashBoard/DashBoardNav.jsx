import { Link } from "react-router-dom";
import { Bell, Search, Settings, ChevronDown, Menu } from "lucide-react";

import ThemeToggle from "../ui/ThemeToggle";
import useSidebar from "../../hooks/useSideBar";
import useAuth from "../../hooks/useAuth";

const getInitials = (name = "") =>
  name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("") || "LP";

function DashBoardNav() {
  const { toggleMobileSidebar } = useSidebar();
  const { user } = useAuth();
  const displayName = user?.name || user?.fullName || "User";
  const initials = getInitials(displayName);

  return (
    <header className="sticky top-0 z-30 border-b border-black/10 bg-white/85 backdrop-blur-xl dark:border-white/10 dark:bg-black/85">
      <div className="flex min-h-16 items-center gap-3 px-4 sm:px-6 lg:px-8">
        <button
          type="button"
          onClick={toggleMobileSidebar}
          aria-label="Open sidebar"
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-black/10 text-neutral-700 transition hover:bg-neutral-100 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-neutral-900 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="hidden min-w-0 flex-col sm:flex">
          <span className="text-xs font-medium uppercase text-neutral-500 dark:text-neutral-400">
            Ledger Pro
          </span>
          <h1 className="text-lg font-semibold text-neutral-950 dark:text-white">
            Dashboard
          </h1>
        </div>

        <div className="min-w-0 flex-1">
          <div className="hidden max-w-xl items-center gap-3 rounded-lg border border-black/10 bg-neutral-50 px-4 py-2.5 dark:border-white/10 dark:bg-neutral-900 md:flex">
            <Search size={18} className="shrink-0 text-neutral-500" />

            <input
              type="text"
              placeholder="Search transactions, accounts..."
              className="w-full min-w-0 bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            aria-label="Search"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 text-neutral-700 transition hover:bg-neutral-100 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-neutral-900 md:hidden"
          >
            <Search size={18} />
          </button>

          <button
            type="button"
            aria-label="Notifications"
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-black/10 text-neutral-700 transition hover:bg-neutral-100 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-neutral-900"
          >
            <Bell size={18} />
          </button>

          <ThemeToggle />

          <Link
            to="/dashboard/settings"
            aria-label="Settings"
            className="hidden h-10 w-10 items-center justify-center rounded-lg border border-black/10 text-neutral-700 transition hover:bg-neutral-100 dark:border-white/10 dark:text-neutral-200 dark:hover:bg-neutral-900 sm:inline-flex"
          >
            <Settings size={18} />
          </Link>

          <Link
            to="/dashboard/profile"
            className="ml-1 flex h-10 items-center gap-2 rounded-lg border border-black/10 px-2 transition hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-900"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFBA7D] text-sm font-semibold text-black">
              {initials}
            </div>

            <div className="hidden max-w-32 text-left xl:block">
              <p className="truncate text-sm font-semibold text-neutral-950 dark:text-white">
                {displayName}
              </p>

              <p className="text-xs text-neutral-500">Premium User</p>
            </div>

            <ChevronDown size={16} className="hidden text-neutral-500 xl:block" />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default DashBoardNav;
