import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 py-8">
      <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl bg-white shadow-2xl md:grid-cols-[1.05fr_0.95fr]">
        {/* ================= LEFT PANEL ================= */}

        <div className="flex flex-col justify-between bg-white p-10 lg:p-12">
          <div>
            {/* Logo */}

            <img
              src="/ledger-flow-logo.png"
              alt="LedgerFlow"
              className="h-24 w-auto"
            />

            <div className="mt-8">
              <span className="rounded-full bg-indigo-100 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-indigo-700">
                Enterprise Banking Platform
              </span>

              <h1 className="mt-6 text-4xl font-bold leading-tight text-slate-900">
                Banking Made
                <br />
                Secure & Simple.
              </h1>

              <p className="mt-5 max-w-md leading-7 text-slate-600">
                LedgerFlow is a modern Bank Ledger Management System designed to
                securely manage users, accounts, ledgers and financial
                transactions with enterprise-grade backend architecture.
              </p>
            </div>

            {/* Feature Cards */}

            <div className="mt-10 space-y-4">
              <div className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:shadow-md">
                <h3 className="font-semibold text-slate-800">
                  🔐 Enterprise Authentication
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  JWT Authentication, Refresh Tokens and Secure Sessions.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:shadow-md">
                <h3 className="font-semibold text-slate-800">
                  📊 Ledger Management
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  Manage banking ledgers, accounts and financial records
                  securely.
                </p>
              </div>

              <div className="rounded-xl border border-slate-200 p-4 transition hover:border-indigo-300 hover:shadow-md">
                <h3 className="font-semibold text-slate-800">
                  🛡 Enterprise Security
                </h3>

                <p className="mt-2 text-sm text-slate-600">
                  HTTP-only Cookies, OAuth2 Email Verification and Role-based
                  Access Control.
                </p>
              </div>
            </div>
          </div>

          <p className="mt-10 text-sm text-slate-500">
            © {new Date().getFullYear()} LedgerFlow • Enterprise Bank Ledger
            Management System
          </p>
        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div className="flex items-center justify-center bg-gradient-to-br from-indigo-700 via-indigo-600 to-blue-700 p-8 lg:p-10">
          <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
