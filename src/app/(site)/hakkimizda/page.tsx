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
      <Section background="white" padding="xl">
        <Container>
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Hakkımızda
            </h1>
            <p className="text-xl text-gray-600 leading-relaxed">
              Şallıuşağı Üretim ve Pazarlama Kooperatifi olarak, bölgemizde
              sürdürülebilir tarım ve üretim faaliyetlerini destekleyerek,
              üyelerimizin refahını artırmayı ve toplumsal kalkınmaya katkıda
              bulunmayı hedefliyoruz.
            </p>
          </div>
        </Container>
      </Section>

      {/* Misyon */}
      <Section
        background="green"
        padding="xl"
        id="misyon"
        className="bg-green-300"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Misyonumuz
              </h2>
              <p className="text-xl text-white leading-relaxed mb-6">
                Bölgemizdeki üreticilerin bir araya gelerek güç birliği
                yapmasını sağlamak, modern tarım tekniklerini yaygınlaştırmak ve
                ürünlerin değerli fiyatlarla pazarlanmasını sağlamak.
              </p>
              <ul className="space-y-3 text-white">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-300 mr-3"
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
                  Üreticilerin güç birliği yapmasını sağlamak
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-300 mr-3"
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
                  Modern tarım tekniklerini yaygınlaştırmak
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-300 mr-3"
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
                  Ürünlerin değerli fiyatlarla pazarlanmasını sağlamak
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-300 mr-3"
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
                  Sürdürülebilir üretim modellerini desteklemek
                </li>
              </ul>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
              <div className="text-center">
                <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg
                    className="w-12 h-12 text-white"
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
                <h3 className="text-2xl font-bold text-white mb-4">
                  Güç Birliği
                </h3>
                <p className="text-white/90">
                  Birlikte daha güçlüyüz. Kooperatifimiz sayesinde
                  üreticilerimiz tek başlarına yapamayacakları işleri birlikte
                  gerçekleştiriyor.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Vizyon */}
      <Section
        background="blue"
        padding="xl"
        id="vizyon"
        className="bg-blue-300"
      >
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8">
                <div className="text-center">
                  <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg
                      className="w-12 h-12 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4">
                    Gelecek Vizyonu
                  </h3>
                  <p className="text-white/90">
                    Sürdürülebilir tarım ve üretim faaliyetleri ile bölgemizin
                    ekonomik kalkınmasına öncülük etmeyi hedefliyoruz.
                  </p>
                </div>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Vizyonumuz
              </h2>
              <p className="text-xl text-white leading-relaxed mb-6">
                Sürdürülebilir tarım ve üretim faaliyetleri ile bölgemizin
                ekonomik kalkınmasına öncülük etmek, üyelerimizin refahını
                artırmak ve gelecek nesillere daha yaşanabilir bir çevre
                bırakmak.
              </p>
              <ul className="space-y-3 text-white">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-300 mr-3"
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
                  Bölgesel ekonomik kalkınmaya öncülük etmek
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-300 mr-3"
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
                  Üyelerimizin refahını artırmak
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-300 mr-3"
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
                  Gelecek nesillere yaşanabilir çevre bırakmak
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-blue-300 mr-3"
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
                  İnovatif üretim modellerini geliştirmek
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Tarihçe */}
      <Section background="white" padding="xl" id="tarihce">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Tarihçemiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kooperatifimizin kuruluşundan bugüne kadar olan yolculuğumuz
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-green-200"></div>

            <div className="space-y-12">
              {/* 2020 - Kuruluş */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      2020 - Kuruluş
                    </h3>
                    <p className="text-gray-600">
                      Şallıuşağı Üretim ve Pazarlama Kooperatifi, bölgedeki
                      üreticilerin bir araya gelmesiyle kuruldu. İlk
                      yıllarımızda temel altyapı çalışmalarına odaklandık.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-green-600 rounded-full border-4 border-white"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* 2021 - İlk Projeler */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      2021 - İlk Projeler
                    </h3>
                    <p className="text-gray-600">
                      Hayvansal üretim projelerimizi hayata geçirdik. Süt
                      toplama merkezi kurulumu ve üretici eğitimleri başladı.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2022 - Genişleme */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      2022 - Genişleme
                    </h3>
                    <p className="text-gray-600">
                      Bitkisel üretim projelerimizi başlattık. Seracılık ve
                      meyve bahçesi projeleri ile üretim çeşitliliğimizi
                      artırdık.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-yellow-600 rounded-full border-4 border-white"></div>
                <div className="w-1/2 pl-8"></div>
              </div>

              {/* 2023 - Sanayi Yatırımları */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8"></div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-purple-600 rounded-full border-4 border-white"></div>
                <div className="w-1/2 pl-8">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      2023 - Sanayi Yatırımları
                    </h3>
                    <p className="text-gray-600">
                      Zeytinyağı üretim tesisi ve fıstık çıtlatma tesisimizi
                      kurduk. Tarımsal sanayi alanında büyük adımlar attık.
                    </p>
                  </div>
                </div>
              </div>

              {/* 2024 - Gelecek Planları */}
              <div className="relative flex items-center">
                <div className="w-1/2 pr-8 text-right">
                  <div className="bg-white p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      2024 - Gelecek Planları
                    </h3>
                    <p className="text-gray-600">
                      Eğitim ve spor merkezi projemizi başlatıyoruz.
                      Ağaçlandırma projelerimizle çevreye katkı sağlamaya devam
                      ediyoruz.
                    </p>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-red-600 rounded-full border-4 border-white"></div>
                <div className="w-1/2 pl-8"></div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Değerlerimiz */}
      <Section background="gray" padding="xl" id="degerler">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Değerlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Kooperatifimizin temel değerleri ve ilkeleri
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
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
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Sürdürülebilirlik
              </h3>
              <p className="text-gray-600">
                Çevreye saygılı, gelecek nesillere yaşanabilir bir dünya
                bırakacak üretim modellerini benimsiyoruz.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-blue-600"
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Dayanışma
              </h3>
              <p className="text-gray-600">
                Üyelerimiz arasında güçlü dayanışma ve işbirliği ruhunu
                geliştiriyor, birlikte büyüyoruz.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-yellow-600"
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">Kalite</h3>
              <p className="text-gray-600">
                Üretimimizde en yüksek kalite standartlarını benimsiyor, müşteri
                memnuniyetini ön planda tutuyoruz.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-purple-600"
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                İnovasyon
              </h3>
              <p className="text-gray-600">
                Modern teknolojileri takip ediyor, sürekli gelişim ve
                yenilikçilik anlayışını benimsiyoruz.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Şeffaflık
              </h3>
              <p className="text-gray-600">
                Tüm faaliyetlerimizde şeffaflık ilkesini benimsiyor,
                üyelerimizle açık iletişim kuruyoruz.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-md text-center hover:shadow-lg transition-shadow duration-300">
              <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg
                  className="w-8 h-8 text-indigo-600"
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
              <h3 className="text-xl font-bold text-gray-900 mb-4">Eğitim</h3>
              <p className="text-gray-600">
                Üyelerimizin sürekli eğitimini destekliyor, bilgi ve deneyim
                paylaşımını teşvik ediyoruz.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* İstatistikler */}
      {/* }
      <Section background="white" padding="xl">
        <Container>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Rakamlarla Kooperatifimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Başarılarımızı rakamlarla gösteriyoruz
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">
                50+
              </div>
              <div className="text-gray-600 font-medium">Aktif Üye</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-blue-600 mb-2">
                6
              </div>
              <div className="text-gray-600 font-medium">Aktif Proje</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-yellow-600 mb-2">
                15M+
              </div>
              <div className="text-gray-600 font-medium">TL Yatırım</div>
            </div>
            <div className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">
                5
              </div>
              <div className="text-gray-600 font-medium">Yıllık Deneyim</div>
            </div>
          </div>
        </Container>
      </Section>
      */}
    </div>
  );
}
