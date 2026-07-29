import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function CTASection() {
  return (
    <section id="about" className="relative overflow-hidden bg-black py-36">
      {/* Accent Glow */}

      <div className="absolute left-1/2 top-1/2 h-[450px] w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFBA7D]/20 blur-[140px]" />

      <div className="relative mx-auto max-w-5xl px-8 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.35em] text-[#FFBA7D]">
          START YOUR JOURNEY
        </p>

        <h2 className="mt-8 text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl">
          Banking built
          <br />
          for the future.
        </h2>

        <p className="mx-auto mt-8 max-w-2xl text-lg leading-8 text-neutral-300">
          Experience a modern banking platform with secure authentication,
          intelligent ledger management, and an interface designed for speed,
          clarity, and confidence.
        </p>

        {/* Buttons */}

        <div className="mt-14 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Link
            to="/register"
            className="group inline-flex items-center gap-2 rounded-full bg-[#FFBA7D] px-8 py-4 text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-1 hover:scale-[1.02]"
          >
            Create Free Account
            <ArrowRight
              size={18}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

          <Link
            to="/login"
            className="rounded-full border border-white/20 px-8 py-4 text-sm font-semibold text-white transition hover:border-[#FFBA7D] hover:text-[#FFBA7D]"
          >
            Sign In
          </Link>
        </div>

        {/* Bottom Text */}

        <p className="mt-12 text-sm text-neutral-500">
          Secure authentication • Modern architecture • Built with React &
          Node.js
        </p>
      </div>
    </section>
  );
}

export default CTASection;
