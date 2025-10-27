"use client";

import { useState } from "react";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import NewsCard from "@/components/cards/NewsCard";
import { mockNews } from "@/lib/mockData";
import { BreadcrumbItem } from "@/lib/types";

export default function NewsPage() {
  const [filter, setFilter] = useState<"all" | "featured">("all");

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Haberler", href: "/haberler", isCurrent: true },
  ];

  const featuredNews = mockNews.filter((news) => news.isFeatured);
  const regularNews = mockNews.filter((news) => !news.isFeatured);

  const filteredNews = filter === "featured" ? featuredNews : mockNews;

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
              Haberler
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Kooperatifimizden güncel haberler, gelişmeler ve başarı
              hikayeleri. Projelerimizden, etkinliklerimizden ve
              faaliyetlerimizden haberdar olun.
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
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tüm Haberler ({mockNews.length})
              </button>
              <button
                onClick={() => setFilter("featured")}
                className={`px-6 py-2 rounded-lg font-medium transition-colors duration-200 ${
                  filter === "featured"
                    ? "bg-yellow-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Öne Çıkan Haberler ({featuredNews.length})
              </button>
            </div>
          </div>
        </Container>
      </Section>

      {/* Öne Çıkan Haberler */}
      {filter === "all" && featuredNews.length > 0 && (
        <Section background="white" padding="xl">
          <Container>
            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">
                Öne Çıkan Haberler
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {featuredNews.map((news) => (
                  <NewsCard key={news.id} news={news} variant="featured" />
                ))}
              </div>
            </div>
          </Container>
        </Section>
      )}

      {/* Haberler Listesi */}
      <Section background={filter === "all" ? "gray" : "white"} padding="xl">
        <Container>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              {filter === "all" ? "Tüm Haberler" : "Öne Çıkan Haberler"}
            </h2>
            <p className="text-gray-600">{filteredNews.length} haber bulundu</p>
          </div>

          {filteredNews.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news) => (
                <NewsCard key={news.id} news={news} />
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
                    d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Haber bulunamadı
              </h3>
              <p className="text-gray-600">
                Seçilen kriterlere uygun haber bulunmamaktadır.
              </p>
            </div>
          )}
        </Container>
      </Section>

      {/* Kategoriler */}
      <Section background="white" padding="xl">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Haber Kategorileri
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Farklı konulardaki haberlerimizi kategorilere ayırdık
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-green-50 p-6 rounded-lg text-center hover:bg-green-100 transition-colors duration-200">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mx-auto mb-4">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Projeler</h3>
              <p className="text-sm text-gray-600">Proje haberleri</p>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg text-center hover:bg-blue-100 transition-colors duration-200">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mx-auto mb-4">
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
                    d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Etkinlikler</h3>
              <p className="text-sm text-gray-600">Etkinlik haberleri</p>
            </div>

            <div className="bg-yellow-50 p-6 rounded-lg text-center hover:bg-yellow-100 transition-colors duration-200">
              <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-center justify-center mx-auto mb-4">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">Başarılar</h3>
              <p className="text-sm text-gray-600">Başarı haberleri</p>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg text-center hover:bg-purple-100 transition-colors duration-200">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mx-auto mb-4">
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
              <h3 className="font-semibold text-gray-900 mb-2">Gelişmeler</h3>
              <p className="text-sm text-gray-600">Genel gelişmeler</p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Newsletter */}
      <Section background="blue" padding="xl">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Haberlerimizi Kaçırmayın
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              En güncel haberlerimizi e-posta ile almak için newsletter'ımıza
              abone olun. Haftalık olarak önemli gelişmeleri size ulaştırırız.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="E-posta adresiniz"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
                Abone Ol
              </button>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
