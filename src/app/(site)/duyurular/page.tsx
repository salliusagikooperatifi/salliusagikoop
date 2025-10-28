"use client";

import { useState, useEffect } from "react";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { mockAnnouncements } from "@/lib/mockData";
import { BreadcrumbItem, Announcement } from "@/lib/types";
import { motion } from "framer-motion";

export default function AnnouncementsPage() {
  const [loading, setLoading] = useState(true);
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Duyurular", href: "/duyurular", isCurrent: true },
  ];

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setAnnouncements(mockAnnouncements);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
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
      <Section background="white" padding="md">
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

      {/* Duyurular Listesi */}
      <section className="py-12 md:py-16 lg:py-20 bg-linear-to-b from-white via-slate-50 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="flex justify-center items-center min-h-[400px]">
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-600 mb-4"></div>
                <p className="text-gray-600">Duyurular yükleniyor...</p>
              </div>
            </div>
          ) : announcements.length === 0 ? (
            <div className="text-center py-12 md:py-20">
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
              <p className="text-gray-600 text-base md:text-lg">
                Henüz hiç duyuru bulunmamaktadır.
              </p>
            </div>
          ) : (
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="space-y-6"
            >
              {announcements.map((announcement) => (
                <motion.div key={announcement.id} variants={item}>
                  <div
                    className={`group rounded-xl border-l-4 bg-white/80 backdrop-blur-sm shadow-sm transition-all duration-300 hover:-translate-x-1 hover:shadow-xl ${
                      announcement.isImportant
                        ? "border-red-500"
                        : "border-green-500"
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        <div
                          className={`flex size-12 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1 ring-black/5 transition-all duration-300 group-hover:scale-110 ${
                            announcement.isImportant
                              ? "bg-red-100"
                              : "bg-green-100"
                          }`}
                        >
                          <svg
                            className={`size-6 ${
                              announcement.isImportant
                                ? "text-red-600"
                                : "text-green-600"
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
                          <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                            <span>{formatDate(announcement.date)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="ml-16">
                        <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                          {announcement.content}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </section>

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
                className="flex-1 px-4 py-3 rounded-lg bg-white text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
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
