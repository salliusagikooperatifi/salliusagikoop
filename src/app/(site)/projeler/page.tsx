"use client";

import { useState } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectCard from "@/components/cards/ProjectCard";
import { mockProjects } from "@/lib/mockData";
import { Project, ProjectCategory } from "@/lib/types";

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState<
    ProjectCategory | "all"
  >("all");
  const [selectedStatus, setSelectedStatus] = useState<string>("all");

  const breadcrumbItems = [
    { label: "Anasayfa", href: "/" },
    { label: "Projelerimiz", href: "/projeler", isCurrent: true },
  ];

  const categories = [
    { value: "all", label: "Tümü", count: mockProjects.length },
    {
      value: "ozel-agaclandirma",
      label: "Özel Ağaçlandırma",
      count: mockProjects.filter((p) => p.category === "ozel-agaclandirma")
        .length,
    },
    {
      value: "hayvansal-uretim",
      label: "Hayvansal Üretim",
      count: mockProjects.filter((p) => p.category === "hayvansal-uretim")
        .length,
    },
    {
      value: "bitkisel-uretim",
      label: "Bitkisel Üretim",
      count: mockProjects.filter((p) => p.category === "bitkisel-uretim")
        .length,
    },
    {
      value: "tarimsal-sanayi",
      label: "Tarımsal Sanayi",
      count: mockProjects.filter((p) => p.category === "tarimsal-sanayi")
        .length,
    },
    {
      value: "el-sanatlari-hali-kilim",
      label: "El Sanatları",
      count: mockProjects.filter(
        (p) => p.category === "el-sanatlari-hali-kilim"
      ).length,
    },
    {
      value: "egitim-spor-merkezi",
      label: "Eğitim ve Spor",
      count: mockProjects.filter((p) => p.category === "egitim-spor-merkezi")
        .length,
    },
  ];

  const statuses = [
    { value: "all", label: "Tümü" },
    { value: "active", label: "Aktif" },
    { value: "planning", label: "Planlama" },
    { value: "completed", label: "Tamamlandı" },
    { value: "paused", label: "Duraklatıldı" },
  ];

  const filteredProjects = mockProjects.filter((project) => {
    const categoryMatch =
      selectedCategory === "all" || project.category === selectedCategory;
    const statusMatch =
      selectedStatus === "all" || project.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="min-h-screen">
      {/* Breadcrumbs */}
      <Section background="gray" padding="sm">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
        </Container>
      </Section>

      {/* Hero Section */}
      <Section background="white" padding="xl">
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

      {/* Filtreler */}
      <Section background="gray" padding="lg">
        <Container>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Kategori Filtresi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Proje Kategorisi
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {categories.map((category) => (
                    <button
                      key={category.value}
                      onClick={() =>
                        setSelectedCategory(
                          category.value as ProjectCategory | "all"
                        )
                      }
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        selectedCategory === category.value
                          ? "bg-green-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {category.label} ({category.count})
                    </button>
                  ))}
                </div>
              </div>

              {/* Durum Filtresi */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Proje Durumu
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {statuses.map((status) => (
                    <button
                      key={status.value}
                      onClick={() => setSelectedStatus(status.value)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                        selectedStatus === status.value
                          ? "bg-blue-600 text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {status.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Projeler Listesi */}
      <Section background="white" padding="xl">
        <Container>
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">
                {selectedCategory === "all"
                  ? "Tüm Projeler"
                  : categories.find((c) => c.value === selectedCategory)?.label}
                <span className="text-gray-500 font-normal ml-2">
                  ({filteredProjects.length} proje)
                </span>
              </h2>
            </div>
          </div>

          {filteredProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
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
              <button
                onClick={() => {
                  setSelectedCategory("all");
                  setSelectedStatus("all");
                }}
                className="px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors duration-200"
              >
                Filtreleri Temizle
              </button>
            </div>
          )}
        </Container>
      </Section>

      {/* Proje Kategorileri Açıklaması */}
      <Section background="gray" padding="xl">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Proje Kategorilerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Farklı alanlarda faaliyet gösteren projelerimizi kategorilere
              ayırdık
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
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
                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Özel Ağaçlandırma
              </h3>
              <p className="text-gray-600">
                Sürdürülebilir orman yönetimi ve çevre koruma projeleri
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Hayvansal Üretim
              </h3>
              <p className="text-gray-600">
                Büyükbaş ve küçükbaş hayvan üretim projeleri
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-yellow-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Bitkisel Üretim
              </h3>
              <p className="text-gray-600">
                Seracılık ve meyve bahçesi projeleri
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-purple-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Tarımsal Sanayi
              </h3>
              <p className="text-gray-600">
                Süt toplama, zeytinyağı ve fıstık işleme tesisleri
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                El Sanatları
              </h3>
              <p className="text-gray-600">
                Halı, kilim ve geleneksel el sanatları üretimi
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <svg
                  className="w-6 h-6 text-indigo-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Eğitim ve Spor
              </h3>
              <p className="text-gray-600">Eğitim ve spor merkezi projeleri</p>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
