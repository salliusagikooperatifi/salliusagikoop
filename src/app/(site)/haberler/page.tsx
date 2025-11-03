import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsCard from "@/components/cards/NewsCard";
import SupabaseRealtimeRefresher from "@/components/SupabaseRealtimeRefresher";
import { getSupabaseServer } from "@/lib/supabase/server";
import { BreadcrumbItem, NewsItem } from "@/lib/types";
export const dynamic = "force-dynamic";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Haberler | Şallıuşağı Kooperatifi",
  description:
    "Kooperatifimizden güncel haberler, gelişmeler ve duyurular. Etkinlikler ve başarı hikayeleri.",
};

async function fetchNews(): Promise<NewsItem[]> {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("publishedAt", { ascending: false });

    if (error) {
      console.error("Haberler yüklenirken hata:", error);
      return [];
    }

    return (data as NewsItem[]) || [];
  } catch (err) {
    console.error("Haberler yüklenirken genel hata:", err);
    return [];
  }
}

export default async function NewsPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Haberler", href: "/haberler", isCurrent: true },
  ];

  const news = await fetchNews();

  return (
    <div className="min-h-screen">
      <SupabaseRealtimeRefresher tables={["news"]} />
      {/* Breadcrumbs */}
      <Section background="gray" padding="sm">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
        </Container>
      </Section>

      {/* Hero Section */}
      <Section background="white" padding="md">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Haberler
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Kooperatifimizden güncel haberler, gelişmeler ve başarı
              hikayeleri. Projelerimizden, etkinliklerimizden ve
              faaliyetlerimizden haberdar olun.
            </p>
          </div>
        </Container>
      </Section>

      {/* Haberler Listesi */}
      <Section background="gray" padding="xl">
        <Container>
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
            {news.length === 0 ? (
              <div className="text-center py-12 md:py-20">
                <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Haberler
                </h3>
                <p className="text-gray-600 text-base md:text-lg">
                  Kooperatifimizin faaliyetlerine yönelik haberleri buradan
                  takip edebilirsiniz.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {news.map((newsItem) => (
                  <NewsCard key={newsItem.id} news={newsItem} />
                ))}
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      {/* Şimdilik gizlendi 
      <Section background="blue" padding="xl">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Haberlerimizi Kaçırmayın
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              En güncel haberlerimizi e-posta ile almak için
              newsletter&apos;ımıza abone olun. Haftalık olarak önemli
              gelişmeleri size ulaştırırız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Abone Ol
              </button>
            </div>
          </div>
        </Container>
      </Section>
      */}
    </div>
  );
}
