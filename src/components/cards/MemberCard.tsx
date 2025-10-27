import Image from "next/image";
import { Member } from "@/lib/types";

interface MemberCardProps {
  member: Member;
  className?: string;
  showDetails?: boolean;
}

const MemberCard = ({
  member,
  className = "",
  showDetails = true,
}: MemberCardProps) => {
  const roleColors = {
    member: "bg-green-100 text-green-800",
    board: "bg-blue-100 text-blue-800",
    audit: "bg-purple-100 text-purple-800",
    admin: "bg-red-100 text-red-800",
  };

  const roleLabels = {
    member: "Üye",
    board: "Yönetim",
    audit: "Denetim",
    admin: "Yönetici",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("tr-TR", {
      year: "numeric",
      month: "long",
    });
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 ${className}`}
    >
      {/* Üye Fotoğrafı */}
      <div className="relative h-48 w-full">
        {member.avatar ? (
          <Image
            src={member.avatar}
            alt={member.fullName}
            fill
            className="object-cover"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center">
            <span className="text-white text-4xl font-bold">
              {member.name.charAt(0)}
              {member.surname.charAt(0)}
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span
            className={`px-2 py-1 rounded-full text-xs font-medium ${
              roleColors[member.role]
            }`}
          >
            {roleLabels[member.role]}
          </span>
        </div>
      </div>

      {/* Üye Bilgileri */}
      <div className="p-6">
        <div className="text-center mb-4">
          <h3 className="text-xl font-semibold text-gray-900 mb-1">
            {member.fullName}
          </h3>
          <p className="text-green-600 font-medium">{member.position}</p>
          {member.department && (
            <p className="text-sm text-gray-600">{member.department}</p>
          )}
        </div>

        {showDetails && (
          <>
            {/* Biyografi */}
            {member.bio && (
              <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                {member.bio}
              </p>
            )}

            {/* İletişim Bilgileri */}
            <div className="space-y-2 mb-4">
              {member.email && (
                <div className="flex items-center text-sm text-gray-600">
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
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <a
                    href={`mailto:${member.email}`}
                    className="hover:text-green-600 transition-colors"
                  >
                    {member.email}
                  </a>
                </div>
              )}
              {member.phone && (
                <div className="flex items-center text-sm text-gray-600">
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
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <a
                    href={`tel:${member.phone}`}
                    className="hover:text-green-600 transition-colors"
                  >
                    {member.phone}
                  </a>
                </div>
              )}
            </div>

            {/* Katılım Tarihi */}
            <div className="text-sm text-gray-500 text-center">
              Üyelik: {formatDate(member.joinDate)}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MemberCard;
