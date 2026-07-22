import { Link } from "react-router-dom";
import ThemeToggle from "../ui/ThemeToggle";

function NavBar() {
  const navLinkClass =
    "text-sm font-medium text-slate-600 transition-colors duration-200 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white";

  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-6">
      <div
        className="relative flex h-18 w-full max-w-7xl items-center justify-between overflow-hidden rounded-2xl border border-white/45
      bg-white/25
      px-7 shadow-[0_8px_32px_rgba(15,23,42,0.12)] backdrop-blur-[28px] backdrop-saturate-[180%] transition-colors dark:border-white/10 dark:bg-slate-950/35 dark:shadow-[0_8px_32px_rgba(0,0,0,0.35)]"
      >
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/55 via-white/15 to-white/5 dark:from-white/12 dark:via-white/5 dark:to-transparent" />
        <div className="pointer-events-none absolute inset-x-4 top-0 h-px bg-white/80 dark:bg-white/25" />
        <div className="pointer-events-none absolute inset-x-10 bottom-0 h-px bg-slate-900/5 dark:bg-white/10" />

        {/* Logo */}

        <Link to="/" className="relative z-10 flex items-center gap-3">
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

        <nav className="relative z-10 hidden items-center gap-8 md:flex">
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

        <div className="relative z-10 flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/login"
            className="rounded-xl border border-white/45 bg-white/35 px-5 py-2 text-sm font-medium text-slate-700 shadow-sm backdrop-blur-xl transition hover:bg-white/55 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
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
