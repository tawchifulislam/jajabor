import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Container from '@/components/layout/Container';

export default function Loading() {
  return (
    <div className="flex min-h-dvh flex-col">
      <Navbar />
      <Container as="main" size="narrow" className="flex-1 animate-pulse py-10">
        <div className="mb-6 h-64 w-full rounded-card bg-line sm:h-72" />
        <div className="mb-2 h-8 w-2/3 rounded bg-line" />
        <div className="mb-6 h-4 w-1/3 rounded bg-line" />
        <div className="h-24 w-full rounded-card bg-line" />
      </Container>
      <Footer />
    </div>
  );
}
