import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Şallıuşağı Üretim ve Pazarlama Kooperatifi",
  description:
    "Bölgemizde sürdürülebilir tarım ve üretim faaliyetlerini destekleyerek, üyelerimizin refahını artırmayı ve toplumsal kalkınmaya katkıda bulunmayı hedefliyoruz.",
  keywords: [
    "kooperatif",
    "tarım",
    "üretim",
    "pazarlama",
    "şallıuşağı",
    "sürdürülebilir",
  ],
  authors: [{ name: "Şallıuşağı Kooperatifi" }],
  openGraph: {
    title: "Şallıuşağı Üretim ve Pazarlama Kooperatifi",
    description:
      "Sürdürülebilir tarım ve üretim faaliyetleri ile bölgesel kalkınma",
    type: "website",
    locale: "tr_TR",
  },
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
