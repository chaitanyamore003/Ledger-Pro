import { useEffect, useState } from "react";
import { Landmark, Wallet } from "lucide-react";
import { getAccounts } from "../../services/ledgerApi";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        setError("");
        const { data } = await getAccounts();
        setAccounts(data.data || data.accounts || []);
      } catch (requestError) {
        setError(
          requestError.response?.data?.message || "Unable to load accounts.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadAccounts();
  }, []);

  return (
    <div className="space-y-6">
      <section className="flex flex-col gap-4 rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase text-[#a95d1e] dark:text-[#FFBA7D]">
            Accounts
          </p>
          <h2 className="mt-1 text-2xl font-semibold text-neutral-950 dark:text-white">
            Ledger Accounts
          </h2>
          <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
            Your primary ledger account.
          </p>
        </div>

        <div className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-black/10 px-4 text-sm font-semibold text-neutral-800 dark:border-white/10 dark:text-white">
          <Landmark size={20} />
          One Account
        </div>
      </section>

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {loading &&
          Array.from({ length: 1 }).map((_, index) => (
            <article
              key={index}
              className="rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950"
            >
              <div className="mb-5 h-11 w-11 animate-pulse rounded-lg bg-neutral-200 dark:bg-neutral-800" />
              <div className="h-4 w-24 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="mt-3 h-6 w-36 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
              <div className="mt-5 h-5 w-32 animate-pulse rounded bg-neutral-200 dark:bg-neutral-800" />
            </article>
          ))}

        {!loading &&
          accounts.map((account) => (
            <article
              key={account._id}
              className="rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950"
            >
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFBA7D]/15">
                <Landmark size={22} className="text-[#FFBA7D]" />
              </div>

              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                {account.currency} | {account.status}
              </p>
              <h3 className="mt-1 text-lg font-semibold text-neutral-950 dark:text-white">
                {account.name || "Primary Account"}
              </h3>

              <p className="mt-3 break-all text-xs text-neutral-500">
                {account._id}
              </p>

              <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
                <Wallet size={18} />
                {formatCurrency(account.balance ?? 0)}
              </div>
            </article>
          ))}
      </section>
    </div>
  );
}

export default Accounts;
