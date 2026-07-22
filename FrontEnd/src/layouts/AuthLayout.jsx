import { Outlet } from "react-router-dom";
import { ShieldCheck, Landmark, WalletCards } from "lucide-react";
import ThemeToggle from "../components/ui/ThemeToggle";

function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center bg-slate-100 px-6 py-10 transition-colors dark:bg-slate-950">
      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      <div className="grid w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl transition-colors dark:border-slate-800 dark:bg-slate-900 dark:shadow-black/30 md:grid-cols-[1.05fr_0.95fr]">
        {/* ================= LEFT PANEL ================= */}

        <div className="flex flex-col justify-between bg-white px-14 py-14 transition-colors dark:bg-slate-900">
          <div>
            {/* Logo */}

            <img
              src="/ledger-flow-logo.png"
              alt="LedgerFlow"
              className="h-20 w-auto"
            />

            {/* Badge */}

            <div className="mt-10">
              <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/10 dark:text-indigo-200">
                Enterprise Banking Platform
              </span>
            </div>

            {/* Heading */}

            <div className="mt-8">
              <h1 className="text-5xl font-bold leading-[1.1] tracking-tight text-slate-900 dark:text-white">
                Modern Banking,
                <br />
                Built Securely.
              </h1>

              <p className="mt-6 max-w-lg text-base leading-8 text-slate-500 dark:text-slate-300">
                LedgerFlow is an enterprise-grade Bank Ledger Management System
                that enables organizations to securely manage customers,
                accounts, ledgers and financial transactions through a reliable
                and scalable architecture.
              </p>
            </div>

            {/* Features */}

            <div className="mt-14 space-y-4">
              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <ShieldCheck size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Enterprise Authentication
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    JWT authentication, refresh tokens and secure session
                    management built for enterprise applications.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <WalletCards size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Ledger Management
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Manage banking ledgers, accounts and financial transactions
                    with accuracy and transparency.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 rounded-2xl border border-slate-200 p-5 transition-colors hover:bg-slate-50 dark:border-slate-800 dark:hover:bg-slate-800/60">
                <div className="rounded-xl bg-indigo-50 p-3 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <Landmark size={22} />
                </div>

                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Banking Infrastructure
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    Built with modern technologies following secure and scalable
                    enterprise architecture principles.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="mt-14 border-t border-slate-200 pt-6 dark:border-slate-800">
            <p className="text-sm text-slate-500 dark:text-slate-400">
              &copy; {new Date().getFullYear()}
              <span className="mx-2 text-slate-300 dark:text-slate-600">
                &bull;
              </span>
              <span className="font-medium text-slate-700 dark:text-slate-200">
                LedgerFlow
              </span>
              <span className="mx-2 text-slate-300 dark:text-slate-600">
                &bull;
              </span>
              Enterprise Bank Ledger Management System
            </p>
          </div>
        </div>

        {/* ================= RIGHT PANEL ================= */}

        <div className="flex items-center justify-center bg-gradient-to-br from-indigo-700 to-indigo-900 px-8 py-10 transition-colors dark:from-slate-950 dark:via-indigo-950 dark:to-slate-900 lg:px-10">
          <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-lg dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-black/30">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
