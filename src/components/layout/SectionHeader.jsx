export default function SectionHeader({
  eyebrow,
  title,
  action,
  className = '',
}) {
  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-4 border-l-4 border-brand py-1 pl-4 ${className}`}
    >
      <div>
        {eyebrow ? (
          <p className="mb-1 text-xs font-medium uppercase tracking-widest text-brand">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="font-display text-2xl text-ink">{title}</h2>
      </div>
      {action}
    </div>
  );
}
