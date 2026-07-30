import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Filter,
  Search,
} from "lucide-react";

const transactions = [
  {
    id: "TRX-1024",
    title: "Salary",
    account: "Savings",
    date: "30 Jul 2026",
    type: "credit",
    amount: 50000,
  },
  {
    id: "TRX-1023",
    title: "Electricity Bill",
    account: "Savings",
    date: "29 Jul 2026",
    type: "debit",
    amount: 2400,
  },
  {
    id: "TRX-1022",
    title: "Freelance Payment",
    account: "Business",
    date: "28 Jul 2026",
    type: "credit",
    amount: 12000,
  },
  {
    id: "TRX-1021",
    title: "Amazon",
    account: "Savings",
    date: "27 Jul 2026",
    type: "debit",
    amount: 3299,
  },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function Transactions() {
  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-[#a95d1e] dark:text-[#FFBA7D]">
            Transactions
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-neutral-950 dark:text-white">
            Transaction History
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Scan credits, debits, dates, and accounts quickly.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex h-11 items-center gap-3 rounded-lg border border-black/10 bg-neutral-50 px-3 dark:border-white/10 dark:bg-neutral-900">
            <Search size={18} className="text-neutral-500" />
            <input
              type="text"
              placeholder="Search entries"
              className="min-w-0 bg-transparent text-sm outline-none placeholder:text-neutral-400"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-black/10 px-4 text-sm font-semibold transition hover:bg-neutral-100 dark:border-white/10 dark:hover:bg-neutral-900"
          >
            <Filter size={18} />
            Filter
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#FFBA7D] px-4 text-sm font-semibold text-black transition hover:bg-[#f5a862]"
          >
            <Download size={18} />
            Export
          </button>
        </div>
      </section>

      <section className="overflow-hidden rounded-lg border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-950">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-black/10 text-left text-sm dark:divide-white/10">
            <thead className="bg-neutral-50 text-xs uppercase text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400">
              <tr>
                <th className="px-5 py-3 font-semibold">Entry</th>
                <th className="px-5 py-3 font-semibold">Account</th>
                <th className="px-5 py-3 font-semibold">Date</th>
                <th className="px-5 py-3 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black/5 dark:divide-white/5">
              {transactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
                >
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span
                        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                          transaction.type === "credit"
                            ? "bg-green-500/10 text-green-600"
                            : "bg-red-500/10 text-red-500"
                        }`}
                      >
                        {transaction.type === "credit" ? (
                          <ArrowDownLeft size={18} />
                        ) : (
                          <ArrowUpRight size={18} />
                        )}
                      </span>
                      <div>
                        <p className="font-medium text-neutral-950 dark:text-white">
                          {transaction.title}
                        </p>
                        <p className="text-xs text-neutral-500">
                          {transaction.id}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-neutral-600 dark:text-neutral-300">
                    {transaction.account}
                  </td>
                  <td className="px-5 py-4 text-neutral-600 dark:text-neutral-300">
                    {transaction.date}
                  </td>
                  <td
                    className={`px-5 py-4 text-right font-semibold ${
                      transaction.type === "credit"
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}
                    {formatCurrency(transaction.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

export default Transactions;
