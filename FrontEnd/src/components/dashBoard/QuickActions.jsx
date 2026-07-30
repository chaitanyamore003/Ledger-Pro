import { Link } from "react-router-dom";
import { Landmark, PlusCircle, ReceiptText, Wallet } from "lucide-react";

const actions = [
  {
    title: "Add Transaction",
    description: "Record a credit or debit",
    icon: PlusCircle,
    to: "/dashboard/add-entry",
  },
  {
    title: "View Accounts",
    description: "Manage your ledger accounts",
    icon: Landmark,
    to: "/dashboard/accounts",
  },
  {
    title: "Transactions",
    description: "Browse transaction history",
    icon: ReceiptText,
    to: "/dashboard/transactions",
  },
  {
    title: "Check Balance",
    description: "View account balances",
    icon: Wallet,
    to: "/dashboard/accounts",
  },
];

function QuickActions() {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-xl font-semibold text-neutral-950 dark:text-white">
          Quick Actions
        </h2>

        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-400">
          Frequently used ledger operations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1">
        {actions.map(({ title, description, icon: Icon, to }) => (
          <Link
            key={title}
            to={to}
            className="group flex gap-4 rounded-lg border border-black/10 bg-white p-4 shadow-sm transition-colors duration-200 hover:border-[#FFBA7D] dark:border-white/10 dark:bg-neutral-950"
          >
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#FFBA7D]/15 transition-colors group-hover:bg-[#FFBA7D]">
              <Icon
                size={22}
                className="text-[#FFBA7D] transition-colors group-hover:text-black"
              />
            </div>

            <div className="min-w-0">
              <h3 className="text-sm font-semibold text-neutral-950 dark:text-white">
                {title}
              </h3>

              <p className="mt-1 text-sm leading-6 text-neutral-500 dark:text-neutral-400">
                {description}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default QuickActions;
