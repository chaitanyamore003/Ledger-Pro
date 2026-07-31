import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardPreview from "./DashBoardPreview";
import useAuth from "../../hooks/useAuth";

function DashBoardShowcase() {
  const { isAuthenticated } = useAuth();
  return (
    <section
      id="dashboard"
      className="relative overflow-hidden bg-[#FAFAFA] py-20 dark:bg-[#050505]"
    >
      {/* Accent Glow */}

      <div className="absolute left-1/2 top-40 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#FFBA7D]/20 blur-[140px]" />

      <div className="relative mx-auto max-w-7xl px-8">
        {/* Section Heading */}

        <div className="mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">
            Dashboard Experience
          </p>

          <h2 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-black md:text-6xl dark:text-white">
            Everything you need.
            <br />
            Nothing you don't.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            A clean banking workspace designed to help you manage accounts,
            transactions, analytics, and security from one intuitive dashboard.
          </p>
        </div>

        {/* Dashboard Preview */}

        <div className="mt-20">
          <div className="overflow-hidden rounded-[36px] border border-black/10 bg-white p-4 shadow-[0_40px_120px_rgba(0,0,0,0.12)] dark:border-white/10 dark:bg-neutral-950">
            <DashboardPreview />
          </div>
        </div>

        {/* Bottom Stats */}

        <div className="mt-16 grid gap-8 border-t border-black/10 pt-12 text-center md:grid-cols-3 dark:border-white/10">
          <div>
            <h3 className="text-4xl font-bold text-[#FFBA7D]">99.9%</h3>
            <p className="mt-2 text-sm uppercase tracking-wider text-neutral-500">
              Uptime
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#FFBA7D]">256-bit</h3>
            <p className="mt-2 text-sm uppercase tracking-wider text-neutral-500">
              Encryption
            </p>
          </div>

          <div>
            <h3 className="text-4xl font-bold text-[#FFBA7D]">24/7</h3>
            <p className="mt-2 text-sm uppercase tracking-wider text-neutral-500">
              Monitoring
            </p>
          </div>
        </div>

        {/* CTA */}

        <div className="mt-16 flex justify-center">
          <Link
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="group inline-flex items-center gap-2 rounded-full bg-[#FFBA7D] px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1"
          >
            Start Banking
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default DashBoardShowcase;
