import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BreadcrumbItem, NewsItem } from "@/lib/types";
import Link from "next/link";
import { getSupabaseServer } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

interface NewsDetailPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

async function fetchNewsBySlug(slug: string): Promise<NewsItem | null> {
  try {
    const supabase = getSupabaseServer();
    const { data, error } = await supabase
      .from("news")
      .select("*")
      .eq("slug", slug)
      .maybeSingle();
    if (error) {
      console.error("Haber yüklenirken hata:", error);
      return null;
    }
    return (data as unknown as NewsItem) || null;
  } catch (err) {
    console.error("Haber yüklenirken genel hata:", err);
    return null;
  }
}

export default async function NewsDetailPage({ params }: NewsDetailPageProps) {
  const resolved = params instanceof Promise ? await params : params;
  const { slug } = resolved;
  console.log("slug =>", slug);
  const decodedSlug = decodeURIComponent(slug);
  const news = await fetchNewsBySlug(decodedSlug);
  if (!news) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Haberler", href: "/haberler" },
    { label: news.title, href: `/haberler/${news.slug}`, isCurrent: true },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <Section background="gray" padding="sm">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
        </Container>
      </Section>

      <Section background="white" padding="md">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-3">
              <div className="flex items-center mb-4">
                {news.isFeatured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-800 text-sm font-medium rounded-full mr-4">
                    Öne Çıkan
                  </span>
                )}
                {news.publishedAt && (
                  <span className="text-gray-500 text-sm">
                    {formatDate(news.publishedAt)}
                  </span>
                )}
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {news.title}
              </h1>
              {news.author && (
                <div className="flex items-center text-gray-600">
                  <span>Yazar: {news.author}</span>
                </div>
              )}
            </div>
          </div>
        </Container>
      </Section>

      {news.featuredImage && (
        <div>
          <Container>
            <div className="max-w-4xl mx-auto">
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={news.featuredImage}
                  alt={news.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </Container>
        </div>
      )}

      <Section background="white" padding="md">
        <Container>
          <div className="max-w-4xl mx-auto">
            {news.excerpt && (
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Özet
                </h3>
                <div
                  className="prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: news.excerpt }}
                />
              </div>
            )}

            {news.content && (
              <div
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-800 prose-a:text-blue-600 prose-strong:text-gray-900 prose-ul:text-gray-800 prose-ol:text-gray-800 prose-li:text-gray-800"
                dangerouslySetInnerHTML={{ __html: news.content }}
              />
            )}
          </div>
        </Container>
      </Section>

      {news.tags && news.tags.length > 0 && (
        <Section background="gray" padding="lg">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Etiketler
              </h3>
              <div className="flex flex-wrap gap-2">
                {news.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-white text-gray-700 text-sm rounded-full border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {news.images && news.images.length > 0 && (
        <Section background="white" padding="xl">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Galeri</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                  >
                    <Image
                      src={image || "/images/no-image.png"}
                      alt={`${news.title} - Görsel ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Paylaşım */}
      <Section background="gray" padding="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Bu Haberi Paylaş
              </h3>
              <div className="flex flex-wrap gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : ""
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                  Facebook
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    typeof window !== "undefined" ? window.location.href : ""
                  )}&text=${encodeURIComponent(news.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Twitter
                </a>
                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    news.title +
                      " " +
                      (typeof window !== "undefined"
                        ? window.location.href
                        : "")
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
                  </svg>
                  WhatsApp
                </a>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section background="white" padding="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Link
                href="/haberler"
                className="inline-flex items-center px-6 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors duration-200"
              >
                <svg
                  className="w-5 h-5 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Tüm Haberler
              </Link>
              <a
                href="/iletisim"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors duration-200"
              >
                İletişime Geç
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
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
