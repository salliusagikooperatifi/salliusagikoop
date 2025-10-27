import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import MemberCard from "@/components/cards/MemberCard";
import { mockMembers } from "@/lib/mockData";
import { BreadcrumbItem } from "@/lib/types";

export default function MembersPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Üyelerimiz", href: "/uyelerimiz", isCurrent: true },
  ];

  const boardMembers = mockMembers.filter((member) => member.role === "board");
  const regularMembers = mockMembers.filter(
    (member) => member.role === "member"
  );

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
              Üyelerimiz
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Kooperatifimizin güçlü üye ailesi. Birlikte büyüyor, birlikte
              gelişiyoruz. Her üyemiz, kooperatifimizin başarısında önemli bir
              rol oynar.
            </p>
          </div>
        </Container>
      </Section>

      {/* İstatistikler */}
      {/* 
      <Section background="green" padding="lg">
        <Container>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {mockMembers.length}
              </div>
              <div className="text-green-100">Toplam Üye</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {boardMembers.length}
              </div>
              <div className="text-green-100">Yönetim Kurulu</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">
                {regularMembers.length}
              </div>
              <div className="text-green-100">Aktif Üye</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold mb-2">5</div>
              <div className="text-green-100">Yıllık Deneyim</div>
            </div>
          </div>
        </Container>
      </Section>
*/}
      {/* Üyeler Listesi */}
      <Section background="gray" padding="xl">
        <Container>
          {/*}
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Üyelerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kooperatifimizin aktif üyeleri
            </p>
          </div>
          */}
          <div className="max-w-md mx-auto bg-white rounded-lg shadow-md overflow-hidden">
            <table className="w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ad Soyad
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {mockMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-center text-sm font-medium text-gray-900">
                      {member.fullName}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Üyelik Bilgileri */}
      <Section background="white" padding="xl">
        <Container>
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Üyelik Koşulları
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kooperatifimize üye olmak için gerekli koşullar ve süreç
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Üyelik Koşulları
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
                      Yaş Koşulu
                    </h4>
                    <p className="text-gray-600">18 yaşını doldurmuş olmak</p>
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
                      İkamet Koşulu
                    </h4>
                    <p className="text-gray-600">
                      Bölgemizde ikamet etmek veya faaliyet göstermek
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
                      Faaliyet Koşulu
                    </h4>
                    <p className="text-gray-600">
                      Tarım, üretim veya ilgili alanlarda faaliyet göstermek
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
                      Mali Koşul
                    </h4>
                    <p className="text-gray-600">
                      Giriş payı ve aidat ödemelerini yapmak
                    </p>
                  </div>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Üyelik Süreci
              </h3>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-sm font-bold">
                    1
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Başvuru
                    </h4>
                    <p className="text-gray-600">
                      Üyelik başvuru formunu doldurun
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-sm font-bold">
                    2
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      İnceleme
                    </h4>
                    <p className="text-gray-600">
                      Yönetim kurulu tarafından değerlendirme
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-sm font-bold">
                    3
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">Onay</h4>
                    <p className="text-gray-600">
                      Genel kurul onayı ile üyelik
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center mr-4 flex-shrink-0 text-sm font-bold">
                    4
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">
                      Aktivasyon
                    </h4>
                    <p className="text-gray-600">
                      Giriş payı ödemesi ve aktivasyon
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="green" padding="xl">
        <Container>
          <div className="text-center text-white">
            <h2 className="text-3xl font-bold mb-6">Kooperatifimize Katılın</h2>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Birlikte daha güçlüyüz. Kooperatifimize üye olarak sürdürülebilir
              kalkınmaya katkıda bulunun ve üretim faaliyetlerinizi geliştirin.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/iletisim"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
              >
                Bilgi Al
              </a>
            </div>
          </div>
        </Container>
      </Section>
    </div>
  );
}
