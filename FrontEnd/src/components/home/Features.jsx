import {
  ArrowLeftRight,
  BarChart3,
  Landmark,
  ShieldCheck,
  Users,
  WalletCards,
} from "lucide-react";

import FeatureCard from "./FeatureCard";

const features = [
  {
    icon: ShieldCheck,
    title: "Enterprise Authentication",
    description:
      "Secure JWT authentication with refresh token rotation and protected APIs for reliable user access.",
  },
  {
    icon: WalletCards,
    title: "Ledger Management",
    description:
      "Create, organize and manage banking ledgers, accounts and financial records with complete accuracy.",
  },
  {
    icon: ArrowLeftRight,
    title: "Secure Transactions",
    description:
      "Record deposits, withdrawals and transfers while maintaining a complete transaction history.",
  },
  {
    icon: Users,
    title: "Role Based Access",
    description:
      "Assign permissions for administrators, managers and employees to ensure secure operations.",
  },
  {
    icon: BarChart3,
    title: "Analytics & Reports",
    description:
      "Visualize account activity and financial insights through modern dashboards and reports.",
  },
  {
    icon: Landmark,
    title: "Scalable Architecture",
    description:
      "Built using React, Node.js, Express and MongoDB with a clean, enterprise-ready architecture.",
  },
];

function Features() {
  return (
    <section id="features" className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Section Header */}

        <div className="mx-auto max-w-3xl text-center">
          <span className="rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
            Features
          </span>

          <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
            Everything You Need to Manage Banking Operations
          </h2>

          <p className="mt-5 text-lg leading-8 text-slate-500">
            LedgerFlow provides secure authentication, powerful ledger
            management, transaction tracking and enterprise-grade architecture
            for modern banking applications.
          </p>
        </div>

        {/* Features Grid */}

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Features;
