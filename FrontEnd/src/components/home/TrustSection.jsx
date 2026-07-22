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
    <section className="border-y border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-7xl px-6 py-10 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-8 lg:flex-row">
          <div>
            <p className="text-sm font-medium uppercase tracking-wider text-slate-500">
              Built with modern technologies
            </p>

            <h2 className="mt-2 text-2xl font-semibold text-slate-900">
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
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700">
                    <Icon size={22} />
                  </div>

                  <p className="mt-3 text-sm font-medium text-slate-700">
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
