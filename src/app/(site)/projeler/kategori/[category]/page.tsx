import { notFound } from "next/navigation";
import Link from "next/link";
import Container from "@/components/Container";
import Section from "@/components/Section";
import Breadcrumbs from "@/components/Breadcrumbs";
import ProjectCard from "@/components/cards/ProjectCard";
import { mockProjects } from "@/lib/mockData";
import { BreadcrumbItem, ProjectCategory } from "@/lib/types";

const categoryLabels: Record<ProjectCategory, string> = {
  "ozel-agaclandirma": "Özel Ağaçlandırma",
  "hayvansal-uretim": "Hayvansal Üretim",
  "bitkisel-uretim": "Bitkisel Üretim",
  "tarimsal-sanayi": "Tarımsal Sanayi",
  "el-sanatlari-hali-kilim": "El Sanatları Halı-Kilim",
  "egitim-spor-merkezi": "Eğitim ve Spor Merkezi",
};

interface CategoryPageProps {
  params: { category: string };
  searchParams?: { [key: string]: string | string[] | undefined };
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ı/g, "i")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

const subcategoryMap: Partial<Record<ProjectCategory, string[]>> = {
  "hayvansal-uretim": ["Büyükbaş Süt", "Büyükbaş Besi", "Küçükbaş"],
  "bitkisel-uretim": ["Seracılık", "Meyve Bahçesi"],
  "tarimsal-sanayi": [
    "Süt Toplama ve Soğutma Merkezi",
    "Zeytinyağı Üretim Tesisi",
    "Fıstık Çıtlatma ve Paketleme Tesisi",
  ],
  "el-sanatlari-hali-kilim": ["El Sanatları Üretim Merkezi"],
};

export default function CategoryPage({
  params,
  searchParams,
}: CategoryPageProps) {
  const category = params.category as ProjectCategory;

  if (!Object.keys(categoryLabels).includes(category)) {
    notFound();
  }

  const projects = mockProjects.filter((p) => p.category === category);

  const definedSubcategories = subcategoryMap[category] || [];
  const subcategoryOptions = definedSubcategories.map((label) => ({
    label,
    value: slugify(label),
    count: projects.filter(
      (p) => slugify(p.subcategory || "") === slugify(label)
    ).length,
  }));

  const selectedSub =
    typeof searchParams?.alt === "string" ? searchParams?.alt : undefined;
  const activeSubOption = subcategoryOptions.find(
    (s) => s.value === selectedSub
  );

  const visibleProjects = selectedSub
    ? projects.filter((p) => slugify(p.subcategory || "") === selectedSub)
    : projects;

  const breadcrumbItems: BreadcrumbItem[] = [
    { label: "Anasayfa", href: "/" },
    { label: "Projelerimiz", href: "/projeler" },
    { label: "Kategoriler", href: "/projeler/kategori" },
    activeSubOption
      ? {
          label: categoryLabels[category],
          href: `/projeler/kategori/${category}`,
        }
      : {
          label: categoryLabels[category],
          href: `/projeler/kategori/${category}`,
          isCurrent: true,
        },
    ...(activeSubOption
      ? [
          {
            label: activeSubOption.label,
            href: `/projeler/kategori/${category}?alt=${activeSubOption.value}`,
            isCurrent: true,
          },
        ]
      : []),
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
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {categoryLabels[category]}
              </h1>
              <p className="text-gray-600">
                {activeSubOption ? (
                  <>
                    {activeSubOption.label} alt başlığında{" "}
                    {visibleProjects.length} proje bulundu.
                  </>
                ) : (
                  <>Bu kategoride toplam {projects.length} proje bulundu.</>
                )}
              </p>
            </div>
            <Link
              href="/projeler/kategori"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-800 text-sm font-medium rounded-md hover:bg-gray-200 transition-colors duration-200"
            >
              Tüm Kategoriler
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14M12 5l7 7-7 7"
                />
              </svg>
            </Link>
          </div>
        </Container>
      </Section>

      {/* Alt başlıklar (varsa) */}
      {subcategoryOptions.length > 0 && (
        <Section background="white" padding="lg">
          <Container>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/projeler/kategori/${category}`}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  !activeSubOption
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                Tümü ({projects.length})
              </Link>
              {subcategoryOptions.map((opt) => (
                <Link
                  key={opt.value}
                  href={`/projeler/kategori/${category}?alt=${opt.value}`}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    activeSubOption?.value === opt.value
                      ? "bg-green-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {opt.label} ({opt.count})
                </Link>
              ))}
            </div>
          </Container>
        </Section>
      )}

      <Section background="gray" padding="xl">
        <Container>
          {visibleProjects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {visibleProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                Henüz proje bulunmuyor
              </h2>
              <p className="text-gray-600">
                Yakında bu kategoride projeler yayınlanacak.
              </p>
            </div>
          )}
        </Container>
      </Section>
    </div>
  );
}
