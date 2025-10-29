"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Toast, { ToastType } from "@/components/Toast";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setToast(null);
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        let errorMessage = "Giriş başarısız.";
        if (error.message.includes("Invalid login credentials")) {
          errorMessage = "E-posta veya şifre hatalı. Lütfen tekrar deneyin.";
        } else if (error.message.includes("Email not confirmed")) {
          errorMessage =
            "E-posta adresiniz doğrulanmamış. Lütfen e-postanızı kontrol edin.";
        } else {
          errorMessage = "Giriş yapılamadı. " + error.message;
        }
        setToast({ message: errorMessage, type: "error" });
      } else {
        setToast({
          message: "Başarılı! Yönlendiriliyorsunuz...",
          type: "success",
        });
        // Admin paneline yönlendir
        setTimeout(() => {
          router.push("/admin");
        }, 1000);
      }
    } catch {
      setToast({ message: "Bağlantı hatası.", type: "error" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        maxWidth: 360,
        margin: "48px auto",
        padding: 24,
        position: "relative",
      }}
    >
      <Link
        href="/"
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          padding: "8px 16px",
          borderRadius: 8,
          background: "#3b82f6", // blue-500
          color: "#fff",
          textDecoration: "none",
          fontWeight: 600,
          fontSize: 14,
          border: "1px solid #3b82f6",
          transition: "all 0.2s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = "#2563eb"; // blue-600
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = "#3b82f6";
        }}
      >
        Anasayfa
      </Link>
      <h1 style={{ fontSize: 24, fontWeight: 800, marginBottom: 16 }}>Giriş</h1>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            background: loading ? "#6b7280" : "#111827",
            color: "#fff",
            fontWeight: 700,
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Giriş yapılıyor..." : "Giriş Yap"}
        </button>
      </form>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}
