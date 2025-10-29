"use client";

import { supabase } from "@/lib/supabaseClient";
import { Member } from "@/lib/types";
import { useEffect, useState } from "react";
import Toast, { ToastType } from "@/components/Toast";

export default function AdminMembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [fullName, setFullName] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function load() {
    try {
      const { data, error } = await supabase
        .from("members")
        .select("*")
        .order("name");

      if (error) {
        console.error("Yükleme hatası:", error);
        alert("Veri yükleme hatası: " + error.message);
      } else {
        console.log("Veriler yüklendi:", data);
        // fullName yoksa name + surname'den oluştur
        const membersWithFullName = (data || []).map((member: Member) => ({
          ...member,
          fullName:
            member.fullName ||
            `${member.name || ""} ${member.surname || ""}`.trim(),
        }));
        setMembers(membersWithFullName as Member[]);
      }
    } catch (err) {
      console.error("Genel yükleme hatası:", err);
      alert("Bağlantı hatası. Supabase ayarlarını kontrol edin.");
    }
  }

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) {
      setToast({ message: "Ad Soyad zorunludur.", type: "error" });
      return;
    }

    setLoading(true);
    console.log("Ekleme işlemi başladı:", { fullName });

    try {
      // fullName'i name ve surname'e ayır
      const nameParts = fullName.trim().split(" ");
      const name = nameParts[0] || "";
      const surname = nameParts.slice(1).join(" ") || "";

      const { data, error } = await supabase.from("members").insert({
        name,
        surname,
      });

      if (error) {
        console.error("Supabase hatası:", error);
        setToast({ message: "Hata: " + error.message, type: "error" });
      } else {
        console.log("Başarıyla eklendi:", data);
        setFullName("");
        await load();
        setToast({ message: "Üye eklendi.", type: "success" });
      }
    } catch (err) {
      console.error("Genel hata:", err);
      setToast({
        message: "Bağlantı hatası. Supabase ayarlarını kontrol edin.",
        type: "error",
      });
    }

    setLoading(false);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const { error } = await supabase.from("members").delete().eq("id", id);
    if (error) {
      setToast({ message: "Silme hatası: " + error.message, type: "error" });
    } else {
      await load();
      setToast({ message: "Üye silindi.", type: "info" });
    }
    setDeletingId(null);
  }

  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
        Üyelerimiz
      </h1>
      <form
        onSubmit={handleAdd}
        style={{ display: "flex", gap: 8, marginBottom: 12 }}
      >
        <input
          placeholder="Ad Soyad"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #d1d5db",
            background: "#ffffff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            flex: 1,
          }}
        />
        <button
          disabled={loading || !fullName.trim()}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            background: loading || !fullName.trim() ? "#6b7280" : "#111827",
            color: "#fff",
            fontWeight: 700,
            minWidth: 110,
            opacity: loading ? 0.9 : 1,
          }}
        >
          {loading ? "Ekleniyor..." : "Ekle"}
        </button>
      </form>
      {members.length === 0 ? (
        <p>Henüz kayıt bulunmuyor.</p>
      ) : (
        <ul style={{ display: "grid", gap: 8 }}>
          {members.map((m) => (
            <li
              key={m.id}
              style={{
                background: "#fff",
                borderRadius: 8,
                padding: 12,
                border: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <div>
                <div style={{ fontWeight: 700 }}>{m.fullName}</div>
              </div>
              <button
                onClick={() => handleDelete(m.id)}
                disabled={deletingId === m.id}
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  background: deletingId === m.id ? "#9ca3af" : "#ef4444",
                  color: "#fff",
                  fontWeight: 700,
                  minWidth: 110,
                }}
              >
                {deletingId === m.id ? "Siliniyor..." : "Sil"}
              </button>
            </li>
          ))}
        </ul>
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
