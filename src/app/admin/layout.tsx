import React from "react";
import Navigation from "@/components/admin/Navigation";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div style={{ display: "flex" }}>
      <Navigation />
      <main
        style={{
          flexGrow: 1,
          padding: 24,
          paddingTop: 56,
          backgroundColor: "#f5f5f5",
          minHeight: "100vh",
        }}
      >
        {children}
      </main>
    </div>
  );
}
