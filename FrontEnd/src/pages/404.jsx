import { ArrowLeft, TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/ui/ThemeToggle";

function Page404() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-neutral-50 px-6 dark:bg-black">
      {/* Background Glow */}
      <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#FFBA7D]/10 blur-3xl" />

      {/* Theme Toggle */}
      <div className="fixed right-6 top-6 z-50">
        <ThemeToggle />
      </div>

      {/* Card */}
      <div className="relative z-10 w-full max-w-2xl rounded-3xl border border-black/10 bg-white p-12 text-center shadow-xl dark:border-white/10 dark:bg-neutral-950">
        {/* Icon */}

        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-[#FFBA7D]/15">
          <TriangleAlert size={44} className="text-[#FFBA7D]" />
        </div>

        {/* 404 */}

        <h1 className="mt-8 text-8xl font-bold tracking-tight text-neutral-900 dark:text-white">
          4<span className="text-[#FFBA7D]">0</span>4
        </h1>

        {/* Title */}

        <h2 className="mt-6 text-4xl font-semibold tracking-tight text-neutral-900 dark:text-white">
          Page Not Found
        </h2>

        {/* Description */}

        <p className="mx-auto mt-6 max-w-lg text-lg leading-8 text-neutral-500 dark:text-neutral-400">
          The page you're looking for doesn't exist, has been moved, or the URL
          may be incorrect.
        </p>

        {/* Button */}

        <div className="mt-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 rounded-2xl bg-[#FFBA7D] px-7 py-4 font-medium text-black transition-all duration-300 hover:scale-[1.03]"
          >
            <ArrowLeft size={20} />
            Return Home
          </Link>
        </div>

        {/* Footer */}

        <p className="mt-10 text-sm tracking-wide text-neutral-400 dark:text-neutral-500">
          LEDGER PRO
        </p>
      </div>
    </div>
  );
}

export default Page404;
