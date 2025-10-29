"use client";

import { supabase } from "@/lib/supabaseClient";
import { BoardMember } from "@/lib/types";
import { useEffect, useState } from "react";
import Toast, { ToastType } from "@/components/Toast";

export default function AdminBoardPage() {
  const [board, setBoard] = useState<BoardMember[]>([]);
  const [fullName, setFullName] = useState("");
  const [position, setPosition] = useState("");
  const [role, setRole] = useState<"board" | "audit">("board");
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
  } | null>(null);

  async function load() {
    const { data, error } = await supabase
      .from("board_members")
      .select("*")
      .order("fullName");
    if (!error) setBoard((data as unknown as BoardMember[]) ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!fullName.trim()) {
      setToast({ message: "Ad Soyad zorunludur.", type: "error" });
      return;
    }
    setLoading(true);
    try {
      const { error } = await supabase
        .from("board_members")
        .insert({ fullName, position, role });
      if (error) {
        setToast({ message: "Hata: " + error.message, type: "error" });
      } else {
        setFullName("");
        setPosition("");
        setRole("board");
        await load();
        setToast({ message: "Üye eklendi.", type: "success" });
      }
    } catch {
      setToast({ message: "Bağlantı hatası.", type: "error" });
    }
    setLoading(false);
  }

  async function handleDelete(id: string) {
    setDeletingId(id);
    const { error } = await supabase
      .from("board_members")
      .delete()
      .eq("id", id);
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
        Yönetim
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
        <input
          placeholder="Görev"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            width: 240,
          }}
        />
        <select
          value={role}
          onChange={(e) => setRole(e.target.value as "board" | "audit")}
          style={{
            padding: 12,
            borderRadius: 10,
            border: "1px solid #e5e7eb",
            background: "#ffffff",
            boxShadow: "0 1px 2px rgba(0,0,0,0.04)",
            width: 180,
          }}
        >
          <option value="board">Yönetim Kurulu</option>
          <option value="audit">Denetim Kurulu</option>
        </select>
        <button
          disabled={loading || !fullName.trim()}
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            background: loading || !fullName.trim() ? "#6b7280" : "#111827",
            color: "#fff",
            fontWeight: 700,
            minWidth: 110,
          }}
        >
          {loading ? "Ekleniyor..." : "Ekle"}
        </button>
      </form>
      {board.length === 0 ? (
        <p>Henüz kayıt bulunmuyor.</p>
      ) : (
        <div style={{ display: "grid", gap: 24 }}>
          {/* Yönetim Kurulu */}
          <div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 12,
                color: "#374151",
              }}
            >
              Yönetim Kurulu
            </h3>
            <ul style={{ display: "grid", gap: 8 }}>
              {board
                .filter((m) => m.role === "board")
                .map((m) => (
                  <li
                    key={m.id}
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
                      <div style={{ fontWeight: 700 }}>{m.fullName}</div>
                      <div style={{ color: "#6b7280", fontSize: 14 }}>
                        {m.position}
                      </div>
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
          </div>

          {/* Denetim Kurulu */}
          <div>
            <h3
              style={{
                fontSize: 18,
                fontWeight: 700,
                marginBottom: 12,
                color: "#374151",
              }}
            >
              Denetim Kurulu
            </h3>
            <ul style={{ display: "grid", gap: 8 }}>
              {board
                .filter((m) => m.role === "audit")
                .map((m) => (
                  <li
                    key={m.id}
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
                      <div style={{ fontWeight: 700 }}>{m.fullName}</div>
                      <div style={{ color: "#6b7280", fontSize: 14 }}>
                        {m.position}
                      </div>
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
          </div>
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
