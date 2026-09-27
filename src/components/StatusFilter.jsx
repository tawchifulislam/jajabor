'use client';

const OPTIONS = [
  { value: null, label: 'All' },
  { value: 'want-to-go', label: 'যেতে চাই' },
  { value: 'visited', label: 'ঘুরে এসেছি' },
];

export default function StatusFilter({ selected, onSelect }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {OPTIONS.map(opt => (
        <button
          key={opt.label}
          onClick={() => onSelect(opt.value)}
          className={`flex h-10 shrink-0 items-center rounded-full border px-3 text-xs font-medium transition ${
            selected === opt.value
              ? 'border-action bg-action text-white'
              : 'border-line text-ink-soft hover:bg-card'
          } ${opt.value ? 'font-bn' : ''}`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
