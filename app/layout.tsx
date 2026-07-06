import type { Metadata, Viewport } from "next";
import {
  Space_Grotesk,
  Zen_Kaku_Gothic_New,
  Noto_Sans_JP,
  IBM_Plex_Mono,
} from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import Cursor from "@/components/providers/Cursor";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SITE_URL, company, brand } from "@/lib/data/company";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const zenKaku = Zen_Kaku_Gothic_New({
  weight: ["500", "700", "900"],
  subsets: ["latin"],
  variable: "--font-zen-kaku",
});

const notoSans = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-sans",
});

const plexMono = IBM_Plex_Mono({
  weight: ["400", "500"],
  subsets: ["latin"],
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${company.name}｜${brand.mainCopy}`,
    template: "%s｜株式会社TOMOSPYRE",
  },
  description: `${brand.mainCopy} 名古屋発、東京・大阪へ。AIクリエイティブ事業を主軸に、人材支援事業・総合インフラ事業の3本柱で企業の成長を支えます。`,
  icons: { icon: [{ url: "/favicon.svg", type: "image/svg+xml" }] },
  openGraph: {
    type: "website",
    locale: "ja_JP",
    siteName: "TOMOSPYRE",
    title: `${company.name}｜${brand.mainCopy}`,
    description: `名古屋発、東京・大阪へ。AIクリエイティブ事業を主軸に企業の成長を支える${company.name}のコーポレートサイト。`,
  },
  twitter: { card: "summary_large_image" },
};

export const viewport: Viewport = {
  themeColor: "#050607",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${spaceGrotesk.variable} ${zenKaku.variable} ${notoSans.variable} ${plexMono.variable} grain`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[300] focus:rounded focus:bg-bone focus:px-4 focus:py-2 focus:text-void"
        >
          本文へスキップ
        </a>
        <SmoothScroll />
        <Cursor />
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
