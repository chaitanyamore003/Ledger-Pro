import { useState } from "react";
import { ArrowRight, PlusCircle, Wallet } from "lucide-react";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

function WelcomeCard({
  dashboard,
  initializing = false,
  loading = false,
  onInitializeFunds,
}) {
  const { user } = useAuth();
  const [amount, setAmount] = useState("10000");
  const canInitializeFunds = !loading && dashboard?.canInitializeFunds;

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!onInitializeFunds || Number(amount) <= 0) {
      return;
    }

    onInitializeFunds(amount);
  };

  return (
    <section className="overflow-hidden rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950 sm:p-6">
      <div className="flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div className="max-w-2xl">
          <p className="mb-2 text-xs font-semibold uppercase text-[#a95d1e] dark:text-[#FFBA7D]">
            Ledger Dashboard
          </p>

          <h1 className="text-2xl font-semibold leading-tight text-neutral-950 dark:text-white sm:text-3xl">
            Welcome back,{" "}
            <span className="text-[#FFBA7D]">
              {user?.name || user?.fullName || "User"}
            </span>
            .
          </h1>

          <p className="mt-3 max-w-2xl text-sm leading-6 text-neutral-500 dark:text-neutral-400">
            Keep your accounts organized, track every transaction, and maintain
            a clear financial record from one place.
          </p>
        </div>

        {canInitializeFunds ? (
          <form
            onSubmit={handleSubmit}
            className="grid w-full max-w-sm gap-3 sm:grid-cols-[minmax(0,1fr)_auto] lg:max-w-md"
          >
            <label className="space-y-2 sm:col-span-2">
              <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
                Initial funds
              </span>
              <input
                min="1"
                type="number"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                className="h-11 w-full rounded-lg border border-black/10 bg-neutral-50 px-3 text-sm outline-none transition focus:border-[#FFBA7D] dark:border-white/10 dark:bg-neutral-900"
              />
            </label>

            <button
              type="submit"
              disabled={initializing || Number(amount) <= 0}
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#FFBA7D] px-4 text-sm font-semibold text-black transition hover:bg-[#f5a862] disabled:cursor-not-allowed disabled:opacity-60 sm:col-span-2"
            >
              <Wallet size={20} />
              {initializing ? "Initializing..." : "Initialize Funds"}
            </button>
          </form>
        ) : (
          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
            <Link
              to="/dashboard/add-entry"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#FFBA7D] px-4 text-sm font-semibold text-black transition hover:bg-[#f5a862]"
            >
              <PlusCircle size={20} />
              Add Transaction
            </Link>

            <Link
              to="/dashboard/transactions"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-black/10 px-4 text-sm font-semibold text-neutral-800 transition hover:border-[#FFBA7D] hover:bg-[#FFBA7D]/10 dark:border-white/10 dark:text-white"
            >
              View Transactions
              <ArrowRight size={18} />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}

export default WelcomeCard;
