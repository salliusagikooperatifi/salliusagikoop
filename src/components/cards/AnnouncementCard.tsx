import { Announcement } from "@/lib/types";
import { Megaphone } from "lucide-react";

interface AnnouncementCardProps {
  announcement: Announcement;
  className?: string;
}

const AnnouncementCard = ({
  announcement,
  className = "",
}: AnnouncementCardProps) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  // Tüm içeriği göster - HTML etiketlerini temizle
  const cleanContent = (announcement.content || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();

  return (
    <div
      className={`group rounded-xl border border-blue-700 bg-white shadow-md transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-blue-800 ${className}`}
    >
      <div className="p-6">
        <div className="flex items-start gap-4">
          <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 transition-all duration-300 group-hover:scale-110">
            <Megaphone className="size-6 text-blue-600" />
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                {announcement.title}
              </h3>
              {announcement.isImportant && (
                <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full shrink-0">
                  Önemli
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
              <span>{formatDate(announcement.date)}</span>
              {announcement.author && (
                <>
                  <span>·</span>
                  <span>{announcement.author}</span>
                </>
              )}
            </div>
            {cleanContent && (
              <p className="text-gray-700 text-sm whitespace-pre-line">
                {cleanContent}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
