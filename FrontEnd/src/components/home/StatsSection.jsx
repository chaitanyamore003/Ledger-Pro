import {
  Atom,
  Server,
  Database,
  ShieldCheck,
  Code2,
  Cloud,
  GitBranch,
  Layers3,
} from "lucide-react";

const technologies = [
  {
    icon: Atom,
    name: "React 19",
    category: "Frontend",
  },
  {
    icon: Server,
    name: "Node.js",
    category: "Runtime",
  },
  {
    icon: Layers3,
    name: "Express.js",
    category: "Backend",
  },
  {
    icon: Database,
    name: "MongoDB",
    category: "Database",
  },
  {
    icon: ShieldCheck,
    name: "JWT",
    category: "Authentication",
  },
  {
    icon: Cloud,
    name: "REST API",
    category: "API",
  },
  {
    icon: GitBranch,
    name: "Git & GitHub",
    category: "Version Control",
  },
  {
    icon: Code2,
    name: "Tailwind CSS",
    category: "Styling",
  },
];

function StatsSection() {
  return (
    <section id="technology" className="bg-[#FAFAFA] py-20 dark:bg-[#050505]">
      <div className="mx-auto max-w-7xl px-8">
        {/* Header */}

        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">
            TECHNOLOGY STACK
          </p>

          <h2 className="mt-6 text-5xl font-bold tracking-tight text-black md:text-6xl dark:text-white">
            Powered by modern technologies.
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            LedgerPro is built using a modern full-stack architecture that
            prioritizes performance, scalability, maintainability, and security.
          </p>
        </div>

        {/* Technology Grid */}

        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {technologies.map((tech) => {
            const Icon = tech.icon;

            return (
              <div
                key={tech.name}
                className="group rounded-[28px] border border-black/10 bg-white p-8 transition-all duration-300 hover:-translate-y-2 hover:border-[#FFBA7D] dark:border-white/10 dark:bg-neutral-950"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#FFBA7D]/15">
                  <Icon size={28} className="text-black dark:text-white" />
                </div>

                <h3 className="mt-8 text-2xl font-bold text-black dark:text-white">
                  {tech.name}
                </h3>

                <p className="mt-3 text-sm uppercase tracking-wider text-[#FFBA7D]">
                  {tech.category}
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
