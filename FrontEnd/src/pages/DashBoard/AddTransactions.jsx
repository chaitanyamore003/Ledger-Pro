import { useEffect, useState } from "react";
import { Save } from "lucide-react";
import {
  createTransaction,
  getAccounts,
  getDemoRecipients,
} from "../../services/ledgerApi";

const createIdempotencyKey = () => {
  return window.crypto?.randomUUID?.() || `transaction-${Date.now()}`;
};

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function AddTransactions() {
  const [accounts, setAccounts] = useState([]);
  const [demoRecipients, setDemoRecipients] = useState([]);
  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAccounts = async () => {
      try {
        setError("");
        const [accountResponse, demoRecipientResponse] = await Promise.all([
          getAccounts(),
          getDemoRecipients(),
        ]);
        const accountData =
          accountResponse.data.data || accountResponse.data.accounts || [];
        const demoRecipientData = demoRecipientResponse.data.data || [];

        setAccounts(accountData);
        setDemoRecipients(demoRecipientData);
        setFromAccount(accountData[0]?._id || "");
        setToAccount(demoRecipientData[0]?.accountId || "");
      } catch (requestError) {
        setError(
          requestError.response?.data?.message ||
            "Unable to load transaction accounts.",
        );
      } finally {
        setLoading(false);
      }
    };

    loadAccounts();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      setSubmitting(true);
      setMessage("");
      setError("");

      await createTransaction({
        fromAccount,
        toAccount,
        amount: Number(amount),
        idempotencyKey: createIdempotencyKey(),
      });

      setAmount("");
      const { data } = await getAccounts();
      setAccounts(data.data || data.accounts || []);
      setMessage("Transaction completed successfully.");
    } catch (requestError) {
      console.log(requestError);
      console.log(requestError.response);
      console.log(requestError.response?.data);

      setError(
        requestError.response?.data?.message || "Unable to create transaction.",
      );
    } finally {
      setSubmitting(false);
    }
  };

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
          Transfer funds to another ledger account.
        </p>
      </section>

      {error && (
        <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-700 dark:text-red-300">
          {error}
        </div>
      )}

      {message && (
        <div className="rounded-lg border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm font-medium text-green-700 dark:text-green-300">
          {message}
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="grid gap-4 rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950 lg:grid-cols-2"
      >
        <label className="space-y-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
            From account
          </span>
          <select
            value={fromAccount}
            disabled={loading}
            onChange={(event) => setFromAccount(event.target.value)}
            className="h-11 w-full rounded-lg border border-black/10 bg-neutral-50 px-3 text-sm outline-none transition focus:border-[#FFBA7D] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-neutral-900"
          >
            {accounts.map((account) => (
              <option key={account._id} value={account._id}>
                {account.name || "Primary Account"} -{" "}
                {formatCurrency(account.balance ?? 0)}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Demo recipient
          </span>
          <select
            value={toAccount}
            disabled={loading}
            onChange={(event) => setToAccount(event.target.value)}
            className="h-11 w-full rounded-lg border border-black/10 bg-neutral-50 px-3 text-sm outline-none transition focus:border-[#FFBA7D] disabled:cursor-not-allowed disabled:opacity-60 dark:border-white/10 dark:bg-neutral-900"
          >
            {demoRecipients.map((recipient) => (
              <option key={recipient.accountId} value={recipient.accountId}>
                {recipient.label} - {recipient.accountId}
              </option>
            ))}
          </select>
        </label>

        <label className="space-y-2 lg:col-span-2">
          <span className="text-sm font-medium text-neutral-700 dark:text-neutral-200">
            Amount
          </span>
          <input
            min="1"
            type="number"
            value={amount}
            placeholder="2400"
            onChange={(event) => setAmount(event.target.value)}
            className="h-11 w-full rounded-lg border border-black/10 bg-neutral-50 px-3 text-sm outline-none transition focus:border-[#FFBA7D] dark:border-white/10 dark:bg-neutral-900"
          />
        </label>

        <div className="flex justify-end lg:col-span-2">
          <button
            type="submit"
            disabled={
              submitting ||
              loading ||
              !fromAccount ||
              !toAccount ||
              demoRecipients.length === 0 ||
              Number(amount) <= 0
            }
            className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#FFBA7D] px-5 text-sm font-semibold text-black transition hover:bg-[#f5a862] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Save size={18} />
            {submitting ? "Saving..." : "Save Entry"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTransactions;
