import {
  ShieldCheck,
  Lock,
  Fingerprint,
  Database,
  CheckCircle2,
} from "lucide-react";

const securityFeatures = [
  "JWT Access & Refresh Token Authentication",
  "HTTP-Only Secure Cookies",
  "Email OTP Verification",
  "Encrypted Password Storage",
  "Protected API Routes",
  "Role-Based Authorization",
];

function SecuritySection() {
  return (
    <section id="security" className="bg-white py-20 dark:bg-black">
      <div className="mx-auto grid max-w-7xl items-center gap-20 px-8 lg:grid-cols-2">
        {/* Left */}

        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-neutral-500">
            Security
          </p>

          <h2 className="mt-6 text-5xl font-bold leading-tight tracking-tight text-black md:text-6xl dark:text-white">
            Security built into every transaction.
          </h2>

          <p className="mt-8 max-w-xl text-lg leading-8 text-neutral-600 dark:text-neutral-400">
            LedgerPro is designed with a security-first architecture, combining
            modern authentication, encrypted communication, and protected APIs
            to keep financial operations safe and reliable.
          </p>

          <div className="mt-10">
            <button className="rounded-full bg-[#FFBA7D] px-8 py-4 font-semibold text-black transition hover:scale-[1.02]">
              Learn More
            </button>
          </div>
        </div>

        {/* Right */}

        <div className="rounded-[32px] border border-black/10 bg-[#FAFAFA] p-10 dark:border-white/10 dark:bg-neutral-950">
          {/* Top */}

          <div className="flex items-center justify-between">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFBA7D]/20">
              <ShieldCheck size={32} className="text-black dark:text-white" />
            </div>

            <span className="rounded-full bg-[#FFBA7D] px-4 py-2 text-sm font-semibold text-black">
              Protected
            </span>
          </div>

          <h3 className="mt-8 text-3xl font-bold text-black dark:text-white">
            Enterprise Security
          </h3>

          <p className="mt-4 leading-7 text-neutral-600 dark:text-neutral-400">
            Built using industry-standard authentication and secure backend
            practices to safeguard every user and every transaction.
          </p>

          {/* Features */}

          <div className="mt-10 space-y-5">
            {securityFeatures.map((item) => (
              <div
                key={item}
                className="flex items-center gap-4 rounded-2xl border border-black/5 bg-white p-4 dark:border-white/5 dark:bg-black"
              >
                <CheckCircle2 size={20} className="text-[#FFBA7D]" />

                <span className="text-sm font-medium text-black dark:text-white">
                  {item}
                </span>
              </div>
            ))}
          </div>

          {/* Bottom Stats */}

          <div className="mt-10 grid grid-cols-3 gap-4 border-t border-black/10 pt-8 dark:border-white/10">
            <div className="text-center">
              <Lock className="mx-auto text-[#FFBA7D]" size={22} />
              <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
                Secure
              </p>
            </div>

            <div className="text-center">
              <Fingerprint className="mx-auto text-[#FFBA7D]" size={22} />
              <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
                Verified
              </p>
            </div>

            <div className="text-center">
              <Database className="mx-auto text-[#FFBA7D]" size={22} />
              <p className="mt-2 text-xs uppercase tracking-wider text-neutral-500">
                Reliable
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SecuritySection;
