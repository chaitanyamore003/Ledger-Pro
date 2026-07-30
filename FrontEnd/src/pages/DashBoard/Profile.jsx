import { Mail, ShieldCheck, User } from "lucide-react";
import useAuth from "../../hooks/useAuth";

function Profile() {
  const { user } = useAuth();
  const displayName = user?.name || user?.fullName || "User";
  const email = user?.email || "No email on file";

  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950">
        <p className="text-xs font-semibold uppercase text-[#a95d1e] dark:text-[#FFBA7D]">
          Profile
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-neutral-950 dark:text-white">
          Account Profile
        </h2>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Your dashboard identity and access details.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[320px_minmax(0,1fr)]">
        <article className="rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#FFBA7D] text-xl font-semibold text-black">
            {displayName
              .split(" ")
              .filter(Boolean)
              .slice(0, 2)
              .map((part) => part[0]?.toUpperCase())
              .join("") || "LP"}
          </div>
          <h3 className="mt-4 text-lg font-semibold text-neutral-950 dark:text-white">
            {displayName}
          </h3>
          <p className="mt-1 text-sm text-neutral-500">{email}</p>
        </article>

        <article className="rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950">
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Role", value: "Premium User", icon: User },
              { label: "Email", value: "Verified", icon: Mail },
              { label: "Security", value: "Protected", icon: ShieldCheck },
            ].map(({ label, value, icon: Icon }) => (
              <div
                key={label}
                className="rounded-lg border border-black/10 p-4 dark:border-white/10"
              >
                <Icon size={20} className="text-[#FFBA7D]" />
                <p className="mt-4 text-sm text-neutral-500 dark:text-neutral-400">
                  {label}
                </p>
                <p className="mt-1 font-semibold text-neutral-950 dark:text-white">
                  {value}
                </p>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
}

export default Profile;
