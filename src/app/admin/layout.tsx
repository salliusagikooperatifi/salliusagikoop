"use client";

import React from "react";
import Navigation from "@/components/admin/Navigation";
import AuthWrapper from "@/components/admin/AuthWrapper";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthWrapper>
      <div style={{ display: "flex", height: "100vh" }}>
        <Navigation />
        <main
          style={{
            flexGrow: 1,
            padding: 24,
            backgroundColor: "#f5f5f5",
            overflow: "auto",
          }}
        >
          {children}
        </main>
      </div>
    </AuthWrapper>
  );
}
