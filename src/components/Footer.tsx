import Link from "next/link";
import { contactInfo } from "@/lib/mockData";
import Image from "next/image";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    Hakkımızda: [
      { name: "Misyonumuz", href: "/hakkimizda#misyon" },
      { name: "Vizyonumuz", href: "/hakkimizda#vizyon" },
      { name: "Tarihçe", href: "/hakkimizda#tarihce" },
      { name: "Değerlerimiz", href: "/hakkimizda#degerler" },
    ],
    Projelerimiz: [
      { name: "Özel Ağaçlandırma", href: "/projeler/ozel-agaclandirma" },
      { name: "Hayvansal Üretim", href: "/projeler/hayvansal-uretim" },
      { name: "Bitkisel Üretim", href: "/projeler/bitkisel-uretim" },
      { name: "Tarımsal Sanayi", href: "/projeler/tarimsal-sanayi" },
      { name: "El Sanatları", href: "/projeler/el-sanatlari-hali-kilim" },
      { name: "Eğitim ve Spor", href: "/projeler/egitim-spor-merkezi" },
    ],
    Sayfalar: [
      { name: "Üyelerimiz", href: "/uyelerimiz" },
      { name: "Yönetim", href: "/yonetim" },
      { name: "Duyurular", href: "/duyurular" },
      { name: "Haberler", href: "/haberler" },
      { name: "İletişim", href: "/iletisim" },
    ],
    "İletişim Bilgileri": [
      { name: "Adres", href: "#", type: "address" },
      { name: "E-posta", href: "#", type: "email" },
      { name: "Telefon", href: "#", type: "phone" },
    ],
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Logo ve Açıklama */}
          <div>
            {/* Logo */}
            <div className="shrink-0 mb-4">
              <Link href="/" className="flex items-center">
                <div className="relative h-14 w-14 overflow-hidden rounded-lg">
                  <Image
                    src="/images/logo/logo.avif"
                    alt="Şallıuşağı Üretim ve Pazarlama Kooperatifi Logo"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <div className="ml-3">
                  <div className="w-fit">
                    <h1 className="block w-full text-xl font-bold text-white">
                      Ş a l l ı u ş a ğ ı
                    </h1>
                    <p className="block w-full text-xs text-white">
                      Üretim ve Pazarlama Kooperatifi
                    </p>
                  </div>
                </div>
              </Link>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Sürdürülebilir tarım ve üretim faaliyetleriyle bölgesel kalkınmaya
              katkı sağlayan bir kooperatifiz.
            </p>
            {/* Sosyal Medya */}
            <div className="flex space-x-4">
              {contactInfo.socialMedia.facebook && (
                <a
                  href={contactInfo.socialMedia.facebook}
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Facebook</span>
                  <svg
                    className="h-5 w-5"
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
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Twitter</span>
                  <svg
                    className="h-5 w-5"
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
                  className="text-gray-400 hover:text-white transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">Instagram</span>
                  <svg
                    className="h-5 w-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987s11.987-5.367 11.987-11.987C24.014 5.367 18.647.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.708 13.744 3.708 12.447s.49-2.448 1.297-3.323c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.807.875 1.297 2.026 1.297 3.323s-.49 2.448-1.297 3.323c-.875.807-2.026 1.297-3.323 1.297zm7.83-9.281c-.49 0-.875-.385-.875-.875s.385-.875.875-.875.875.385.875.875-.385.875-.875.875zm-7.83 1.297c-2.026 0-3.323 1.297-3.323 3.323s1.297 3.323 3.323 3.323 3.323-1.297 3.323-3.323-1.297-3.323-3.323-3.323z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category} className="col-span-1">
              <h3 className="text-lg font-semibold mb-4">{category}</h3>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.name}>
                    {category === "İletişim Bilgileri" ? (
                      <div className="text-gray-400 text-sm">
                        {"type" in link && link.type === "address" && (
                          <div>
                            <div className="text-gray-400 text-sm">
                              Şehit Nurettin Ademoğlu Mahallesi
                              <br />
                              A.Şevket Özok Caddesi No:10/1
                              <br />
                              PAZARCIK/KAHRAMANMARAŞ
                            </div>
                          </div>
                        )}
                        {"type" in link && link.type === "email" && (
                          <div>
                            <a
                              href="mailto:info@salliusagicoop.com"
                              className="hover:text-white transition-colors text-gray-400 text-sm"
                            >
                              info@salliusagicoop.com
                            </a>
                          </div>
                        )}
                        {"type" in link && link.type === "phone" && (
                          <div>
                            <div className="text-gray-400 text-xs space-y-0.5">
                              <div className="flex flex-wrap">
                                <span className="text-gray-300 text-xs">
                                  İbrahim Çavaş:
                                </span>
                                <a
                                  href="tel:+4915231382552"
                                  className="hover:text-white transition-colors ml-1 text-xs"
                                >
                                  +49 1523 1382552
                                </a>
                              </div>
                              <div className="flex flex-wrap">
                                <span className="text-gray-300 text-xs">
                                  Kasım Şapkur:
                                </span>
                                <a
                                  href="tel:+491711260485"
                                  className="hover:text-white transition-colors ml-1 text-xs"
                                >
                                  +49 171 1260485
                                </a>
                              </div>
                              <div className="flex flex-wrap">
                                <span className="text-gray-300 text-xs">
                                  Ali Oğuz:
                                </span>
                                <a
                                  href="tel:+905457304518"
                                  className="hover:text-white transition-colors ml-1 text-xs"
                                >
                                  +90 545 730 45 18
                                </a>
                              </div>
                              <div className="flex flex-wrap">
                                <span className="text-gray-300 text-xs">
                                  Tahir Çavaş:
                                </span>
                                <a
                                  href="tel:+4917685650986"
                                  className="hover:text-white transition-colors ml-1 text-xs"
                                >
                                  +49 176 85650986
                                </a>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ) : (
                      <Link
                        href={link.href}
                        className="text-gray-400 hover:text-white transition-colors text-sm"
                      >
                        {link.name}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-gray-800 text-right">
          <p className="text-gray-400 text-xs">
            © {currentYear} Şallıuşağı Üretim ve Pazarlama Kooperatifi. Tüm
            hakları saklıdır.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
