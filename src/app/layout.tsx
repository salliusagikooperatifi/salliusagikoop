import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://salliusagikoop.vercel.app"),
  title: "Şallıuşağı Üretim ve Pazarlama Kooperatifi",
  description:
    "Sürdürülebilir tarım ve üretim faaliyetlerini destekleyerek, üyelerimizin refahını artırmayı ve toplumsal kalkınmaya katkıda bulunmayı hedefliyoruz.",
  keywords: [
    "kooperatif",
    "tarım",
    "üretim",
    "pazarlama",
    "şallıuşağı",
    "sürdürülebilir",
  ],
  authors: [{ name: "Şallıuşağı Kooperatifi" }],
  icons: {
    icon: [
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Şallıuşağı Üretim ve Pazarlama Kooperatifi",
    description:
      "Sürdürülebilir tarım ve üretim faaliyetleri ile bölgesel kalkınma",
    type: "website",
    locale: "tr_TR",
    url: "https://salliusagikoop.vercel.app",
    siteName: "Şallıuşağı Kooperatifi",
    images: [
      {
        url: "/images/logo/logo.avif",
        width: 1200,
        height: 630,
        alt: "Şallıuşağı Üretim ve Pazarlama Kooperatifi",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Şallıuşağı Üretim ve Pazarlama Kooperatifi",
    description:
      "Sürdürülebilir tarım ve üretim faaliyetlerini destekleyerek, toplumsal kalkınmaya katkı sağlıyoruz.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#e41e25",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" data-scroll-behavior="smooth">
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
