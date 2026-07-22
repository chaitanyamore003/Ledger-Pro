import { Link, NavLink } from "react-router-dom";

function NavBar() {
  const navLinkClass = ({ isActive }) =>
    `transition-colors duration-200 text-sm font-medium ${
      isActive ? "text-indigo-700" : "text-slate-600 hover:text-slate-900"
    }`;

  return (
    <header className="fixed inset-x-0 top-5 z-50 flex justify-center px-6">
      <div
        className="flex h-18 w-full max-w-7xl items-center justify-between rounded-2xl border border-white/40
      bg-white/20
      backdrop-blur-3xl px-7 shadow-lg shadow-slate-900/5"
      >
        {/* Logo */}

        <Link to="/" className="flex items-center gap-3">
          <img
            src="/ledger-flow-logo.png"
            alt="LedgerFlow"
            className="h-11 w-auto"
          />

          <div className="hidden sm:block">
            <h1 className="text-lg font-semibold tracking-tight text-slate-900">
              LedgerFlow
            </h1>

            <p className="text-xs text-slate-500">
              Enterprise Banking Platform
            </p>
          </div>
        </Link>

        {/* Navigation */}

        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            onClick={navLinkClass}
          >
            Home
          </a>

          <a
            href="#features"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            onClick={navLinkClass}
          >
            Features
          </a>

          <a
            href="#stats"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            onClick={navLinkClass}
          >
            Technology
          </a>

          <a
            href="#footer"
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            onClick={navLinkClass}
          >
            Contact
          </a>
        </nav>

        {/* Buttons */}

        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="rounded-xl border border-slate-300 bg-white/70 px-5 py-2 text-sm font-medium text-slate-700 transition hover:bg-white"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="rounded-xl bg-indigo-700 px-5 py-2 text-sm font-medium text-white transition hover:bg-indigo-800"
          >
            Get Started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
