export default function FormSection({ title, description, children }) {
  return (
    <div className="rounded-card border border-line bg-card p-5 sm:p-6">
      <div className="mb-5">
        <h2 className="font-display text-lg text-ink">{title}</h2>
        {description ? (
          <p className="mt-0.5 text-sm text-ink-soft">{description}</p>
        ) : null}
      </div>
      <div className="space-y-5">{children}</div>
    </div>
  );
}
