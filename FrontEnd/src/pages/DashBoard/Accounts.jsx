import { Landmark, PlusCircle, Wallet } from "lucide-react";

const accounts = [
  { name: "Savings", type: "Primary", balance: 74500 },
  { name: "Business", type: "Current", balance: 38000 },
  { name: "Cash", type: "Wallet", balance: 12000 },
  { name: "Emergency Fund", type: "Reserve", balance: 52500 },
];

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function Accounts() {
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
            Review balances and account categories in one place.
          </p>
        </div>

        <button
          type="button"
          className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#FFBA7D] px-4 text-sm font-semibold text-black transition hover:bg-[#f5a862]"
        >
          <PlusCircle size={20} />
          New Account
        </button>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {accounts.map((account) => (
          <article
            key={account.name}
            className="rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950"
          >
            <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFBA7D]/15">
              <Landmark size={22} className="text-[#FFBA7D]" />
            </div>

            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {account.type}
            </p>
            <h3 className="mt-1 text-lg font-semibold text-neutral-950 dark:text-white">
              {account.name}
            </h3>

            <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-neutral-800 dark:text-neutral-200">
              <Wallet size={18} />
              {formatCurrency(account.balance)}
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}

export default Accounts;
