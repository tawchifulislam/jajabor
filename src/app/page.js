import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Container from '@/components/layout/Container';
import PlaceListSection from '@/components/PlaceListSection';
import PlaceGridSkeleton from '@/components/PlaceGridSkeleton';

export const dynamic = 'force-dynamic';

export default function HomePage() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
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
      <Footer />
    </div>
  );
}
