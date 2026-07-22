function SectionTitle({ badge, title, description, center = true }) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {badge && (
        <span className="inline-flex rounded-full border border-indigo-200 bg-indigo-50 px-4 py-2 text-sm font-medium text-indigo-700">
          {badge}
        </span>
      )}

      <h2 className="mt-6 text-4xl font-bold tracking-tight text-slate-900">
        {title}
      </h2>

      {description && (
        <p className="mt-5 text-lg leading-8 text-slate-500">{description}</p>
      )}
    </div>
  );
}

export default SectionTitle;
