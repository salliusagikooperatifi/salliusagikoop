"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/uyeler", label: "Üyelerimiz" },
  { href: "/admin/yonetim", label: "Yönetim" },
  { href: "/admin/duyurular", label: "Duyurular" },
  { href: "/admin/haberler", label: "Haberler" },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <aside
      style={{
        width: 260,
        flexShrink: 0,
        position: "sticky",
        top: 0,
        alignSelf: "flex-start",
        height: "100vh",
        background: "#111827",
        color: "#fff",
        padding: 16,
      }}
    >
      <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>
        Yönetim Paneli
      </div>
      <nav style={{ display: "grid", gap: 8 }}>
        {navItems.map((item) => {
          const active = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              style={{
                display: "block",
                padding: "10px 12px",
                borderRadius: 8,
                color: active ? "#111827" : "#e5e7eb",
                background: active ? "#f59e0b" : "transparent",
                textDecoration: "none",
                fontWeight: 600,
              }}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
