import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import { BreadcrumbItem, ProjectCategory } from "@/lib/types";

const categories: {
  value: ProjectCategory;
  label: string;
  description: string;
}[] = [
  {
    value: "ozel-agaclandirma",
    label: "Özel Ağaçlandırma",
    description: "Sürdürülebilir orman yönetimi ve çevre koruma projeleri",
  },
  {
    value: "hayvansal-uretim",
    label: "Hayvansal Üretim",
    description: "Büyükbaş ve küçükbaş hayvan üretim projeleri",
  },
  {
    value: "bitkisel-uretim",
    label: "Bitkisel Üretim",
    description: "Seracılık ve meyve bahçesi projeleri",
  },
  {
    value: "tarimsal-sanayi",
    label: "Tarımsal Sanayi",
    description: "Süt toplama, zeytinyağı ve fıstık işleme tesisleri",
  },
  {
    value: "el-sanatlari-hali-kilim",
    label: "El Sanatları Halı-Kilim",
    description: "Halı, kilim ve geleneksel el sanatları üretimi",
  },
  {
    value: "egitim-spor-merkezi",
    label: "Eğitim ve Spor Merkezi",
    description: "Eğitim ve spor merkezi projeleri",
  },
];

export default function CategoriesIndexPage() {
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Projelerimiz", href: "/projeler" },
    { label: "Kategoriler", href: "/projeler/kategori", isCurrent: true },
  ];

  return (
    <div className="min-h-screen">
      <Section background="gray" padding="sm">
        <Container>
          <Breadcrumbs items={breadcrumbItems} />
        </Container>
      </Section>

      <Section background="white" padding="lg">
        <Container>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Proje Kategorileri
          </h1>
          <p className="text-gray-600 max-w-3xl">
            Projelerimizi 6 ana kategori altında topladık. Bir kategoriyi
            seçerek o alandaki projelerimizi inceleyebilirsiniz.
          </p>
        </Container>
      </Section>

      <Section background="gray" padding="xl">
        <Container>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((cat) => (
              <Link
                key={cat.value}
                href={`/projeler/kategori/${cat.value}`}
                className="group bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 border border-transparent hover:border-green-200"
              >
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-green-700">
                  {cat.label}
                </h3>
                <p className="text-gray-600">{cat.description}</p>
                <span className="inline-flex items-center text-green-700 text-sm font-medium mt-4">
                  Kategoriyi Gör
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
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </Section>
    </div>
  );
}
