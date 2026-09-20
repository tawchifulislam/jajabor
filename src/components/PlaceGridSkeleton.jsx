export default function PlaceGridSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="mb-4 flex items-end justify-between gap-4 border-l-4 border-line py-1 pl-4">
        <div>
          <div className="mb-2 h-3 w-16 rounded bg-line" />
          <div className="h-7 w-48 rounded bg-line" />
        </div>
        <div className="h-9 w-40 rounded-full bg-line" />
      </div>
      <div className="mb-8 h-10 w-56 rounded-lg bg-line" />
      <div className="mb-6 h-11 w-full max-w-xs rounded-full bg-line" />
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i}>
            <div className="h-44 w-full rounded-lg bg-line" />
            <div className="mt-4 h-5 w-3/4 rounded bg-line" />
            <div className="mt-2 h-3 w-full rounded bg-line" />
          </div>
        ))}
      </div>
    </div>
  );
}
