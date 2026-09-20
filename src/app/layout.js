import { Inter, Playfair_Display, Tiro_Bangla } from 'next/font/google';
import './globals.css';
import AddFab from '@/components/AddFab';
import ToastProvider from '@/components/ToastProvider';
import { MotionConfig } from 'framer-motion';

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

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || 'https://jajabor.vercel.app';

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Jajabor',
  description:
    'A personal log of places to visit - photos, routes, and travel notes.',
  icons: {
    icon: '/favicon.ico',
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

export const viewport = {
  themeColor: '#0f766e',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${inter.variable} ${playfair.variable} ${tiroBangla.variable}`}
    >
      <body className="min-h-dvh antialiased" suppressHydrationWarning>
        <ToastProvider>
          <MotionConfig reducedMotion="user">
            {children}
            <AddFab />
          </MotionConfig>
        </ToastProvider>
      </body>
    </html>
  );
}
