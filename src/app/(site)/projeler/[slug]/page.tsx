import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { mockProjects } from "@/lib/mockData";
import { BreadcrumbItem } from "@/lib/types";
import ProjectCard from "@/components/cards/ProjectCard";
import Link from "next/link";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default async function ProjectDetailPage({
  params,
}: ProjectDetailPageProps) {
  const resolvedParams = params instanceof Promise ? await params : params;
  const project = mockProjects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  const parentProject = project.parentId
    ? mockProjects.find((p) => p.id === project.parentId)
    : undefined;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Projelerimiz", href: "/projeler" },
    ...(parentProject
      ? [
          {
            label: parentProject.title,
            href: `/projeler/${parentProject.slug}`,
          },
        ]
      : []),
    {
      label: project.title,
      href: `/projeler/${project.slug}`,
      isCurrent: true,
    },
  ];

  const statusColors = {
    active: "bg-green-100 text-green-800",
    planning: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    paused: "bg-gray-100 text-gray-800",
  };

  const statusLabels = {
    active: "Aktif",
    planning: "Planlama Aşamasında",
    completed: "Tamamlandı",
    paused: "Duraklatıldı",
  };

  // tarih formatlayıcı şimdilik kullanılmıyor

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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-4">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    statusColors[project.status]
                  }`}
                >
                  {statusLabels[project.status]}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Proje Bilgileri */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.location && (
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <div>
                      <div className="text-sm text-gray-500">Konum</div>
                      <div className="font-medium text-gray-900">
                        {project.location}
                      </div>
                    </div>
                  </div>
                )}

                {/* Bütçe ve tarihler şimdilik gizlendi */}
              </div>
            </div>

            {/* Proje Görseli */}
            <div className="relative">
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={project.images?.[0] || "/images/no-image.png"}
                  alt={project.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Proje Özellikleri */}
      {project.features && project.features.length > 0 && (
        <Section background="gray" padding="xl">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Proje Özellikleri
              </h2>
              <p className="text-xl text-gray-600">
                Bu projenin temel özellikleri ve kapsamı
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.features.map((feature, index) => (
                <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                      <svg
                        className="w-4 h-4 text-green-600"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <p className="text-gray-700 font-medium">{feature}</p>
                  </div>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Proje Faydaları */}
      {project.benefits && project.benefits.length > 0 && (
        <Section background="white" padding="xl">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Proje Faydaları
              </h2>
              <p className="text-xl text-gray-600">
                Bu projenin bölge ve üyelerimize sağlayacağı faydalar
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {project.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 shrink-0">
                    <svg
                      className="w-4 h-4 text-blue-600"
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
                  <p className="text-gray-700 text-lg">{benefit}</p>
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* Proje Galerisi */}
      {project.images && project.images.length > 1 && (
        <Section background="gray" padding="xl">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Proje Galerisi
              </h2>
              <p className="text-xl text-gray-600">Projemizden görüntüler</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.slice(1).map((image, index) => (
                <div
                  key={index}
                  className="relative h-64 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <Image
                    src={image}
                    alt={`${project.title} - Görsel ${index + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* İletişim CTA */}
      <Section background="green" padding="xl">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Bu Proje Hakkında Daha Fazla Bilgi
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Projemiz hakkında detaylı bilgi almak veya katılım sağlamak için
              bizimle iletişime geçin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/iletisim"
                className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                İletişime Geç
              </a>
              <Link
                href="/projeler"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
              >
                Diğer Projeler
              </Link>
            </div>
          </div>
        </Container>
      </Section>

      {/* Alt Projeler (children) */}
      {project.children && project.children.length > 0 && (
        <Section background="white" padding="xl">
          <Container>
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Alt Projeler
              </h2>
              <p className="text-xl text-gray-600">
                Bu ana projenin kapsamında yer alan alt projeler
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {project.children
                .map((childId) => mockProjects.find((p) => p.id === childId))
                .filter(Boolean)
                .map((child) => (
                  <div
                    key={child!.id}
                    className="bg-white rounded-lg shadow-md p-6 flex flex-col"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                      {child!.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">
                      {child!.shortDescription}
                    </p>
                    <div className="mt-auto flex justify-end">
                      <Link
                        href={`/projeler/${child!.slug}`}
                        className="inline-flex items-center border border-green-600 text-green-600 font-medium text-sm px-4 py-2 rounded-md hover:bg-green-50 transition-colors duration-200"
                      >
                        İncele
                        <svg
                          className="w-4 h-4 ml-2"
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
                ))}
            </div>
          </Container>
        </Section>
      )}
    </div>
  );
}
