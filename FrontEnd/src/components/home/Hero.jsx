import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function Hero() {
  const { isAuthenticated } = useAuth();
  return (
    <section
      id="home"
      className="relative overflow-hidden bg-white pt-44 pb-5 dark:bg-black"
    >
      {/* Background Glow */}

      <div className="absolute left-1/2 top-0 h-[650px] w-[650px] -translate-x-1/2 rounded-full bg-[#FFBA7D]/20 blur-[180px]" />

      <div className="relative mx-auto flex max-w-7xl flex-col items-center px-8 text-center">
        {/* Small Label */}

        <span className="rounded-full border border-black/10 px-5 py-2 text-xs font-medium uppercase tracking-[0.35em] text-neutral-600 dark:border-white/10 dark:text-neutral-400">
          Enterprise Banking Platform
        </span>

        {/* Heading */}

        <h1 className="mt-10 max-w-6xl font-brand text-7xl uppercase leading-[0.9] tracking-tight text-black md:text-8xl xl:text-[8.5rem] dark:text-white">
          Banking
          <br />
          <span className="text-[#FFBA7D]">Without</span>
          <br />
          Limits.
        </h1>

        {/* Subtitle */}

        <p className="mt-8 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
          A modern banking operating system built for secure transactions,
          intelligent financial management, and enterprise-scale performance.
        </p>

        {/* CTA */}

        <div className="mt-12 flex flex-wrap items-center justify-center gap-5">
          <Link
            to={isAuthenticated ? "/dashboard" : "/register"}
            className="group inline-flex items-center gap-2 rounded-full bg-[#FFBA7D] px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1"
          >
            {isAuthenticated ? "Go to Dashboard" : "Get Started"}

            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            to={isAuthenticated ? "/dashboard" : "/login"}
            className="rounded-full border border-black px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:bg-black hover:text-white dark:border-white dark:text-white dark:hover:bg-white dark:hover:text-black"
          >
            Explore Platform
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
