import { Suspense } from 'react';
import Hero from '@/components/Hero';
import Container from '@/components/layout/Container';
import PlaceListSection from '@/components/PlaceListSection';
import PlaceGridSkeleton from '@/components/PlaceGridSkeleton';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <>
      <Hero
        quote={
          'সারা বিশ্ব হয়ে যায় আমার নিজের ঘর\nখোলা আকাশের নিচে সবাই যাযাবর'
        }
      />
      <Container as="main" className="flex-1 py-10">
        <Suspense fallback={<PlaceGridSkeleton />}>
          <PlaceListSection />
        </Suspense>
      </Container>
    </>
  );
}
