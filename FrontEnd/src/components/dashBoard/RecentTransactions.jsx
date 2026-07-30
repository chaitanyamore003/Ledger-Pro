import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";

const transactions = [
  {
    id: 1,
    title: "Salary",
    account: "Savings",
    amount: 50000,
    type: "credit",
    date: "Today",
  },
  {
    id: 2,
    title: "Electricity Bill",
    account: "Savings",
    amount: 2400,
    type: "debit",
    date: "Yesterday",
  },
  {
    id: 3,
    title: "Freelance Payment",
    account: "Business",
    amount: 12000,
    type: "credit",
    date: "28 Jul",
  },
  {
    id: 4,
    title: "Amazon",
    account: "Savings",
    amount: 3299,
    type: "debit",
    date: "27 Jul",
  },
  {
    id: 5,
    title: "Internet Bill",
    account: "Savings",
    amount: 899,
    type: "debit",
    date: "26 Jul",
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function RecentTransactions() {
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
        {transactions.map((transaction) => (
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
                  {transaction.account} | {transaction.date}
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
