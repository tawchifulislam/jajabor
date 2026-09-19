import { Inter, Playfair_Display, Tiro_Bangla } from 'next/font/google';
import './globals.css';

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

export const metadata = {
  title: 'Jajabor',
  description:
    'A personal log of places to visit - photos, routes, and travel notes.',
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      className={`${inter.variable} ${playfair.variable} ${tiroBangla.variable}`}
    >
      <body className="min-h-dvh antialiased" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
