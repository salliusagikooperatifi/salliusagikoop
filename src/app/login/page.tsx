"use client";

import { supabase } from "@/lib/supabaseClient";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Home } from "lucide-react";
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
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(180deg, rgba(243,244,246,1) 0%, rgba(255,255,255,1) 100%)",
        padding: 24,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 420,
          position: "relative",
          background: "#fff",
          border: "1px solid #e5e7eb",
          borderRadius: 12,
          boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          padding: 24,
        }}
      >
        <Link
          href="/"
          style={{
            position: "absolute",
            top: 12,
            right: 12,
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            padding: "8px 14px",
            borderRadius: 10,
            background: "#1d4ed8", // blue-700
            color: "#fff",
            textDecoration: "none",
            fontWeight: 700,
            fontSize: 13,
            border: "1px solid #1d4ed8",
            transition: "all 0.2s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "#1e40af"; // blue-800
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "#1d4ed8";
          }}
        >
          <Home size={16} />
          Anasayfa
        </Link>

        <div style={{ marginBottom: 14 }}>
          <h1 style={{ fontSize: 26, fontWeight: 800, color: "#111827", marginBottom: 6 }}>
            Yönetim Girişi
          </h1>
          <p style={{ fontSize: 14, color: "#6b7280" }}>
            Admin paneline erişmek için e‑posta ve şifrenizi girin.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "grid", gap: 12 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>
            E‑posta
          </label>
        <input
          type="email"
          placeholder="E-posta"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ padding: 10, borderRadius: 8, border: "1px solid #e5e7eb" }}
        />
          <label style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>
            Şifre
          </label>
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
    </div>
  );
}
