import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { mockBoardMembers, mockAuditMembers } from "@/lib/mockData";
import { BreadcrumbItem } from "@/lib/types";

export default function ManagementPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Yönetim", href: "/yonetim", isCurrent: true },
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
      <Section background="white" padding="xl">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Yönetim
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Kooperatifimizin yönetim yapısı ve sorumlulukları. Deneyimli
              yönetim kurulumuz ve denetim kurulumuz ile şeffaf ve etkin yönetim
              anlayışını benimsiyoruz.
            </p>
          </div>
        </Container>
      </Section>

      {/* Yönetim Kurulu */}
      <Section background="white" padding="xl">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Yönetim Kurulu
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kooperatifimizin günlük işleyişini yöneten ve stratejik kararları
              alan yönetim kurulu üyelerimiz
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ad Soyad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ünvan
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockBoardMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {member.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.position}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Denetim Kurulu */}
      <Section background="gray" padding="xl">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Denetim Kurulu
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kooperatifimizin mali ve idari işlerini denetleyen bağımsız
              denetim kurulu üyelerimiz
            </p>
          </div>

          <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ad Soyad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ünvan
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockAuditMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {member.fullName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {member.position}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Yönetim Yapısı */}
      <Section background="white" padding="xl">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Yönetim Yapısı
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kooperatifimizin organizasyon yapısı ve sorumluluk dağılımı
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Yönetim Kurulu Sorumlulukları
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0"
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
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Stratejik Planlama
                    </h4>
                    <p className="text-gray-600">
                      Kooperatifin uzun vadeli stratejilerini belirleme
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0"
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
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Mali Yönetim
                    </h4>
                    <p className="text-gray-600">
                      Bütçe planlama ve mali işlerin yönetimi
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0"
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
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Proje Yönetimi
                    </h4>
                    <p className="text-gray-600">
                      Yeni projelerin planlanması ve yürütülmesi
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-green-600 mr-3 mt-1 flex-shrink-0"
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
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Üye İlişkileri
                    </h4>
                    <p className="text-gray-600">
                      Üyelerle iletişim ve koordinasyon
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Denetim Kurulu Sorumlulukları
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0"
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
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Mali Denetim
                    </h4>
                    <p className="text-gray-600">
                      Mali işlerin ve hesapların denetimi
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0"
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
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Uyum Kontrolü
                    </h4>
                    <p className="text-gray-600">Mevzuata uygunluk kontrolü</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0"
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
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Risk Yönetimi
                    </h4>
                    <p className="text-gray-600">
                      Risk değerlendirme ve öneriler
                    </p>
                  </div>
                </li>
                <li className="flex items-start">
                  <svg
                    className="w-6 h-6 text-purple-600 mr-3 mt-1 flex-shrink-0"
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
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Raporlama
                    </h4>
                    <p className="text-gray-600">
                      Denetim raporlarının hazırlanması
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Toplantı Takvimi */}
      {/*
      <Section background="gray" padding="xl">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Toplantı Takvimi
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Yönetim kurulu ve genel kurul toplantılarımızın takvimi
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Yönetim Kurulu Toplantıları
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Aylık Toplantı
                    </h4>
                    <p className="text-sm text-gray-600">
                      Her ayın ilk haftası
                    </p>
                  </div>
                  <div className="text-green-600 font-semibold">Aktif</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Olağanüstü Toplantı
                    </h4>
                    <p className="text-sm text-gray-600">Gerektiğinde</p>
                  </div>
                  <div className="text-blue-600 font-semibold">
                    Gerektiğinde
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                Genel Kurul Toplantıları
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Yıllık Genel Kurul
                    </h4>
                    <p className="text-sm text-gray-600">Mart ayında</p>
                  </div>
                  <div className="text-yellow-600 font-semibold">Yıllık</div>
                </div>
                <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-900">
                      Olağanüstü Genel Kurul
                    </h4>
                    <p className="text-sm text-gray-600">Gerektiğinde</p>
                  </div>
                  <div className="text-purple-600 font-semibold">
                    Gerektiğinde
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>
      */}
    </div>
  );
}
