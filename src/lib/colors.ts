// Şallıuşağı Üretim ve Pazarlama Kooperatifi Renk Paleti
export const colors = {
  // Ana renkler
  primary: {
    50: "#f0f9ff",
    100: "#e0f2fe",
    200: "#bae6fd",
    300: "#7dd3fc",
    400: "#38bdf8",
    500: "#0ea5e9", // Ana mavi
    600: "#0284c7",
    700: "#0369a1",
    800: "#075985",
    900: "#0c4a6e",
  },
  logoColor: {
    primaryLogoColor: "#e41e25",
  },

  // Doğa temalı yeşil tonları
  secondary: {
    50: "#f0fdf4",
    100: "#dcfce7",
    200: "#bbf7d0",
    300: "#86efac",
    400: "#4ade80",
    500: "#22c55e", // Ana yeşil
    600: "#16a34a",
    700: "#15803d",
    800: "#166534",
    900: "#14532d",
  },

  // Toprak tonları
  earth: {
    50: "#fafaf9",
    100: "#f5f5f4",
    200: "#e7e5e4",
    300: "#d6d3d1",
    400: "#a8a29e",
    500: "#78716c", // Ana toprak rengi
    600: "#57534e",
    700: "#44403c",
    800: "#292524",
    900: "#1c1917",
  },

  // Altın tonları (kooperatif teması)
  gold: {
    50: "#fffbeb",
    100: "#fef3c7",
    200: "#fde68a",
    300: "#fcd34d",
    400: "#fbbf24",
    500: "#f59e0b", // Ana altın
    600: "#d97706",
    700: "#b45309",
    800: "#92400e",
    900: "#78350f",
  },

  // Nötr renkler
  gray: {
    50: "#f9fafb",
    100: "#f3f4f6",
    200: "#e5e7eb",
    300: "#d1d5db",
    400: "#9ca3af",
    500: "#6b7280",
    600: "#4b5563",
    700: "#374151",
    800: "#1f2937",
    900: "#111827",
  },

  // Durum renkleri
  success: "#22c55e",
  warning: "#f59e0b",
  error: "#ef4444",
  info: "#3b82f6",

  // Arka plan renkleri
  background: {
    primary: "#ffffff",
    secondary: "#f9fafb",
    tertiary: "#f3f4f6",
  },

  // Metin renkleri
  text: {
    primary: "#111827",
    secondary: "#4b5563",
    tertiary: "#6b7280",
    inverse: "#ffffff",
  },
} as const;

// Tailwind CSS sınıfları için renk tanımları
export const colorClasses = {
  primary: {
    bg: "bg-blue-500",
    text: "text-blue-500",
    border: "border-blue-500",
    hover: "hover:bg-blue-600",
  },
  secondary: {
    bg: "bg-green-500",
    text: "text-green-500",
    border: "border-green-500",
    hover: "hover:bg-green-600",
  },
  earth: {
    bg: "bg-amber-600",
    text: "text-amber-600",
    border: "border-amber-600",
    hover: "hover:bg-amber-700",
  },
  gold: {
    bg: "bg-yellow-500",
    text: "text-yellow-500",
    border: "border-yellow-500",
    hover: "hover:bg-yellow-600",
  },
} as const;
