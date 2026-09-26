import { Suspense } from "react";
import { Inter, Playfair_Display, Tiro_Bangla, Hind_Siliguri } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AddFab from "@/components/AddFab";
import ToastProvider from "@/components/ToastProvider";
import SessionGate from "@/components/SessionGate";
import AppShellSkeleton from "@/components/AppShellSkeleton";
import ServiceWorkerRegister from "@/components/ServiceWorkerRegister";
import OfflineBanner from "@/components/OfflineBanner";
import { MotionConfig } from "framer-motion";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair", display: "swap" });
const tiroBangla = Tiro_Bangla({ subsets: ["bengali"], weight: "400", variable: "--font-tiro-bangla", display: "swap" });
const hindSiliguri = Hind_Siliguri({
  subsets: ["bengali"],
  weight: ["400", "500", "600"],
  variable: "--font-hind-siliguri",
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://jajabor.vercel.app";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: "Jajabor",
  description: "A personal log of places to visit - photos, routes, and travel notes.",
  manifest: "/manifest.json",
  icons: { icon: "/favicon.ico", apple: "/apple-touch-icon.png" },
  openGraph: {
    title: "Jajabor",
    description: "A personal log of places to visit - photos, routes, and travel notes.",
    url: siteUrl,
    siteName: "Jajabor",
    type: "website",
  },
};

export const viewport = { themeColor: "#0f766e" };

const THEME_INIT_SCRIPT = `
  try {
    var t = localStorage.getItem('jajabor-theme');
    if (t === 'dark' || t === 'light') {
      document.documentElement.setAttribute('data-theme', t);
    }
  } catch (e) {}
`;

export default function RootLayout({ children }) {
  return (
    <html
      lang="bn"
      suppressHydrationWarning
      className={`${inter.variable} ${playfair.variable} ${tiroBangla.variable} ${hindSiliguri.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body className="min-h-dvh antialiased" suppressHydrationWarning>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-100 focus:rounded-full focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-white"
        >
          Skip to content
        </a>
        <ToastProvider>
          <Suspense fallback={<AppShellSkeleton />}>
            <SessionGate>
              <MotionConfig reducedMotion="user">
                <ServiceWorkerRegister />
                <OfflineBanner />
                <div className="flex min-h-dvh flex-col">
                  <Navbar />
                  <div className="flex flex-1 flex-col">{children}</div>
                  <Footer />
                </div>
                <AddFab />
              </MotionConfig>
            </SessionGate>
          </Suspense>
        </ToastProvider>
      </body>
    </html>
  );
}