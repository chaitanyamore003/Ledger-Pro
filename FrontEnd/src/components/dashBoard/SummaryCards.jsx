import { CalendarDays, Landmark, ReceiptText, Wallet } from "lucide-react";

const summary = [
  {
    title: "Current Balance",
    value: 124500,
    type: "currency",
    icon: Wallet,
  },
  {
    title: "Total Accounts",
    value: "4",
    icon: Landmark,
  },
  {
    title: "Transactions",
    value: "328",
    icon: ReceiptText,
  },
  {
    title: "This Month",
    value: 18420,
    type: "currency",
    icon: CalendarDays,
  },
];

const formatValue = ({ value, type }) => {
  if (type !== "currency") return value;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
};

function SummaryCards() {
  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summary.map(({ title, icon: Icon, ...item }) => (
        <div
          key={title}
          className="group rounded-lg border border-black/10 bg-white p-5 shadow-sm transition-colors duration-200 hover:border-[#FFBA7D] dark:border-white/10 dark:bg-neutral-950"
        >
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-lg bg-[#FFBA7D]/15 transition-colors group-hover:bg-[#FFBA7D]">
            <Icon
              size={22}
              className="text-[#FFBA7D] transition-colors group-hover:text-black"
            />
          </div>

          <p className="text-sm text-neutral-500 dark:text-neutral-400">
            {title}
          </p>

          <h2 className="mt-2 text-2xl font-semibold text-neutral-950 dark:text-white">
            {formatValue(item)}
          </h2>
        </div>
      ))}
    </section>
  );
}

export default SummaryCards;
