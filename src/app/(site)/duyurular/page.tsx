"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { mockAnnouncements } from "@/lib/mockData";
import { BreadcrumbItem } from "@/lib/types";

export default function AnnouncementsPage() {
  const [filter, setFilter] = useState<"all" | "important">("all");

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Duyurular", href: "/duyurular", isCurrent: true },
  ];

  const filteredAnnouncements =
    filter === "important"
      ? mockAnnouncements.filter((announcement) => announcement.isImportant)
      : mockAnnouncements;

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
      <Section background="white" padding="xl">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Duyurular
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Kooperatifimizden önemli duyurular, güncellemeler ve
              bilgilendirmeler. Tüm üyelerimizin ve ilgililerin dikkatine
              sunarız.
            </p>
          </div>
        </Container>
      </Section>

      {/* Filtreler */}
      <Section background="gray" padding="lg">
        <Container>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setFilter("all")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  filter === "all"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tüm Duyurular ({mockAnnouncements.length})
              </button>
              <button
                onClick={() => setFilter("important")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  filter === "important"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Önemli Duyurular (
                {mockAnnouncements.filter((a) => a.isImportant).length})
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Duyurular Listesi */}
      <Section background="white" padding="xl">
        <Container>
          <div className="space-y-6">
            {filteredAnnouncements.map((announcement) => (
              <div
                key={announcement.id}
                className="bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        {announcement.isImportant && (
                          <span className="px-3 py-1 bg-red-100 text-red-800 text-sm font-medium rounded-full mr-3">
                            Önemli
                          </span>
                        )}
                        <span className="text-sm text-gray-500">
                          {formatDate(announcement.publishedAt)}
                        </span>
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">
                        <Link
                          href={`/duyurular/${announcement.slug}`}
                          className="hover:text-green-600 transition-colors duration-200"
                        >
                          {announcement.title}
                        </Link>
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-3">
                        {announcement.excerpt}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500">
                      <span>Yazar: {announcement.author}</span>
                    </div>
                    <Link
                      href={`/duyurular/${announcement.slug}`}
                      className="text-green-600 hover:text-green-700 font-medium flex items-center"
                    >
                      Devamını Oku
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
            ))}
          </div>

          {filteredAnnouncements.length === 0 && (
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
                Duyuru bulunamadı
              </h3>
              <p className="text-gray-600">
                Seçilen kriterlere uygun duyuru bulunmamaktadır.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Abone Olma */}
      <Section background="green" padding="xl">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Duyurularımızdan Haberdar Olun
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Önemli duyurularımızı kaçırmamak için e-posta listemize abone
              olun. Sadece önemli güncellemeleri size göndeririz.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Abone Ol
              </button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
