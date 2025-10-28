"use client";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectCard from "@/components/cards/ProjectCard";
import { mockProjects } from "@/lib/mockData";
import type { Project } from "@/lib/types";

export default function ProjectsPage() {
  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "Projelerimiz", href: "/projeler", isCurrent: true },
  ];

  const mainCategoryOrder = [
    "ozel-agaclandirma",
    "hayvansal-uretim",
    "bitkisel-uretim",
    "tarimsal-sanayi",
    "el-sanatlari-hali-kilim",
    "egitim-spor-merkezi",
  ] as const;

  const mainProjects = mainCategoryOrder
    .map((cat) => mockProjects.find((p) => p.category === cat))
    .filter((p): p is Project => Boolean(p));

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
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Projelerimiz
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Sürdürülebilir kalkınma hedeflerimiz doğrultusunda hayata
              geçirdiğimiz projelerimizi keşfedin. Her proje, bölgemizin
              ekonomik ve sosyal kalkınmasına katkı sağlamaktadır.
            </p>
          </div>
        </Container>
      </Section>

      {/* Filtreler - şimdilik devre dışı */}
      {false && (
        <Section background="gray" padding="lg">
          <Container>
            <div className="bg-white rounded-lg shadow-md p-6">Filtreler</div>
          </Container>
        </Section>
      )}

      {/* Projeler Listesi */}
      <Section background="gray" padding="lg">
        <Container>
          {mainProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {mainProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
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
                    d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Seçilen kriterlere uygun proje bulunamadı
              </h3>
              <p className="text-gray-600 mb-6">
                Farklı filtreler deneyerek daha fazla proje keşfedebilirsiniz.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Proje Kategorileri Açıklaması - şimdilik devre dışı */}
      {false && (
        <Section background="gray" padding="xl">
          <Container>Proje Kategorileri Açıklaması</Container>
        </Section>
      )}
    </div>
  );
}
