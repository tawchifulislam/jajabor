export default function SectionHeader({ title, action, className = '' }) {
  return (
    <div
      className={`flex flex-wrap items-end justify-between gap-4 border-l-4 border-brand py-1 pl-4 ${className}`}
    >
      <h2 className="font-display text-2xl text-ink">{title}</h2>
      {action}
    </div>
  );
}
