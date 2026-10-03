import PlaceGridSkeleton from '@/components/PlaceGridSkeleton';
import Container from '@/components/layout/Container';

export default function Loading() {
  return (
    <Container as="main" className="flex-1 py-10">
      <PlaceGridSkeleton />
    </Container>
  );
}
