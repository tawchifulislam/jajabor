import Container from '@/components/layout/Container';

export default function Loading() {
  return (
    <Container as="main" size="form" className="flex-1 animate-pulse py-10">
      <div className="mb-6 h-7 w-40 rounded bg-line" />
      <div className="h-10 w-full rounded-lg bg-line" />
      <div className="mt-6 h-40 w-full rounded-lg bg-line" />
    </Container>
  );
}
