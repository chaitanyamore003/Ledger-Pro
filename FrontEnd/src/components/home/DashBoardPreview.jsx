import { ArrowUpRight, ArrowDownLeft, Wallet } from "lucide-react";

const transactions = [
  {
    title: "Salary",
    amount: "+₹55,000",
    icon: ArrowUpRight,
    positive: true,
  },
  {
    title: "Grocery",
    amount: "-₹1,250",
    icon: ArrowDownLeft,
    positive: false,
  },
  {
    title: "Netflix",
    amount: "-₹499",
    icon: ArrowDownLeft,
    positive: false,
  },
];

function DashboardPreview() {
  return (
    <div className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2rem] border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-neutral-950">
      {/* Browser Bar */}
      <div className="flex items-center gap-2 border-b border-black/10 px-6 py-4 dark:border-white/10">
        <span className="h-3 w-3 rounded-full bg-red-400" />
        <span className="h-3 w-3 rounded-full bg-yellow-400" />
        <span className="h-3 w-3 rounded-full bg-green-400" />

        <div className="ml-auto text-sm font-medium text-neutral-500">
          LedgerPro Dashboard
        </div>
      </div>

      <div className="grid gap-8 p-8 lg:grid-cols-[1.3fr_0.7fr]">
        {/* Left */}
        <div>
          <div className="rounded-3xl bg-[#FFBA7D]/15 p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-500">Total Balance</p>

                <h2 className="mt-2 text-4xl font-bold text-black dark:text-white">
                  ₹1,24,560
                </h2>
              </div>

              <div className="rounded-2xl bg-[#FFBA7D] p-4">
                <Wallet className="text-black" />
              </div>
            </div>

            <p className="mt-4 font-medium text-green-600">+8.2% this month</p>
          </div>

          {/* Chart */}
          <div className="mt-8">
            <svg viewBox="0 0 500 140" className="w-full" fill="none">
              <path
                d="M0 110 C60 90 90 30 150 60 S250 130 320 70 S430 20 500 50"
                stroke="#FFBA7D"
                strokeWidth="5"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>

        {/* Right */}
        <div className="rounded-3xl border border-black/10 p-6 dark:border-white/10">
          <h3 className="mb-6 text-lg font-semibold text-black dark:text-white">
            Recent Transactions
          </h3>

          <div className="space-y-5">
            {transactions.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`rounded-xl p-2 ${
                        item.positive
                          ? "bg-green-100 text-green-600"
                          : "bg-red-100 text-red-500"
                      }`}
                    >
                      <Icon size={18} />
                    </div>

                    <span className="font-medium text-black dark:text-white">
                      {item.title}
                    </span>
                  </div>

                  <span
                    className={
                      item.positive
                        ? "font-semibold text-green-600"
                        : "font-semibold text-red-500"
                    }
                  >
                    {item.amount}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPreview;
