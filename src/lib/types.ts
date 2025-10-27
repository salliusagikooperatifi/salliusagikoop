// Temel veri tipleri

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  category: ProjectCategory;
  subcategory?: string;
  images: string[];
  status: "active" | "planning" | "completed" | "paused";
  startDate?: string;
  endDate?: string;
  budget?: number;
  location?: string;
  features: string[];
  benefits: string[];
  gallery?: string[];
  documents?: Document[];
  createdAt: string;
  updatedAt: string;
}

export type ProjectCategory =
  | "ozel-agaclandirma"
  | "hayvansal-uretim"
  | "bitkisel-uretim"
  | "tarimsal-sanayi"
  | "el-sanatlari-hali-kilim"
  | "egitim-spor-merkezi";

export interface ProjectSubcategory {
  id: string;
  name: string;
  slug: string;
  category: ProjectCategory;
  description: string;
  projects: Project[];
}

export interface Member {
  id: string;
  name: string;
  surname: string;
  fullName: string;
  position: string;
  department?: string;
  email?: string;
  phone?: string;
  avatar?: string;
  bio?: string;
  joinDate: string;
  isActive: boolean;
  role: "member" | "board" | "audit" | "admin";
}

export interface BoardMember extends Member {
  position: string;
  order: number;
  responsibilities: string[];
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  featuredImage?: string;
  images?: string[];
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
}

export interface Announcement {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  isImportant: boolean;
  isPublished: boolean;
  attachments?: Document[];
}

export interface Document {
  id: string;
  name: string;
  url: string;
  type: "pdf" | "doc" | "docx" | "xls" | "xlsx" | "image" | "other";
  size: number;
  uploadedAt: string;
}

export interface ContactInfo {
  address: {
    street: string;
    district: string;
    city: string;
    postalCode: string;
    country: string;
  };
  coordinates: {
    lat: number;
    lng: number;
  };
  phone: {
    primary: string;
    secondary?: string;
    fax?: string;
  };
  email: {
    primary: string;
    info?: string;
    support?: string;
  };
  socialMedia: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  workingHours: {
    weekdays: string;
    saturday?: string;
    sunday?: string;
  };
}

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  ogImage?: string;
  canonical?: string;
}

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrent?: boolean;
}

export interface FilterOption {
  value: string;
  label: string;
  count?: number;
}

export interface PaginationData {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface AdminUser {
  id: string;
  username: string;
  email: string;
  role: "admin" | "editor" | "viewer";
  isActive: boolean;
  lastLogin?: string;
  createdAt: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  type: "project" | "news" | "announcement" | "member";
  slug: string;
  excerpt: string;
  publishedAt: string;
}
