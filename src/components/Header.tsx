"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [expandedMobileMenus, setExpandedMobileMenus] = useState<
    Record<string, boolean>
  >({});
  const pathname = usePathname();

  const navigation = [
    { name: "Anasayfa", href: "/" },
    { name: "Hakkımızda", href: "/hakkimizda" },
    {
      name: "Projelerimiz",
      href: "/projeler",
      submenu: [
        {
          name: "Özel Ağaçlandırma Projesi",
          href: "/projeler/kategori/ozel-agaclandirma",
        },
        {
          name: "Hayvansal Üretim Projeleri",
          href: "/projeler/kategori/hayvansal-uretim",
          children: [
            {
              name: "Büyükbaş Süt",
              href: "/projeler/kategori/hayvansal-uretim?alt=buyukbas-sut",
            },
            {
              name: "Büyükbaş Besi",
              href: "/projeler/kategori/hayvansal-uretim?alt=buyukbas-besi",
            },
            {
              name: "Küçükbaş",
              href: "/projeler/kategori/hayvansal-uretim?alt=kucukbas",
            },
          ],
        },
        {
          name: "Bitkisel Üretim Projeleri",
          href: "/projeler/kategori/bitkisel-uretim",
          children: [
            {
              name: "Seracılık",
              href: "/projeler/kategori/bitkisel-uretim?alt=seracilik",
            },
            {
              name: "Meyve Bahçesi",
              href: "/projeler/kategori/bitkisel-uretim?alt=meyve-bahcesi",
            },
          ],
        },
        {
          name: "Tarımsal Sanayi Projeleri",
          href: "/projeler/kategori/tarimsal-sanayi",
          children: [
            {
              name: "Süt Toplama ve Soğutma Merkezi",
              href: "/projeler/kategori/tarimsal-sanayi?alt=sut-toplama-ve-sogutma-merkezi",
            },
            {
              name: "Zeytinyağı Üretim Tesisi",
              href: "/projeler/kategori/tarimsal-sanayi?alt=zeytinyagi-uretim-tesisi",
            },
            {
              name: "Fıstık Çıtlatma ve Paketleme Tesisi",
              href: "/projeler/kategori/tarimsal-sanayi?alt=fistik-citlatma-ve-paketleme-tesisi",
            },
          ],
        },
        {
          name: "El Sanatları Halı-Kilim Üretim Projeleri",
          href: "/projeler/kategori/el-sanatlari-hali-kilim",
          children: [
            {
              name: "El Sanatları Üretim Merkezi",
              href: "/projeler/kategori/el-sanatlari-hali-kilim?alt=el-sanatlari-uretim-merkezi",
            },
          ],
        },
        {
          name: "Eğitim ve Spor Merkezi Projeleri",
          href: "/projeler/kategori/egitim-spor-merkezi",
        },
      ],
    },
    { name: "Üyelerimiz", href: "/uyelerimiz" },
    { name: "Yönetim", href: "/yonetim" },
    { name: "Duyurular", href: "/duyurular" },
    { name: "Haberler", href: "/haberler" },
    { name: "İletişim", href: "/iletisim" },
  ];

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="shrink-0">
            <Link href="/" className="flex items-center">
              <div className="h-10 w-10 bg-linear-to-r from-green-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">Ş</span>
              </div>
              <div className="ml-3">
                <h1 className="text-xl font-bold text-gray-900">
                  Şallıuşağı Kooperatifi
                </h1>
                <p className="text-sm text-gray-600">Üretim ve Pazarlama</p>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className={`px-3 py-2 text-sm font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? "text-green-600"
                      : "text-gray-700 hover:text-green-600"
                  }`}
                >
                  {item.name}
                </Link>
                {item.submenu && (
                  <div className="absolute left-0 mt-2 w-80 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-2">
                      {item.submenu.map((subItem) => (
                        <div key={subItem.name} className="px-2">
                          <Link
                            href={subItem.href}
                            className={`block px-2 py-2 text-sm font-medium rounded ${
                              pathname === subItem.href
                                ? "text-green-600 bg-green-50"
                                : "text-gray-800 hover:bg-green-50 hover:text-green-700"
                            }`}
                          >
                            {subItem.name}
                          </Link>
                          {subItem.children && (
                            <div className="pl-4 pb-2">
                              {subItem.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className={`block px-2 py-1 text-sm rounded ${
                                    pathname === child.href
                                      ? "text-green-600 bg-green-50"
                                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                                  }`}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-green-600 focus:outline-none focus:text-green-600"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden max-h-[calc(100vh-64px)] overflow-y-auto overscroll-contain">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="border-b last:border-b-0 border-gray-100"
                >
                  <div className="flex items-center justify-between">
                    <Link
                      href={item.href}
                      className={`flex-1 px-3 py-3 text-base font-medium transition-colors duration-200 ${
                        pathname === item.href
                          ? "text-green-600"
                          : "text-gray-800 hover:text-green-600"
                      }`}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </Link>

                    {item.submenu && (
                      <button
                        aria-label={`${item.name} menüsünü ${
                          expandedMobileMenus[item.name] ? "kapat" : "aç"
                        }`}
                        onClick={() =>
                          setExpandedMobileMenus((prev) => ({
                            ...prev,
                            [item.name]: !prev[item.name],
                          }))
                        }
                        className="p-2 text-gray-700 hover:text-green-600"
                      >
                        <svg
                          className={`h-5 w-5 transition-transform duration-200 ${
                            expandedMobileMenus[item.name]
                              ? "rotate-180"
                              : "rotate-0"
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {item.submenu && expandedMobileMenus[item.name] && (
                    <div className="pl-3 pb-3 space-y-1">
                      {item.submenu.map((subItem) => (
                        <div key={subItem.name}>
                          <Link
                            href={subItem.href}
                            className={`block px-3 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                              pathname === subItem.href
                                ? "text-green-600 bg-green-50"
                                : "text-gray-800 hover:bg-green-50 hover:text-green-700"
                            }`}
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                          {subItem.children && (
                            <div className="pl-3">
                              {subItem.children.map((child) => (
                                <Link
                                  key={child.name}
                                  href={child.href}
                                  className={`block px-3 py-1 text-sm rounded transition-colors duration-200 ${
                                    pathname === child.href
                                      ? "text-green-600 bg-green-50"
                                      : "text-gray-700 hover:bg-green-50 hover:text-green-700"
                                  }`}
                                  onClick={() => setIsMenuOpen(false)}
                                >
                                  {child.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
