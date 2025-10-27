import Link from "next/link";
import Image from "next/image";
import { NewsItem } from "@/lib/types";

interface NewsCardProps {
  news: NewsItem;
  className?: string;
  variant?: "default" | "featured" | "compact";
}

const NewsCard = ({
  news,
  className = "",
  variant = "default",
}: NewsCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (variant === "compact") {
    return (
      <div
        className={`bg-white rounded-lg shadow-sm border border-gray-200 p-4 hover:shadow-md transition-shadow duration-200 ${className}`}
      >
        <div className="flex space-x-4">
          {news.featuredImage && (
            <div className="relative w-20 h-20 flex-shrink-0">
              <Image
                src={news.featuredImage}
                alt={news.title}
                fill
                className="object-cover rounded-md"
              />
            </div>
          )}
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
              <Link
                href={`/haberler/${news.slug}`}
                className="hover:text-green-600 transition-colors"
              >
                {news.title}
              </Link>
            </h3>
            <p className="text-xs text-gray-500 mb-2">
              {formatDate(news.publishedAt)} • {news.views} görüntülenme
            </p>
            <p className="text-xs text-gray-600 line-clamp-2">{news.excerpt}</p>
          </div>
        </div>
      </div>
    );
  }

  if (variant === "featured") {
    return (
      <div
        className={`bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ${className}`}
      >
        <div className="relative h-64 w-full">
          <Image
            src={news.featuredImage || "/images/no-image.png"}
            alt={news.title}
            fill
            className="object-cover"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-green-600 text-white text-sm font-medium rounded-full">
              Öne Çıkan
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="mb-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-3 line-clamp-2">
              <Link
                href={`/haberler/${news.slug}`}
                className="hover:text-green-600 transition-colors"
              >
                {news.title}
              </Link>
            </h2>
            <p className="text-gray-600 line-clamp-3 mb-4">{news.excerpt}</p>
          </div>
          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-4">
              <span>{news.author}</span>
              <span>•</span>
              <span>{formatDate(news.publishedAt)}</span>
              <span>•</span>
              <span>{news.views} görüntülenme</span>
            </div>
            <Link
              href={`/haberler/${news.slug}`}
              className="text-green-600 hover:text-green-700 font-medium"
            >
              Devamını Oku →
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      <div className="relative h-48 w-full">
        <Image
          src={news.featuredImage || "/images/no-image.png"}
          alt={news.title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-6">
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
            <Link
              href={`/haberler/${news.slug}`}
              className="hover:text-green-600 transition-colors"
            >
              {news.title}
            </Link>
          </h3>
          <p className="text-gray-600 text-sm line-clamp-3">{news.excerpt}</p>
        </div>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <span>{news.author}</span>
            <span>•</span>
            <span>{formatDate(news.publishedAt)}</span>
          </div>
          <span>{news.views} görüntülenme</span>
        </div>
        {news.tags && news.tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1">
            {news.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsCard;
