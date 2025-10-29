import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ProjectCard from "@/components/cards/ProjectCard";
import NewsCard from "@/components/cards/NewsCard";
import { mockProjects } from "@/lib/mockData";
import { getSupabaseServer } from "@/lib/supabase/server";
import { Announcement, NewsItem } from "@/lib/types";
export const dynamic = "force-dynamic";
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

      {/* Misyon ve Vizyon */}
      <Section background="white" padding="xl">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-green-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mr-4">
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
                <h3 className="text-2xl font-bold text-gray-900">Misyonumuz</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Bölgemizdeki üreticilerin bir araya gelerek güç birliği
                yapmasını sağlamak, modern tarım tekniklerini yaygınlaştırmak ve
                ürünlerin değerli fiyatlarla pazarlanmasını sağlamak.
              </p>
            </div>
            <div className="bg-blue-50 p-8 rounded-lg">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mr-4">
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
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Vizyonumuz</h3>
              </div>
              <p className="text-gray-700 text-lg leading-relaxed">
                Sürdürülebilir tarım ve üretim faaliyetleri ile bölgemizin
                ekonomik kalkınmasına öncülük etmek, üyelerimizin refahını
                artırmak ve gelecek nesillere daha yaşanabilir bir çevre
                bırakmak.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Önemli Duyurular */}
      <Section background="gray" padding="lg">
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
              <div className="space-y-6">
                {importantAnnouncements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className={`group rounded-xl border-l-4 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-x-1 hover:shadow-xl ${
                      announcement.isImportant
                        ? "border-red-300"
                        : "border-green-300"
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex size-12 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 ring-black/5 transition-all duration-300 group-hover:scale-110 ${
                            announcement.isImportant
                              ? "bg-white-100"
                              : "bg-white-100"
                          }`}
                        >
                          <svg
                            className={`size-6 ${
                              announcement.isImportant
                                ? "text-red-300"
                                : "text-green-300"
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {announcement.title}
                            </h3>
                            {announcement.isImportant && (
                              <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full shrink-0">
                                Önemli
                              </span>
                            )}
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-gray-500">
                              <span>
                                {new Date(announcement.date).toLocaleDateString(
                                  "tr-TR",
                                  {
                                    year: "numeric",
                                    month: "long",
                                    day: "numeric",
                                  }
                                )}
                              </span>
                            </div>
                            <Link
                              href="/duyurular"
                              className="inline-flex items-center text-green-600 text-sm font-medium hover:text-green-700 hover:underline transition-colors duration-200"
                            >
                              Duyurulara Git
                              <svg
                                className="w-4 h-4 ml-1"
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
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
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
      <Section background="white" padding="xl">
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
                Henüz haber bulunmamaktadır
              </h3>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Kooperatifimizden güncel haberleri ve gelişmeleri yakında
                paylaşacağız. Tüm haberlerimizi görmek için aşağıdaki butona
                tıklayabilirsiniz.
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
