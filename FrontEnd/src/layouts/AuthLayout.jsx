import { Link, Outlet } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import ThemeToggle from "../components/ui/ThemeToggle";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

const features = [
  "JWT Authentication",
  "Email Verification",
  "Protected Banking Sessions",
];

function AuthLayout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-white text-black transition-colors duration-500 dark:bg-black dark:text-white">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[520px] w-[520px] rounded-full bg-[#FFBA7D]/15 blur-[140px]" />

        <div className="absolute bottom-0 right-0 h-[420px] w-[420px] rounded-full bg-[#FFBA7D]/10 blur-[120px]" />
      </div>

      {/* Header */}

      <header className="relative z-10 mx-auto flex max-w-7xl items-center justify-between px-8 py-8">
        <Link
          to="/"
          className="font-brand text-3xl tracking-tight text-black dark:text-white"
        >
          LEDGER<span className="text-[#FFBA7D]">PRO</span>
        </Link>

        <ThemeToggle />
      </header>

      {/* Content */}

      <main className="relative z-10 mx-auto flex min-h-[calc(100vh-100px)] max-w-7xl items-center px-8 pb-12">
        <div className="grid w-full items-center gap-20 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Section */}

          <motion.section
            className="hidden lg:block"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-semibold uppercase tracking-[0.3em] text-[#FFBA7D]">
              Secure Authentication
            </p>

            <h1 className="mt-8 font-brand text-7xl uppercase leading-[0.9] tracking-tight xl:text-[7rem]">
              Banking
              <br />
              starts
              <br />
              with
              <br />
              <span className="text-[#FFBA7D]">trust.</span>
            </h1>

            <p className="mt-10 max-w-lg text-lg leading-8 text-neutral-600 dark:text-neutral-400">
              Securely access your banking workspace to manage customers,
              transactions, ledgers and financial insights from one modern
              platform.
            </p>

            {/* Features */}

            <div className="mt-12 space-y-6">
              {features.map((feature, index) => (
                <motion.div
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    delay: 0.35 + index * 0.15,
                    duration: 0.5,
                  }}
                  className="flex items-center gap-4 text-lg"
                >
                  <div className="rounded-full bg-[#FFBA7D]/15 p-2">
                    <CheckCircle2 size={18} className="text-[#FFBA7D]" />
                  </div>

                  <span>{feature}</span>
                </motion.div>
              ))}
            </div>
          </motion.section>

          {/* Right */}

          <motion.section
            className="mx-auto w-full max-w-3xl"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              delay: 0.2,
            }}
          >
            <div className="relative w-full rounded-[40px] border border-black/10 bg-white px-16 py-14 shadow-[0_40px_120px_rgba(0,0,0,0.08)] transition-all duration-500 dark:border-white/10 dark:bg-neutral-950 dark:shadow-[0_40px_120px_rgba(0,0,0,0.55)]">
              {/* Glow */}
              <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-[#FFBA7D]/10 blur-3xl" />

              {/* Back Button */}
              <Link
                to="/"
                className="mb-10 inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-sm font-medium text-neutral-700 transition-all duration-300 hover:border-[#FFBA7D] hover:bg-[#FFBA7D]/10 hover:text-black dark:border-white/10 dark:bg-neutral-900 dark:text-neutral-300 dark:hover:border-[#FFBA7D] dark:hover:bg-[#FFBA7D]/10 dark:hover:text-white"
              >
                <ArrowLeft size={16} />
                Back to Home
              </Link>

              <Outlet />
            </div>
          </motion.section>
        </div>
      </main>
    </div>
  );
}

export default AuthLayout;
