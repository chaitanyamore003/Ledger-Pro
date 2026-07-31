import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (value) => {
  if (!value) return "";

  return new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
  }).format(new Date(value));
};

function RecentTransactions({ transactions = [], loading = false }) {
  return (
    <section className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-950">
      <div className="flex items-center justify-between gap-4 border-b border-black/10 p-5 dark:border-white/10">
        <div>
          <h2 className="text-xl font-semibold text-neutral-950 dark:text-white">
            Recent Transactions
          </h2>

          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
            Your latest ledger entries.
          </p>
        </div>

        <Link
          to="/dashboard/transactions"
          className="shrink-0 text-sm font-semibold text-[#a95d1e] transition hover:text-[#7c3f10] dark:text-[#FFBA7D] dark:hover:text-[#ffd4ad]"
        >
          View All
        </Link>
      </div>

      <div className="divide-y divide-black/5 dark:divide-white/5">
        {loading &&
          Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="flex items-center justify-between gap-4 px-5 py-4"
            >
              <div className="flex min-w-0 items-center gap-4">
                <span className="h-10 w-10 shrink-0 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
                <span className="h-5 w-40 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
              </div>
              <span className="h-5 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
            </div>
          ))}

        {!loading && transactions.length === 0 && (
          <div className="px-5 py-10 text-center">
            <p className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
              No transactions yet
            </p>
            <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
              Initialize funds to begin.
            </p>
          </div>
        )}

        {!loading &&
          transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between gap-4 px-5 py-4 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              <div className="flex min-w-0 items-center gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${
                    transaction.type === "credit"
                      ? "bg-green-500/10"
                      : "bg-red-500/10"
                  }`}
                >
                  {transaction.type === "credit" ? (
                    <ArrowDownLeft className="text-green-500" size={20} />
                  ) : (
                    <ArrowUpRight className="text-red-500" size={20} />
                  )}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate font-medium text-neutral-950 dark:text-white">
                    {transaction.title}
                  </h3>

                  <p className="truncate text-sm text-neutral-500">
                    {transaction.account} | {formatDate(transaction.date)}
                  </p>
                </div>
              </div>

              <span
                className={`shrink-0 text-sm font-semibold sm:text-base ${
                  transaction.type === "credit"
                    ? "text-green-600"
                    : "text-red-500"
                }`}
              >
                {transaction.type === "credit" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </span>
            </div>
          ))}
      </div>
    </section>
  );
}

export default RecentTransactions;
