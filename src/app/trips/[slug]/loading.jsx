import Container from '@/components/layout/Container';

export default function Loading() {
  return (
    <Container as="main" size="narrow" className="flex-1 animate-pulse py-10">
      <div className="mb-6 h-7 w-56 rounded bg-line" />
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="h-20 w-full rounded-card bg-line" />
        ))}
      </div>
    </Container>
  );
}
