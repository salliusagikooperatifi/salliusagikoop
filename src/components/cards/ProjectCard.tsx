import Link from "next/link";
import Image from "next/image";
import { Project } from "@/lib/types";

interface ProjectCardProps {
  project: Project;
  className?: string;
}

const ProjectCard = ({ project, className = "" }: ProjectCardProps) => {
  return (
    <div
      className={`group bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden h-[360px] w-full ${className}`}
    >
      {/* Görsel */}
      <div className="relative h-48 w-full shrink-0">
        <Image
          src={project.images?.[0] || "/images/no-image.png"}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
        />
      </div>

      {/* İçerik */}
      <div className="flex flex-col flex-1 p-6 justify-between">
        {/* Başlık */}
        <div>
          <h3 className="text-xl font-semibold text-gray-900 line-clamp-2">
            {project.title}
          </h3>
        </div>

        {/* Buton */}
        <div className="flex justify-end mt-4">
          <Link
            href={`/projeler/${project.slug}`}
            className="inline-flex items-center border border-green-600 text-green-600 font-medium text-sm px-4 py-2 rounded-md hover:bg-green-50 transition-colors duration-200"
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
    </div>
  );
};

export default ProjectCard;
