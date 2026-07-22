import { Link } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

function NavBar() {
  const navLinkClass =
    "text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white";

  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-6">
      <div
        className="flex h-18 w-full max-w-7xl items-center justify-between rounded-2xl border border-white/50
      bg-white/75
      px-7 shadow-lg shadow-slate-900/5 backdrop-blur-3xl transition-colors dark:border-slate-800/80 dark:bg-slate-950/75 dark:shadow-black/25"
      >
        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">
          <img
            src="/ledger-flow-logo.png"
            alt="LedgerFlow"
            className="h-11 w-auto"
          />

          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              LedgerFlow
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enterprise Banking Platform
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            className={navLinkClass}
          >
            Home
          </a>

          <a
            href="#features"
            className={navLinkClass}
          >
            Features
          </a>

          <a
            href="#stats"
            className={navLinkClass}
          >
            Technology
          </a>

          <a
            href="#footer"
            className={navLinkClass}
          >
            Contact
          </a>
        </nav>

        {/* Buttons */}

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/login"
            className="rounded-xl border border-slate-300 bg-white/70 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-white dark:border-slate-700 dark:bg-slate-900/70 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="rounded-xl bg-indigo-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-400"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
