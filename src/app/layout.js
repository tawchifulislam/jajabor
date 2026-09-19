import { Inter, Playfair_Display } from 'next/font/google';
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

export const metadata = {
  title: 'Jajabor',
  description:
    'A personal log of places to visit - photos, routes, and travel notes.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-dvh antialiased">{children}</body>
    </html>
  );
}
