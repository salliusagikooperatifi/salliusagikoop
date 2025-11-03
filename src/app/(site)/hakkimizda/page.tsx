import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Hakkımızda | Şallıuşağı Kooperatifi",
  description:
    "Kooperatifimizin misyonu, vizyonu ve değerleri. Bölgesel kalkınma ve sürdürülebilir üretim için çalışmalarımız.",
};
import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BreadcrumbItem } from "@/lib/types";

export default function AboutPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Hakkımızda", href: "/hakkimizda", isCurrent: true },
  ];

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
              Hakkımızda
            </h1>
            <div className="w-24 h-1 bg-green-600 mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 leading-relaxed">
              Şallıuşağı Üretim ve Pazarlama Kooperatifi olarak, köyümüzde
              sürdürülebilir tarım ve üretim faaliyetlerini destekleyerek,
              köylümüzün ve üyelerimizin refahını artırmayı ve toplumsal
              kalkınmaya katkıda bulunmayı hedefliyoruz.
            </p>
          </div>
        </Container>
      </Section>

      {/* Ana İçerik */}
      <Section background="white" padding="xl">
        <Container>
          <div className="max-w-4xl mx-auto">
            {/* Hero Kart - Tüm İçerik */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-xl p-10 md:p-16 border border-green-100">
              <div className="flex items-center justify-center mb-10">
                <Image
                  src="/images/hakkimizda/aciklamali-logo.png"
                  alt="Şallıuşağı Kooperatifi Logo"
                  width={500}
                  height={167}
                  className="w-full max-w-lg h-auto"
                  priority
                />
              </div>

              <div className="space-y-6 text-center">
                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Kooperatifimiz{" "}
                  <span className="font-semibold">Şubat 2025</span> ayında
                  kurulmuş ve köyümüzde yaşayan ve yaşamayan tüm Şallıuşaklı
                  dost ve akrabalarımıza üye olabilmesi için kurulmuştur.
                </p>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  El ele, gönül gönüle vererek bu kooperatifimizi büyütmek ve
                  geliştirmek istiyoruz.
                </p>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Amacımız köyümüzün devlet imkanlarına yönelik kurumsal bir
                  kimliği olsun.
                </p>

                <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
                  Tüm teşvik ve desteklerden köylümüzü yararlandıralım.
                </p>

                <div className="pt-6">
                  <p className="text-xl md:text-2xl font-bold text-green-700">
                    Amacımız budur.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
