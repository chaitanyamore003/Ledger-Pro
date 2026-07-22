function FeatureCard({ icon: Icon, title, description }) {
  return (
    <div className="group rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-md dark:border-slate-800 dark:bg-slate-950/60 dark:hover:border-indigo-400/30 dark:hover:shadow-black/20">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300">
        <Icon size={24} strokeWidth={2} />
      </div>

      <h3 className="mt-6 text-xl font-semibold tracking-tight text-slate-900 dark:text-white">
        {title}
      </h3>

      <p className="mt-3 leading-7 text-slate-500 dark:text-slate-300">
        {description}
      </p>
    </div>
  );
}

export default FeatureCard;
