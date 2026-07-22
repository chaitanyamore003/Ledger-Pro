import { Link, Outlet } from "react-router-dom";
import {
  ArrowLeft,
  CheckCircle2,
  Database,
  LockKeyhole,
  ShieldCheck,
} from "lucide-react";
import ThemeToggle from "../components/ui/ThemeToggle";

const assuranceItems = [
  {
    icon: ShieldCheck,
    title: "Secure access",
    description: "Protected sessions with JWT and refresh token support.",
  },
  {
    icon: LockKeyhole,
    title: "Verified identity",
    description: "Email verification keeps account access intentional.",
  },
  {
    icon: Database,
    title: "Ledger-ready",
    description: "Designed for reliable banking and transaction workflows.",
  },
];

function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-slate-950 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.18),transparent_55%)]" />

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-6 pt-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img
            src="/ledger-flow-logo.png"
            alt="LedgerFlow"
            className="h-11 w-auto"
          />

          <div>
            <h1 className="text-lg font-semibold tracking-tight text-slate-900 dark:text-white">
              LedgerFlow
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enterprise Banking Platform
            </p>
          </div>
        </Link>

        <ThemeToggle />
      </header>

      <main className="relative z-10 mx-auto grid min-h-[calc(100vh-92px)] max-w-7xl items-center gap-12 px-6 py-12 lg:grid-cols-[1fr_440px] lg:px-8">
        <section className="hidden max-w-2xl lg:block">
          <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/10 dark:text-indigo-200">
            <CheckCircle2 size={16} />
            Secure Ledger Access
          </span>

          <h2 className="mt-8 text-5xl font-bold tracking-tight text-slate-900 lg:text-6xl dark:text-white">
            Banking access,
            <span className="block text-indigo-700 dark:text-indigo-300">
              kept simple.
            </span>
          </h2>

          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-500 dark:text-slate-300">
            Sign in or create an account to manage customer records, banking
            ledgers, and financial operations in a focused enterprise workspace.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {assuranceItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-white/75 p-5 shadow-sm backdrop-blur-xl transition-colors dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                    <Icon size={21} />
                  </div>

                  <h3 className="mt-4 text-sm font-semibold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="w-full justify-self-center lg:justify-self-end">
          <div className="rounded-3xl border border-slate-200 bg-white/90 p-8 shadow-xl shadow-slate-900/5 backdrop-blur-xl transition-colors dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-black/30">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition hover:text-indigo-700 dark:text-slate-300 dark:hover:text-indigo-200"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>

            <Outlet />
          </div>
        </section>
      </main>
    </div>
  );
}

export default AuthLayout;
