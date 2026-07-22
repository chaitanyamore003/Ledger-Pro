import { Database, LockKeyhole, ShieldCheck, UserCog } from "lucide-react";

const trustItems = [
  {
    icon: ShieldCheck,
    title: "Enterprise Security",
  },
  {
    icon: LockKeyhole,
    title: "JWT Authentication",
  },
  {
    icon: UserCog,
    title: "Role-Based Access",
  },
  {
    icon: Database,
    title: "MongoDB Powered",
  },
];

function TrustSection() {
  return (
    <section className="border-y border-slate-200 bg-slate-50 transition-colors dark:border-slate-800 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Built with modern technologies
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">
              Secure. Scalable. Enterprise Ready.
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
            {trustItems.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
                    <Icon size={22} />
                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-700 dark:text-slate-300">
                    {item.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default TrustSection;
