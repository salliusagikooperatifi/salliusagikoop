import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard = ({ project, className = "" }: ProjectCardProps) => {
  const statusColors = {
    active: "bg-green-100 text-green-800",
    planning: "bg-yellow-100 text-yellow-800",
    completed: "bg-blue-100 text-blue-800",
    paused: "bg-gray-100 text-gray-800",
  };

  const statusLabels = {
    active: "Aktif",
    planning: "Planlama",
    completed: "Tamamlandı",
    paused: "Duraklatıldı",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      {/* Proje Görseli */}
      <div className="relative h-48 w-full">
        <Image
          src={project.images?.[0] || "/images/no-image.png"}
          alt={project.title}
          fill
          className="object-cover"
        />
        <div className="absolute top-4 right-4">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              statusColors[project.status]
            }`}
          >
            {statusLabels[project.status]}
          </span>
        </div>
      </div>

      {/* Proje İçeriği */}
      <div className="p-6">
        <div className="mb-2">
          <h3 className="text-xl font-semibold text-gray-900 mb-2 line-clamp-2">
            {project.title}
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">
            {project.shortDescription}
          </p>
        </div>

        {/* Proje Detayları */}
        <div className="space-y-2 mb-4">
          {project.location && (
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-2"
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
              {project.location}
            </div>
          )}
          {project.budget && (
            <div className="flex items-center text-sm text-gray-500">
              <svg
                className="w-4 h-4 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
              {project.budget.toLocaleString("tr-TR")} TL
            </div>
          )}
        </div>

        {/* Özellikler */}
        {project.features && project.features.length > 0 && (
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {project.features.slice(0, 3).map((feature, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full"
                >
                  {feature}
                </span>
              ))}
              {project.features.length > 3 && (
                <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                  +{project.features.length - 3} daha
                </span>
              )}
            </div>
          </div>
        )}

        {/* Detay Butonu */}
        <Link
          href={`/projeler/${project.slug}`}
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white text-sm font-medium rounded-md hover:bg-green-700 transition-colors duration-200"
        >
          Detayları Gör
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
