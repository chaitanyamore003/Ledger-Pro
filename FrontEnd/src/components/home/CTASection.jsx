import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function CTASection() {
  return (
    <section className="border-t border-slate-200 bg-white py-24 transition-colors dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-slate-50 px-8 py-16 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20">
          <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-1.5 text-sm font-medium text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/10 dark:text-indigo-200">
            Enterprise Banking Platform
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
            Ready to modernize your banking workflow?
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-500 dark:text-slate-300">
            Experience secure authentication, streamlined ledger management, and
            enterprise-grade architecture built for modern financial
            applications.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/register"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Get Started
              <ArrowRight size={18} />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CTASection;
