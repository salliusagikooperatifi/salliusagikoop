import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim | Şallıuşağı Kooperatifi",
  description:
    "Adres, telefon ve e-posta bilgilerimiz. Bize ulaşın, sorularınızı yanıtlayalım.",
};
import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { contactInfo } from "@/lib/mockData";
import { BreadcrumbItem } from "@/lib/types";

export default function ContactPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "İletişim", href: "/iletisim", isCurrent: true },
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
      <Section background="white" padding="md">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              İletişim
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Bizimle iletişime geçmek için aşağıdaki bilgileri
              kullanabilirsiniz
            </p>
            <p className="text-xl text-gray-600 leading-relaxed">
              Sorularınız, önerileriniz veya işbirliği teklifleriniz için bize
              ulaşabilirsiniz. Size en kısa sürede dönüş yapacağız.
            </p>
          </div>
        </Container>
      </Section>

      {/* İletişim Bilgileri */}
      <Section background="gray" padding="lg">
        <Container>
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Adres */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      Adres
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      Şehit Nurettin Ademoğlu Mahallesi
                      <br />
                      A.Şevket Özok Caddesi No:10/1
                      <br />
                      PAZARCIK/KAHRAMANMARAŞ
                    </p>
                  </div>
                </div>
              </div>

              {/* E-posta */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
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
                        d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      E-posta
                    </h3>
                    <div className="space-y-2">
                      <p className="text-gray-600">
                        <a
                          href={`mailto:${contactInfo.email.primary}`}
                          className="hover:text-green-600 transition-colors"
                        >
                          {contactInfo.email.primary}
                        </a>
                      </p>
                      {contactInfo.email.info && (
                        <p className="text-gray-600">
                          <a
                            href={`mailto:${contactInfo.email.info}`}
                            className="hover:text-green-600 transition-colors"
                          >
                            {contactInfo.email.info}
                          </a>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Telefon Numaraları */}
            <div className="mt-8 bg-white p-8 rounded-lg shadow-md">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 shrink-0">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </div>
                <div className="w-full">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">
                    Telefon Numaraları
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm">
                          İbrahim Çavaş
                        </h4>
                        <p className="text-xs text-gray-600">Başkan</p>
                      </div>
                      <a
                        href="tel:+4915231382552"
                        className="text-blue-600 hover:text-green-600 transition-colors font-medium text-sm whitespace-nowrap ml-2"
                      >
                        +49 1523 1382552
                      </a>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm">
                          Kasım Şapkur
                        </h4>
                        <p className="text-xs text-gray-600">Başkan Yrd.</p>
                      </div>
                      <a
                        href="tel:+491711260485"
                        className="text-blue-600 hover:text-green-600 transition-colors font-medium text-sm whitespace-nowrap ml-2"
                      >
                        +49 171 1260485
                      </a>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm">
                          Ali Oğuz
                        </h4>
                        <p className="text-xs text-gray-600">Muhasip Üye</p>
                      </div>
                      <a
                        href="tel:+905457304518"
                        className="text-blue-600 hover:text-green-600 transition-colors font-medium text-sm whitespace-nowrap ml-2"
                      >
                        +90 545 730 45 18
                      </a>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-gray-900 text-sm">
                          Tahir Çavaş
                        </h4>
                        <p className="text-xs text-gray-600">Üye</p>
                      </div>
                      <a
                        href="tel:+4917685650986"
                        className="text-blue-600 hover:text-green-600 transition-colors font-medium text-sm whitespace-nowrap ml-2"
                      >
                        +49 176 85650986
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Harita */}
      <Section background="white" padding="xl" id="harita">
        <Container>
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Konumumuz</h2>
            <p className="text-xl text-gray-600">
              Kooperatif merkezimizin konumu ve ulaşım bilgileri
            </p>
          </div>

          <div className="rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.5!2d${contactInfo.coordinates.lng}!3d${contactInfo.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzfCsDI5JzE2LjYiTiAzN8KwMTcnMzMuOSJF!5e0!3m2!1str!2str!4v1640000000000!5m2!1str!2str&q=${contactInfo.coordinates.lat},${contactInfo.coordinates.lng}`}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Şallıuşağı Kooperatifi Konumu"
            ></iframe>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-400 mt-1">
              Şehit Nurettin Ademoğlu Mahallesi, A.Şevket Özok Caddesi No:10/1,
              PAZARCIK/KAHRAMANMARAŞ
            </p>
          </div>
        </Container>
      </Section>

      {/* Sosyal Medya */}
      <Section background="green" padding="xl">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-6">
              Sosyal Medyada Takip Edin
            </h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Güncel haberlerimizi ve gelişmelerimizi sosyal medya
              hesaplarımızdan takip edebilirsiniz.
            </p>
            <div className="flex justify-center space-x-6">
              {contactInfo.socialMedia.facebook && (
                <a
                  href={contactInfo.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                  </svg>
                </a>
              )}
              {contactInfo.socialMedia.twitter && (
                <a
                  href={contactInfo.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                  </svg>
                </a>
              )}
              {contactInfo.socialMedia.instagram && (
                <a
                  href={contactInfo.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-7.83 1.297c-2.026 0-3.323 1.297-3.323 3.323s1.297 3.323 3.323 3.323 3.323-1.297 3.323-3.323-1.297-3.323-3.323-3.323z" />
                  </svg>
                </a>
              )}
              {contactInfo.socialMedia.linkedin && (
                <a
                  href={contactInfo.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors duration-200"
                >
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                </a>
              )}
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
