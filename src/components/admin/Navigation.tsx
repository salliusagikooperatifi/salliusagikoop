"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { supabase } from "@/lib/supabaseClient";

const navItems = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/uyeler", label: "Üyelerimiz" },
  { href: "/admin/yonetim", label: "Yönetim" },
  { href: "/admin/duyurular", label: "Duyurular" },
  { href: "/admin/haberler", label: "Haberler" },
];

export default function Navigation() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    // Doğrudan window.location ile yönlendir
    window.location.href = "/login";
  };

  return (
    <div style={{ display: "flex" }}>
      <aside
        style={{
          width: 260,
          flexShrink: 0,
          height: "100vh",
          background: "#111827",
          color: "#fff",
          padding: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 16 }}>
          Yönetim Paneli
        </div>
        <nav style={{ display: "grid", gap: 8, flexGrow: 1 }}>
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
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            background: "#ef4444",
            color: "#fff",
            border: "none",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Çıkış Yap
        </button>
      </aside>
    </div>
  );
}
