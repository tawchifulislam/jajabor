export default function JajaborMark({ className = 'h-8 w-8' }) {
  return (
    <svg viewBox="0 0 100 100" className={className}>
      <text
        x="50"
        y="72"
        textAnchor="middle"
        fontFamily="var(--font-quote)"
        fontSize="80"
        fill="var(--color-brand)"
      >
        য
      </text>
      <circle cx="78" cy="26" r="7" fill="var(--color-accent)" />
    </svg>
  );
}
