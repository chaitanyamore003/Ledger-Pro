import { ShieldCheck, WalletCards, BarChart3 } from "lucide-react";

const features = [
  {
    number: "01",
    icon: ShieldCheck,
    title: "Enterprise Authentication",
    description:
      "Secure authentication powered by JWT, refresh token rotation, OTP verification, protected routes and enterprise session management.",
  },
  {
    number: "02",
    icon: WalletCards,
    title: "Smart Ledger Management",
    description:
      "Manage accounts, balances, transfers and transactions with a banking experience designed for speed and reliability.",
  },
  {
    number: "03",
    icon: BarChart3,
    title: "Analytics & Insights",
    description:
      "Monitor financial activity through clean dashboards, intelligent reporting and real-time operational visibility.",
  },
];

function Features() {
  return (
    <section id="features" className="bg-white py-20 dark:bg-black">
      <div className="mx-auto max-w-7xl px-8">
        {/* Header */}

        <div className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">
            FEATURES
          </p>

          <h2 className="mt-6 text-6xl font-bold leading-tight tracking-tight text-black dark:text-white">
            Banking software
            <br />
            built for today.
          </h2>
        </div>

        {/* Cards */}

        <div className="mt-20 grid gap-8 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.number}
                className="group flex h-full flex-col rounded-[32px] border border-black/10 bg-white p-10 transition-all duration-500 hover:-translate-y-2 hover:border-[#FFBA7D] dark:border-white/10 dark:bg-neutral-950"
              >
                <div className="flex items-center justify-between">
                  <span className="text-5xl font-black text-[#FFBA7D]">
                    {feature.number}
                  </span>

                  <div className="rounded-2xl bg-[#FFBA7D]/20 p-4">
                    <Icon size={28} />
                  </div>
                </div>

                <h3 className="mt-12 text-3xl font-bold leading-tight text-black dark:text-white">
                  {feature.title}
                </h3>

                <p className="mt-6 leading-8 text-neutral-600 dark:text-neutral-400">
                  {feature.description}
                </p>

                <div className="mt-auto pt-12">
                  <button className="font-semibold text-black transition group-hover:text-[#FFBA7D] dark:text-white">
                    Learn More →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default Features;
