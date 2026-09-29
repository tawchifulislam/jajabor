import { Suspense } from 'react';
import Hero from '@/components/Hero';
import Container from '@/components/layout/Container';
import PlaceListSection from '@/components/PlaceListSection';
import PlaceGridSkeleton from '@/components/PlaceGridSkeleton';

export const dynamic = 'force-dynamic';

const title = 'WayNama (পথের-গল্প) - Places to visit in Bangladesh';
const description =
  'বাংলাদেশের ঘুরে দেখার জায়গা - ছবি, যাওয়ার পথ আর ভ্রমণ-নোট এক জায়গায়। A shared log of places to visit across Bangladesh.';

export const metadata = {
  title,
  description,
  alternates: { canonical: '/' },
  openGraph: {
    title,
    description,
    url: '/',
    siteName: 'WayNama',
    type: 'website',
  },
};

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
