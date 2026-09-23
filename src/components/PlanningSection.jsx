import { Navigation, Route as RouteIcon } from 'lucide-react';
import { isBengali } from '@/lib/isBengali';

export default function PlanningSection({ howToGetThere, estimatedCost }) {
  if (!howToGetThere && !estimatedCost) return null;

  return (
    <section className="mb-6 rounded-card border border-line bg-card p-5">
      <h2 className="mb-4 font-display text-lg text-ink">
        Planning your visit
      </h2>

      {howToGetThere ? (
        <div className={estimatedCost ? 'mb-4 border-b border-line pb-4' : ''}>
          <h3 className="mb-1.5 flex items-center gap-2 text-sm font-medium text-ink">
            <Navigation className="h-4 w-4 text-brand" />
            How to get there
          </h3>
          <p
            className={`whitespace-pre-line text-ink-soft ${
              isBengali(howToGetThere) ? 'font-bn' : ''
            }`}
          >
            {howToGetThere}
          </p>
        </div>
      ) : null}

      {estimatedCost ? (
        <div>
          <h3 className="mb-1.5 flex items-center gap-2 text-sm font-medium text-ink">
            <RouteIcon className="h-4 w-4 text-brand" />
            Route details
          </h3>
          <p
            className={`whitespace-pre-line text-ink-soft ${
              isBengali(estimatedCost) ? 'font-bn' : ''
            }`}
          >
            {estimatedCost}
          </p>
        </div>
      ) : null}
    </section>
  );
}
