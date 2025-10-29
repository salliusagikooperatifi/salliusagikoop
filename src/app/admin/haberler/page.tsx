"use client";

import { supabase } from "@/lib/supabaseClient";
import { NewsItem } from "@/lib/types";
import { useEffect, useState } from "react";
import Toast, { ToastType } from "@/components/Toast";
import RichTextEditor from "@/components/RichTextEditor";

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState("");
  const [publishedAt, setPublishedAt] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [featuredImageUrl, setFeaturedImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const [editorKey, setEditorKey] = useState(0);

  async function load() {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("publishedAt", { ascending: false });
    setNews((data as unknown as NewsItem[]) ?? []);
  }

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setToast({ message: "Başlık zorunludur.", type: "error" });
      return;
    }
    if (!publishedAt) {
      setToast({ message: "Tarih zorunludur.", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const slug = title
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9çğıöşü\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-");
      const payload: Record<string, unknown> = {
        title,
        slug,
        publishedAt,
      };
      if (author.trim()) payload.author = author.trim();
      if (content.trim()) payload.content = content;
      if (featuredImageUrl) payload.featuredImage = featuredImageUrl;

      const { error } = await supabase.from("news").insert(payload);
      if (error) {
        setToast({ message: "Hata: " + error.message, type: "error" });
      } else {
        setTitle("");
        setPublishedAt("");
        setAuthor("");
        setContent("");
        setFeaturedImageUrl("");
        setEditorKey((k) => k + 1);
        await load();
        setToast({ message: "Haber eklendi.", type: "success" });
      }
    } catch {
      setToast({ message: "Bağlantı hatası.", type: "error" });
    }
    setLoading(false);
  }

  async function resizeToWebP(file: File, maxSize: number, quality = 0.8) {
    const bitmap = await createImageBitmap(file);
    const ratio = Math.min(1, maxSize / Math.max(bitmap.width, bitmap.height));
    const targetW = Math.round(bitmap.width * ratio);
    const targetH = Math.round(bitmap.height * ratio);

    const canvas: HTMLCanvasElement | OffscreenCanvas =
      "OffscreenCanvas" in window
        ? new OffscreenCanvas(targetW, targetH)
        : Object.assign(document.createElement("canvas"), {
            width: targetW,
            height: targetH,
          });

    const ctx =
      "getContext" in canvas
        ? (canvas as HTMLCanvasElement).getContext("2d")
        : (canvas as OffscreenCanvas).getContext("2d");

    if (!ctx) throw new Error("Canvas context alınamadı");

    ctx.drawImage(bitmap, 0, 0, targetW, targetH);

    const blob: Blob =
      "convertToBlob" in canvas
        ? await (canvas as OffscreenCanvas).convertToBlob({
            type: "image/webp",
            quality,
          })
        : await new Promise((res) =>
            (canvas as HTMLCanvasElement).toBlob(
              (b) => res(b as Blob),
              "image/webp",
              quality
            )
          );

    return new File([blob], file.name.replace(/\.\w+$/, ".webp"), {
      type: "image/webp",
    });
  }

  async function makeVariants(file: File) {
    const original1600 = await resizeToWebP(file, 1600, 0.82);
    const medium800 = await resizeToWebP(file, 800, 0.8);
    const small400 = await resizeToWebP(file, 400, 0.8);
    return { original1600, medium800, small400 };
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 15 * 1024 * 1024) {
      setToast({
        message: "Max 15MB boyutunda görsel yükleyin.",
        type: "error",
      });
      return;
    }

    const safeSlug = (title || "haber")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9çğıöşü\s-]/g, "")
      .replace(/\s+/g, "-")
      .replace(/-+/g, "-");

    setUploading(true);
    try {
      // 1) İstemci tarafı optimize + varyantlar
      const { original1600, medium800, small400 } = await makeVariants(file);

      // 2) Supabase'e yükle
      const base = `${safeSlug}-${Date.now()}`;
      const paths = [
        { path: `${base}-1600.webp`, file: original1600 },
        { path: `${base}-800.webp`, file: medium800 },
        { path: `${base}-400.webp`, file: small400 },
      ];

      for (const { path, file } of paths) {
        const { error } = await supabase.storage
          .from("news")
          .upload(path, file, {
            cacheControl: "31536000",
            upsert: false,
            contentType: "image/webp",
          });
        if (error) throw error;
      }

      // 3) En büyük boyutu kapak olarak kullan (detay sayfası)
      const { data } = supabase.storage
        .from("news")
        .getPublicUrl(`${base}-1600.webp`);
      setFeaturedImageUrl(data.publicUrl);
      setToast({
        message: "Görsel optimize edilerek yüklendi.",
        type: "success",
      });
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Bilinmeyen hata";
      setToast({
        message: "Yükleme hatası: " + errorMessage,
        type: "error",
      });
    } finally {
      setUploading(false);
    }
  }

  function handleRemoveImage() {
    setFeaturedImageUrl("");
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const { error } = await supabase.from("news").delete().eq("id", id);
    if (error) {
      setToast({ message: "Silme hatası: " + error.message, type: "error" });
    } else {
      await load();
      setToast({ message: "Haber silindi.", type: "info" });
    }
    setDeletingId(null);
  }

  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
        Haberler
      </h1>
      <form
        onSubmit={handleAdd}
        style={{ display: "grid", gap: 10, marginBottom: 12 }}
      >
        <div
          style={{ display: "grid", gap: 6, width: "100%", maxWidth: "100%" }}
        >
          <label style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>
            Haber Başlığı<span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            placeholder="Haber Başlığı"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            style={{
              padding: 12,
              borderRadius: 10,
              border: "1px solid #d1d5db",
              background: "#ffffff",
              boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            }}
          />
        </div>

        {/* Kapak Görseli (Opsiyonel) */}
        <div style={{ display: "grid", gap: 8 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>
            Kapak Görseli (Opsiyonel)
          </label>
          {featuredImageUrl && (
            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: 480,
                height: 240,
                borderRadius: 12,
                overflow: "hidden",
                border: "1px solid #e5e7eb",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={featuredImageUrl}
                alt="Kapak Görseli"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
              <button
                type="button"
                onClick={handleRemoveImage}
                title="Fotoğrafı Kaldır"
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  padding: "6px 10px",
                  borderRadius: 8,
                  background: "#ef4444",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Kaldır
              </button>
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <label
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                padding: "10px 12px",
                borderRadius: 8,
                background: uploading ? "#6b7280" : "#2563eb",
                color: "#fff",
                fontWeight: 700,
                cursor: uploading ? "not-allowed" : "pointer",
              }}
            >
              {uploading
                ? "Yükleniyor..."
                : featuredImageUrl
                ? "Değiştir"
                : "Fotoğraf Yükle"}
              <input
                type="file"
                accept="image/jpeg,image/jpg,image/png,image/webp"
                onChange={handleImageUpload}
                style={{ display: "none" }}
                disabled={uploading}
              />
            </label>
            <p style={{ fontSize: 12, color: "#6b7280" }}>
              Max 15MB • JPEG, PNG, WebP
            </p>
          </div>
          <p style={{ fontSize: 12, color: "#6b7280" }}>
            Kapak görseli isteğe bağlıdır. Görsel yoksa placeholder gösterilir.
          </p>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            width: "100%",
            maxWidth: "100%",
          }}
        >
          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>
              Tarih <span style={{ color: "#ef4444" }}>*</span>
            </label>
            <input
              type="date"
              value={publishedAt}
              onChange={(e) => setPublishedAt(e.target.value)}
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                width: "100%",
              }}
            />
          </div>

          <div style={{ display: "grid", gap: 6 }}>
            <label style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>
              Haber Yazarı (opsiyonel)
            </label>
            <input
              placeholder="Haber Yazarı"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid #e5e7eb",
                background: "#ffffff",
                boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
                width: "100%",
              }}
            />
          </div>
        </div>

        <div style={{ display: "grid", gap: 6 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>
            Haber İçeriği <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <div
            style={{
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              minHeight: 200,
              width: "100%",
              maxWidth: "100%",
              overflow: "hidden",
            }}
          >
            <RichTextEditor
              key={editorKey}
              value={content}
              onChange={setContent}
              placeholder="Haber içeriğini yazın..."
            />
          </div>
        </div>

        <button
          disabled={loading || uploading || !title.trim() || !publishedAt}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            background:
              loading || uploading || !title.trim() || !publishedAt
                ? "#6b7280"
                : "#111827",
            color: "#fff",
            fontWeight: 700,
            minWidth: 180,
            width: 200,
          }}
        >
          {loading ? "Haber Ekleniyor..." : "Haber Ekle"}
        </button>
      </form>
      {news.length === 0 ? (
        <p>Henüz kayıt bulunmuyor.</p>
      ) : (
        <div style={{ display: "grid", marginTop: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800 }}>Mevcut Haberler</h1>
          <ul style={{ display: "grid", gap: 8 }}>
            {news.map((n) => (
              <li
                key={n.id}
                style={{
                  background: "#fff",
                  borderRadius: 8,
                  padding: 12,
                  border: "1px solid #e5e7eb",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 700 }}>{n.title}</div>
                  <div style={{ color: "#6b7280", fontSize: 14 }}>
                    {n.publishedAt}
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(n.id)}
                  disabled={deletingId === n.id}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 8,
                    background: deletingId === n.id ? "#9ca3af" : "#ef4444",
                    color: "#fff",
                    fontWeight: 700,
                    minWidth: 110,
                  }}
                >
                  {deletingId === n.id ? "Siliniyor..." : "Sil"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
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
