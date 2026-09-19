export default function JajaborMark({ className = 'h-6 w-6' }) {
  return (
    <svg viewBox="0 0 60 50" fill="none" className={className}>
      <circle cx="4" cy="42" r="1.5" fill="#0f766e" opacity="0.3" />
      <circle cx="9" cy="37" r="2" fill="#0f766e" opacity="0.55" />
      <circle cx="14" cy="31" r="2.5" fill="#d97706" />
      <path
        d="M18 27 Q 32 5 46 20 Q 52 12 58 15"
        stroke="#0f766e"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
