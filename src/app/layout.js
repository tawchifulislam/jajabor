import { headers } from 'next/headers';
import {
  Inter,
  Playfair_Display,
  Tiro_Bangla,
  Hind_Siliguri,
} from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AddFab from '@/components/AddFab';
import ToastProvider from '@/components/ToastProvider';
import { SessionProvider } from '@/components/SessionProvider';
import { MotionConfig } from 'framer-motion';
import { auth } from '@/lib/auth';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});
const tiroBangla = Tiro_Bangla({
  subsets: ['bengali'],
  weight: '400',
  variable: '--font-tiro-bangla',
  display: 'swap',
});
const hindSiliguri = Hind_Siliguri({
  subsets: ['bengali'],
  weight: ['400', '500', '600'],
  variable: '--font-hind-siliguri',
  display: 'swap',
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://jajabor.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Jajabor',
  description:
    'A personal log of places to visit - photos, routes, and travel notes.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  openGraph: {
    title: 'Jajabor',
    description:
      'A personal log of places to visit - photos, routes, and travel notes.',
    url: siteUrl,
    siteName: 'Jajabor',
    type: 'website',
  },
};

export const viewport = { themeColor: '#0f766e' };

export default async function RootLayout({ children }) {
  const session = await auth.api.getSession({ headers: await headers() });
  const user = session?.user || null;

  return (
    <html
      lang="bn"
      className={`${inter.variable} ${playfair.variable} ${tiroBangla.variable} ${hindSiliguri.variable}`}
    >
      <body className="min-h-dvh antialiased" suppressHydrationWarning>
        <ToastProvider>
          <SessionProvider user={user}>
            <MotionConfig reducedMotion="user">
              <div className="flex min-h-dvh flex-col">
                <Navbar />
                <div className="flex flex-1 flex-col">{children}</div>
                <Footer />
              </div>
              <AddFab />
            </MotionConfig>
          </SessionProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
