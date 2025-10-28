import Link from "next/link";
import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import ProjectCard from "@/components/cards/ProjectCard";
import NewsCard from "@/components/cards/NewsCard";
import AnnouncementCard from "@/components/cards/AnnouncementCard";
import { mockProjects, mockNews, mockAnnouncements } from "@/lib/mockData";

export default function HomePage() {
  const featuredProjects = mockProjects.filter(
    (project) => project.hierarchy === "main"
  );
  const featuredNews = mockNews.filter((news) => news.isFeatured).slice(0, 1);
  const recentNews = mockNews.filter((news) => !news.isFeatured).slice(0, 3);
  const importantAnnouncements = mockAnnouncements
    .filter((announcement) => announcement.isImportant)
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <Section
        background="green"
        padding="xl"
        className="relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-green-600 to-blue-600 opacity-90"></div>
        <Container className="relative z-10">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Şallıuşağı Üretim ve Pazarlama Kooperatifi
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Bölgemizde sürdürülebilir tarım ve üretim faaliyetlerini
              destekleyerek, üyelerimizin refahını artırmayı ve toplumsal
              kalkınmaya katkıda bulunmayı hedefliyoruz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/projeler"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {importantAnnouncements.map((announcement) => (
              <AnnouncementCard
                key={announcement.id}
                announcement={announcement}
              />
            ))}
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

          {/* Öne Çıkan Haber */}
          {featuredNews.length > 0 && (
            <div className="mb-12">
              <NewsCard news={featuredNews[0]} variant="featured" />
            </div>
          )}

          {/* Diğer Haberler */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentNews.map((news) => (
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
