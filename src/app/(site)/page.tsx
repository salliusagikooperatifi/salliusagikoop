import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ProjectCard from "@/components/cards/ProjectCard";
import NewsCard from "@/components/cards/NewsCard";
import AnnouncementCard from "@/components/cards/AnnouncementCard";
import { mockProjects } from "@/lib/mockData";
import { getSupabaseServer } from "@/lib/supabase/server";
import { Announcement, NewsItem } from "@/lib/types";
export const dynamic = "force-dynamic";
export const metadata: Metadata = {
  title: "Şallıuşağı Kooperatifi | Anasayfa",
  description:
    "Kooperatifimizin projeleri, haberleri ve duyuruları. Sürdürülebilir üretim ve toplumsal fayda için çalışıyoruz.",
};
import RotatingText from "@/components/RotatingText";

async function fetchLatestNews(): Promise<NewsItem[]> {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .order("publishedAt", { ascending: false })
      .limit(4);

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

export default async function HomePage() {
  const featuredProjects = mockProjects.filter(
    (project) => project.hierarchy === "main"
  );

  const latestNews = await fetchLatestNews();

  // Fetch important announcements from Supabase
  const supabase = getSupabaseServer();
  const { data: importantData } = await supabase
    .from("announcements")
    .select("*")
    .eq("isImportant", true)
    .order("date", { ascending: false })
    .limit(3);
  const importantAnnouncements = (importantData as Announcement[]) || [];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section
        className="
    relative h-screen flex items-center justify-center overflow-hidden
    after:content-[''] after:absolute after:inset-0 after:bg-black/60
  "
      >
        {/* Background Image with Ken Burns Effect */}
        <div className="absolute inset-0 bg-[url('/images/hero/hero.avif')] bg-cover bg-center animate-ken-burns-slow"></div>
        <Container className="relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Şallıuşağı Üretim ve Pazarlama Kooperatifi
            </h1>

            {/* Rotating text */}
            <div className="h-24 md:h-28 flex items-center justify-center mb-8">
              <RotatingText />
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projeler"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
              >
                Projelerimizi Keşfedin
              </Link>
              <Link
                href="/hakkimizda"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
              >
                Hakkımızda
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Kooperatif Amacımız */}
      <Section background="white" padding="xl">
        <Container>
          <div className="max-w-5xl mx-auto">
            {/* İçerik Kartları */}
            <div className="space-y-6">
              {/* Kart 1 */}
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 10V3L4 14h7v7l9-11h-7z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed flex-1">
                    Köyümüzde ve bölgemizde kırsal kalkınma aracılığı ile
                    üretim, istihdam ve katma değer yaratmak amacıyla birlikte
                    el ele vererek yarınlara hazırlanmaktır.
                  </p>
                </div>
              </div>

              {/* Kart 2 */}
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed flex-1">
                    Kooperatifimiz köyümüz ve bölgemizi üretimde ve istihdamda
                    devletin tüm teşvik ve desteklerinden yararlanarak çeşitli
                    projeleri hayata geçirmek için kurulmuştur.
                  </p>
                </div>
              </div>

              {/* Kart 3 */}
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-amber-600 rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-gray-700 text-lg leading-relaxed flex-1">
                    Doğaya ve emeğe değer vererek ürettiklerimizi yurtdışı
                    pazarlara taşıyarak Avrupa&apos;daki tüm dostlarımızla
                    birlikte pazarlayacak ve köyümüze gelir kaynakları sağlamayı
                    planlıyoruz.
                  </p>
                </div>
              </div>

              {/* Kart 4 - Özel Vurgu */}
              <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start gap-4">
                  <div className="shrink-0 w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                    <svg
                      className="w-6 h-6 text-green-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1">
                    <p className="text-white text-lg leading-relaxed font-medium">
                      Köyümüzde yaşayan yaşamayan tüm Şallıuşaklı canlarımızı
                      kooperatifimize davet ediyoruz. Kapımız sadece
                      Şallıuşaklılara açık olacaktır.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Öne Çıkan Projeler */}
      <Section background="gray" padding="xl">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Projelerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Sürdürülebilir kalkınma hedeflerimiz doğrultusunda hayata
              geçirdiğimiz ana projelerimizi keşfedin
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/projeler"
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
            >
              Tüm Projeleri İncele
              <svg
                className="w-5 h-5 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Önemli Duyurular */}
      <Section background="white" padding="lg">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Önemli Duyurular
            </h2>
            <p className="text-gray-600">
              Kooperatifimizden önemli duyurular ve güncellemeler
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            {importantAnnouncements.length > 0 ? (
              <>
                <div className="space-y-6">
                  {importantAnnouncements.map((announcement) => (
                    <AnnouncementCard
                      key={announcement.id}
                      announcement={
                        announcement as unknown as import("@/lib/types").Announcement
                      }
                    />
                  ))}
                </div>
                <div className="text-center mt-8">
                  <Link
                    href="/duyurular"
                    className="inline-flex items-center bg-green-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                  >
                    Tüm Duyuruları Görüntüle
                    <svg
                      className="w-5 h-5 ml-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </div>
              </>
            ) : (
              <div className="text-center py-12">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Şu anda önemli duyuru bulunmamaktadır
                </h3>
                <p className="text-gray-600 mb-6">
                  Tüm duyurularımızı görmek için aşağıdaki butona
                  tıklayabilirsiniz.
                </p>
                <Link
                  href="/duyurular"
                  className="inline-flex items-center bg-green-600 text-white font-medium px-6 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  Tüm Duyuruları Görüntüle
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </Container>
      </Section>

      {/* Haberler */}
      <Section background="gray" padding="xl">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Son Haberler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kooperatifimizden güncel haberler ve gelişmeler
            </p>
          </div>

          {latestNews.length > 0 ? (
            <>
              {/* Son 4 Haber - 2X2 Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {latestNews.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>

              <div className="text-center mt-12">
                <Link
                  href="/haberler"
                  className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Tüm Haberleri Görüntüle
                  <svg
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-12 h-12 text-blue-400"
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
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">
                Haberler
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Kooperatifimizin faaliyetlerine yönelik haberleri buradan takip
                edebilirsiniz.
              </p>
              <Link
                href="/haberler"
                className="inline-flex items-center bg-blue-600 text-white font-semibold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 shadow-md hover:shadow-lg"
              >
                Tüm Haberleri Görüntüle
                <svg
                  className="w-5 h-5 ml-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          )}
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="green" padding="xl">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Kooperatifimize Katılın
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Birlikte daha güçlüyüz. Kooperatifimize üye olarak sürdürülebilir
              kalkınmaya katkıda bulunun ve üretim faaliyetlerinizi geliştirin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/iletisim"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
              >
                İletişime Geç
              </Link>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
