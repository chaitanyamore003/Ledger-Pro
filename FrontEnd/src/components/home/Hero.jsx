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
    <section id="home" className="relative overflow-hidden bg-white">
      {/* Background Pattern */}

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(99,102,241,0.08),transparent_55%)]" />

      <div className="relative mx-auto max-w-7xl px-6 pt-36 pb-24 lg:px-8">
        <div className="grid items-center gap-20 lg:grid-cols-2">
          {/* Left */}

          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
              <CheckCircle2 size={16} />
              Enterprise Banking Platform
            </span>

            <h1 className="mt-8 text-5xl font-bold tracking-tight text-slate-900 lg:text-6xl xl:text-7xl">
              Banking Infrastructure
              <span className="block text-indigo-700">
                Built for the Future
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-slate-500">
              LedgerFlow is a modern banking ledger platform that combines
              enterprise-grade security, scalable architecture and intuitive
              financial management into one unified workspace.
            </p>

            {/* Buttons */}

            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 rounded-xl bg-indigo-700 px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-indigo-800"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>

              <Link
                to="/login"
                className="rounded-xl border border-slate-300 px-7 py-3.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
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
                    className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                      <Icon size={22} />
                    </div>

                    <p className="mt-4 text-sm font-semibold text-slate-900">
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
