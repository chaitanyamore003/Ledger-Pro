import { Save } from "lucide-react";

function AddTransactions() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950">
        <p className="text-xs font-semibold uppercase text-[#a95d1e] dark:text-[#FFBA7D]">
          New Entry
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-neutral-950 dark:text-white">
          Add Transaction
        </h2>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Record a debit or credit against an account.
        </p>
      </section>

      <form className="grid gap-4 rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950 lg:grid-cols-2">
        <label className="space-y-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Transaction title
          </span>
          <input
            type="text"
            placeholder="Electricity bill"
            className="h-11 w-full rounded-lg border border-black/10 bg-neutral-50 px-3 text-sm outline-none transition focus:border-[#FFBA7D] dark:border-white/10 dark:bg-neutral-900"
          />
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Account
          </span>
          <select className="h-11 w-full rounded-lg border border-black/10 bg-neutral-50 px-3 text-sm outline-none transition focus:border-[#FFBA7D] dark:border-white/10 dark:bg-neutral-900">
            <option>Savings</option>
            <option>Business</option>
            <option>Cash</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Type
          </span>
          <select className="h-11 w-full rounded-lg border border-black/10 bg-neutral-50 px-3 text-sm outline-none transition focus:border-[#FFBA7D] dark:border-white/10 dark:bg-neutral-900">
            <option>Debit</option>
            <option>Credit</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Amount
          </span>
          <input
            type="number"
            placeholder="2400"
            className="h-11 w-full rounded-lg border border-black/10 bg-neutral-50 px-3 text-sm outline-none transition focus:border-[#FFBA7D] dark:border-white/10 dark:bg-neutral-900"
          />
        </label>

        <label className="space-y-2 lg:col-span-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Notes
          </span>
          <textarea
            rows="4"
            placeholder="Optional transaction notes"
            className="w-full resize-none rounded-lg border border-black/10 bg-neutral-50 px-3 py-3 text-sm outline-none transition focus:border-[#FFBA7D] dark:border-white/10 dark:bg-neutral-900"
          />
        </label>

        <div className="flex justify-end lg:col-span-2">
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#FFBA7D] px-5 text-sm font-semibold text-black transition hover:bg-[#f5a862]"
          >
            <Save size={18} />
            Save Entry
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransactions;
