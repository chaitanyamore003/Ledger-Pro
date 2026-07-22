import { Database, Lock, ShieldCheck, Zap } from "lucide-react";

import SectionTitle from "./SectionTitle";

const stats = [
  {
    icon: ShieldCheck,
    value: "JWT",
    label: "Secure Authentication",
  },
  {
    icon: Lock,
    value: "RBAC",
    label: "Role-Based Access",
  },
  {
    icon: Database,
    value: "MongoDB",
    label: "Scalable Database",
  },
  {
    icon: Zap,
    value: "REST API",
    label: "High Performance",
  },
];

function StatsSection() {
  return (
    <section
      id="stats"
      className="bg-white py-24 transition-colors dark:bg-slate-950"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionTitle
          badge="Technology"
          title="Built for Security, Performance and Scale"
          description="LedgerFlow is engineered using modern technologies and best practices to deliver a secure, reliable and scalable banking platform."
        />

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/70 dark:shadow-black/20 dark:hover:border-indigo-400/30"
              >
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                  <Icon size={28} />
                </div>

                <h3 className="mt-6 text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </h3>

                <p className="mt-2 text-slate-500 dark:text-slate-400">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default StatsSection;
