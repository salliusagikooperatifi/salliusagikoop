"use client";

import React from "react";
import { notFound } from "next/navigation";
import Image from "next/image";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { mockProjects } from "@/lib/mockData";
import { BreadcrumbItem } from "@/lib/types";
import Link from "next/link";

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }> | { slug: string };
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [resolvedParams, setResolvedParams] = React.useState<{
    slug: string;
  } | null>(null);

  React.useEffect(() => {
    const resolveParams = async () => {
      const resolved = params instanceof Promise ? await params : params;
      setResolvedParams(resolved);
    };
    resolveParams();
  }, [params]);

  if (!resolvedParams) {
    return <div>Loading...</div>;
  }

  const project = mockProjects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  // Alt Projeler bölümü yoruma alındığı için bu fonksiyon da yoruma alındı
  // const scrollToSubProjects = () => {
  //   const element = document.getElementById("alt-projeler");
  //   if (element) {
  //     element.scrollIntoView({
  //       behavior: "smooth",
  //       block: "start",
  //     });
  //   }
  // };

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
      <Section background="white" padding="md">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {project.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 whitespace-pre-line">
                {project.description}
              </p>

              {/* Proje Bilgileri */}
              {/* Konum bilgisi şimdilik gizlendi */}
              {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
              </div> */}
            </div>

            {/* Proje Görseli */}
            <div className="relative">
              <div className="relative h-96 w-full rounded-lg overflow-hidden">
                <Image
                  src={project.images?.[0] || "/images/no-image.png"}
                  alt={project.title}
                  fill
                  className="object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Proje Özellikleri - Şimdilik gizlendi */}
      {/* {project.features && project.features.length > 0 && (
        <Section background="gray" padding="sm">
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
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 shrink-0">
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
      )} */}

      {/* Proje Faydaları - Şimdilik gizlendi */}
      {/* {project.benefits && project.benefits.length > 0 && (
        <Section background="white" padding="sm">
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
      )} */}

      {/* Alt Projeler (children) - Şimdilik gizlendi */}
      {/* {project.children && project.children.length > 0 && (
        <Section background="white" padding="sm" id="alt-projeler">
          <Container>
            <div className="bg-linear-to-r from-green-50 to-blue-50 p-8 rounded-xl border border-green-200 shadow-lg">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                  <svg
                    className="w-8 h-8 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-4">
                  Alt Projeler
                </h2>
                <p className="text-lg text-gray-600">
                  Bu ana projenin kapsamında yer alan alt projeler
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.children
                  .map((childId) => mockProjects.find((p) => p.id === childId))
                  .filter(Boolean)
                  .map((child) => (
                    <div
                      key={child!.id}
                      className="bg-white rounded-xl shadow-lg p-6 flex flex-col border border-green-200 hover:border-green-300 hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-start mb-4">
                        <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
                          <svg
                            className="w-5 h-5 text-green-600"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
                            {child!.title}
                          </h3>
                          <p className="text-gray-600 text-base line-clamp-2 mb-4">
                            {child!.shortDescription}
                          </p>
                        </div>
                      </div>
                      <div className="mt-auto flex justify-end">
                        <Link
                          href={`/projeler/${child!.slug}`}
                          className="inline-flex items-center bg-green-600 text-white font-medium text-sm px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200"
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
            </div>
          </Container>
        </Section>
      )} */}

      {/* Proje Galerisi */}
      {project.images && project.images.length > 1 && (
        <Section background="gray" padding="sm">
          <Container>
            {/* Şimdilik gizlendi 
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Proje Galerisi
              </h2>
              <p className="text-xl text-gray-600">Projemizden görüntüler</p>
            </div>
*/}
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
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
                  />
                </div>
              ))}
            </div>
          </Container>
        </Section>
      )}

      {/* İletişim CTA */}
      <Section background="green" padding="sm">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Proje Hakkında Daha Fazla Bilgi
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
    </div>
  );
}
