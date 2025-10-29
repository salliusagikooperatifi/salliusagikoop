"use client";

import { supabase } from "@/lib/supabaseClient";
import { Announcement } from "@/lib/types";
import { useEffect, useState } from "react";
import Toast, { ToastType } from "@/components/Toast";
import RichTextEditor from "@/components/RichTextEditor";

export default function AdminAnnouncementsPage() {
  const [announcements, setAnnouncements] = useState<Announcement[]>([]);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [isImportant, setIsImportant] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const [editorKey, setEditorKey] = useState(0);

  async function load() {
    const { data } = await supabase
      .from("announcements")
      .select("*")
      .order("date", { ascending: false });
    setAnnouncements((data as unknown as Announcement[]) ?? []);
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
    if (!date) {
      setToast({ message: "Tarih zorunludur.", type: "error" });
      return;
    }
    if (!content.trim()) {
      setToast({ message: "İçerik zorunludur.", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase
        .from("announcements")
        .insert({ title, content, isImportant, author, date, published: true });
      if (error) {
        setToast({ message: "Hata: " + error.message, type: "error" });
      } else {
        setTitle("");
        setDate("");
        setAuthor("");
        setContent("");
        setIsImportant(false);
        setEditorKey((k) => k + 1); // force remount editor to clear its internal state
        await load();
        setToast({ message: "Duyuru eklendi.", type: "success" });
      }
    } catch {
      setToast({ message: "Bağlantı hatası.", type: "error" });
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const { error } = await supabase
      .from("announcements")
      .delete()
      .eq("id", id);
    if (error) {
      setToast({ message: "Silme hatası: " + error.message, type: "error" });
    } else {
      await load();
      setToast({ message: "Duyuru silindi.", type: "info" });
    }
    setDeletingId(null);
  }

  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
        Duyurular
      </h1>
      <form
        onSubmit={handleAdd}
        style={{ display: "grid", gap: 10, marginBottom: 12 }}
      >
        <div
          style={{ display: "grid", gap: 6, width: "100%", maxWidth: "100%" }}
        >
          <label style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>
            Başlık <span style={{ color: "#ef4444" }}>*</span>
          </label>
          <input
            placeholder="Başlık"
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
              value={date}
              onChange={(e) => setDate(e.target.value)}
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
              Yazar (opsiyonel)
            </label>
            <input
              placeholder="Yazar"
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
            İçerik <span style={{ color: "#ef4444" }}>*</span>
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
              placeholder="İçerik yazın..."
            />
          </div>
        </div>

        <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <input
            type="checkbox"
            checked={isImportant}
            onChange={(e) => setIsImportant(e.target.checked)}
          />
          Önemli mi? (Kırmızı çerçeveli olarak anasayfada da görüntülenecektir.)
        </label>

        <button
          disabled={loading || !title.trim() || !date || !content.trim()}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            background:
              loading || !title.trim() || !date || !content.trim()
                ? "#6b7280"
                : "#111827",
            color: "#fff",
            fontWeight: 700,
            minWidth: 180,
            width: 200,
          }}
        >
          {loading ? "Duyuru Ekleniyor..." : "Duyuru Ekle"}
        </button>
      </form>
      {announcements.length === 0 ? (
        <p>Henüz kayıt bulunmuyor.</p>
      ) : (
        <div style={{ display: "grid", marginTop: 24 }}>
          <h1 style={{ fontSize: 20, fontWeight: 800 }}>Mevcut Duyurular</h1>
          <ul style={{ display: "grid", gap: 8 }}>
            {announcements.map((a) => (
              <li
                key={a.id}
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
                  <div style={{ fontWeight: 700 }}>{a.title}</div>
                  <div style={{ color: "#6b7280", fontSize: 14 }}>{a.date}</div>
                </div>
                <button
                  onClick={() => handleDelete(a.id)}
                  disabled={deletingId === a.id}
                  style={{
                    padding: "8px 10px",
                    borderRadius: 8,
                    background: deletingId === a.id ? "#9ca3af" : "#ef4444",
                    color: "#fff",
                    fontWeight: 700,
                    minWidth: 110,
                  }}
                >
                  {deletingId === a.id ? "Siliniyor..." : "Sil"}
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
