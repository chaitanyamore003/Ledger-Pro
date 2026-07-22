import {
  ArrowRight,
  CheckCircle2,
  Database,
  Lock,
  ShieldCheck,
} from "lucide-react";
import { Link } from "react-router-dom";
import HeroPreview from "./HeroPreview";

const highlights = [
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
  },
  {
    icon: Lock,
    title: "JWT Authentication",
  },
  {
    icon: Database,
    title: "MongoDB Powered",
  },
];

function Hero() {
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white transition-colors dark:bg-slate-950"
    >
      {/* Background Pattern */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_55%)] dark:bg-[radial-gradient(circle_at_top,rgba(129,140,248,0.18),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-36 pb-24 lg:px-8">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left */}

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700 dark:border-indigo-400/30 dark:bg-indigo-500/10 dark:text-indigo-200">
              <CheckCircle2 size={16} />
              Enterprise Banking Platform
            </span>

            <h1 className="mt-8 text-5xl font-bold tracking-tight text-slate-900 lg:text-6xl xl:text-7xl dark:text-white">
              Banking Infrastructure
              <span className="block text-indigo-700 dark:text-indigo-300">
                Built for the Future
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-500 dark:text-slate-300">
              LedgerFlow is a modern banking ledger platform that combines
              enterprise-grade security, scalable architecture and intuitive
              financial management into one unified workspace.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-800 dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-slate-300 px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-900"
              >
                Login
              </Link>
            </div>

            {/* Highlights */}

            <div className="mt-14 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20 dark:hover:border-indigo-400/30"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                      <Icon size={22} />
                    </div>

                    <p className="mt-4 text-sm font-semibold text-slate-900 dark:text-slate-100">
                      {item.title}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right */}

          <HeroPreview />
        </div>
      </div>
    </section>
  );
}

export default Hero;
