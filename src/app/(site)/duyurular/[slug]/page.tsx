import { notFound } from "next/navigation";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { mockAnnouncements } from "@/lib/mockData";
import { BreadcrumbItem } from "@/lib/types";
import Link from "next/link";

interface AnnouncementDetailPageProps {
  params: {
    slug: string;
  };
}

export default function AnnouncementDetailPage({
  params,
}: AnnouncementDetailPageProps) {
  const announcement = mockAnnouncements.find((a) => a.slug === params.slug);

  if (!announcement) {
    notFound();
  }

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Duyurular", href: "/duyurular" },
    {
      label: announcement.title,
      href: `/duyurular/${announcement.slug}`,
      isCurrent: true,
    },
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
      {/* Breadcrumbs */}
      <Section background="gray" padding="sm">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
        </Container>
      </Section>

      {/* Hero Section */}
      <Section background="white" padding="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="mb-6">
              <div className="flex items-center mb-4">
                {announcement.isImportant && (
                  <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full mr-4">
                    Önemli Duyuru
                  </span>
                )}
                <span className="text-gray-500 text-sm">
                  {formatDate(announcement.publishedAt)}
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {announcement.title}
              </h1>
              <div className="flex items-center text-gray-600">
                <span>Yazar: {announcement.author}</span>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* İçerik */}
      <Section background="white" padding="xl">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="prose prose-lg max-w-none">
              <div className="bg-gray-50 p-6 rounded-lg mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Özet
                </h3>
                <p className="text-gray-700">{announcement.excerpt}</p>
              </div>

              <div className="text-gray-800 leading-relaxed">
                {announcement.content.split("\n").map((paragraph, index) => (
                  <p key={index} className="mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Ekler */}
      {announcement.attachments && announcement.attachments.length > 0 && (
        <Section background="gray" padding="xl">
          <Container>
            <div className="max-w-4xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ekler</h3>
              <div className="space-y-4">
                {announcement.attachments.map((attachment) => (
                  <div
                    key={attachment.id}
                    className="bg-white p-4 rounded-lg shadow-md flex items-center justify-between"
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                        <svg
                          className="w-5 h-5 text-blue-600"
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
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {attachment.name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          {attachment.type.toUpperCase()} •{" "}
                          {(attachment.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                    </div>
                    <a
                      href={attachment.url}
                      className="text-green-600 hover:text-green-700 font-medium"
                      download
                    >
                      İndir
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Navigasyon */}
      <Section background="white" padding="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
              <Link
                href="/duyurular"
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
                Tüm Duyurular
              </Link>
              <a
                href="/iletisim"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors duration-200"
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
