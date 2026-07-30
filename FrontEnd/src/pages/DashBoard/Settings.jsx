import { Bell, Lock, Palette, ShieldCheck } from "lucide-react";
import ThemeToggle from "../../components/ui/ThemeToggle";

const settings = [
  {
    title: "Transaction alerts",
    description: "Receive updates when new credits or debits are recorded.",
    icon: Bell,
  },
  {
    title: "Two-step verification",
    description: "Require a second verification step for sensitive actions.",
    icon: ShieldCheck,
  },
  {
    title: "Session lock",
    description: "Lock the dashboard after a period of inactivity.",
    icon: Lock,
  },
];

function Settings() {
  return (
    <div className="space-y-6">
      <section className="rounded-lg border border-black/10 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-neutral-950">
        <p className="text-xs font-semibold uppercase text-[#a95d1e] dark:text-[#FFBA7D]">
          Settings
        </p>
        <h2 className="mt-1 text-2xl font-semibold text-neutral-950 dark:text-white">
          Dashboard Settings
        </h2>
        <p className="mt-2 text-sm text-neutral-500 dark:text-neutral-400">
          Manage appearance, notifications, and security preferences.
        </p>
      </section>

      <section className="rounded-lg border border-black/10 bg-white shadow-sm dark:border-white/10 dark:bg-neutral-950">
        <div className="flex items-center justify-between gap-4 border-b border-black/10 p-5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <Palette size={20} className="text-[#FFBA7D]" />
            <div>
              <h3 className="font-semibold text-neutral-950 dark:text-white">
                Theme
              </h3>
              <p className="text-sm text-neutral-500 dark:text-neutral-400">
                Switch between light and dark dashboard modes.
              </p>
            </div>
          </div>
          <ThemeToggle />
        </div>

        <div className="divide-y divide-black/5 dark:divide-white/5">
          {settings.map(({ title, description, icon: Icon }) => (
            <label
              key={title}
              className="flex cursor-pointer items-center justify-between gap-4 p-5 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900"
            >
              <span className="flex min-w-0 items-center gap-3">
                <Icon size={20} className="shrink-0 text-[#FFBA7D]" />
                <span className="min-w-0">
                  <span className="block font-semibold text-neutral-950 dark:text-white">
                    {title}
                  </span>
                  <span className="mt-1 block text-sm text-neutral-500 dark:text-neutral-400">
                    {description}
                  </span>
                </span>
              </span>

              <input
                type="checkbox"
                defaultChecked
                className="h-5 w-5 shrink-0 accent-[#FFBA7D]"
              />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Settings;
