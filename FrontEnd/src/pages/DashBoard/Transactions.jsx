import { useEffect, useMemo, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  Download,
  Filter,
  Search,
} from "lucide-react";
import { getTransactions } from "../../services/ledgerApi";

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
    year: "numeric",
  }).format(new Date(value));
};

function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        setError("");
        const { data } = await getTransactions();
        setTransactions(data.data || []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load transactions.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadTransactions();
  }, []);

  const filteredTransactions = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return transactions;
    }

    return transactions.filter((transaction) => {
      return [
        transaction.title,
        transaction.reference,
        transaction.account,
        transaction.amount?.toString(),
      ]
        .filter(Boolean)
        .some((value) => value.toLowerCase().includes(query));
    });
  }, [search, transactions]);

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
            Credits, debits, dates, and accounts.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="flex h-11 items-center gap-3 rounded-lg border border-black/10 bg-neutral-50 px-3 dark:border-white/10 dark:bg-neutral-900">
            <Search size={18} className="text-neutral-500" />
            <input
              type="text"
              value={search}
              placeholder="Search entries"
              onChange={(event) => setSearch(event.target.value)}
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

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

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
              {loading &&
                Array.from({ length: 3 }).map((_, index) => (
                  <tr key={index}>
                    <td className="px-5 py-4">
                      <div className="h-5 w-44 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-5 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="h-5 w-28 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                    </td>
                    <td className="px-5 py-4">
                      <div className="ml-auto h-5 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
                    </td>
                  </tr>
                ))}

              {!loading && filteredTransactions.length === 0 && (
                <tr>
                  <td
                    colSpan="4"
                    className="px-5 py-10 text-center text-sm text-neutral-500 dark:text-neutral-400"
                  >
                    No transactions yet.
                  </td>
                </tr>
              )}

              {!loading &&
                filteredTransactions.map((transaction) => (
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
                            {transaction.reference}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-neutral-600 dark:text-neutral-300">
                      {transaction.account}
                    </td>
                    <td className="px-5 py-4 text-neutral-600 dark:text-neutral-300">
                      {formatDate(transaction.date)}
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
