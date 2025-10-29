"use client";

import { supabase } from "@/lib/supabaseClient";
import { NewsItem } from "@/lib/types";
import { useEffect, useState } from "react";

export default function AdminNewsPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [title, setTitle] = useState("");
  const [publishedAt, setPublishedAt] = useState("");

  async function load() {
    const { data } = await supabase
      .from("news")
      .select("*")
      .order("publishedAt", { ascending: false });
    setNews((data as unknown as NewsItem[]) ?? []);
  }

  useEffect(() => {
    load();
  }, []);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await supabase
      .from("news")
      .insert({
        title,
        slug: title.toLowerCase().replaceAll(" ", "-"),
        publishedAt,
      });
    setTitle("");
    setPublishedAt("");
    await load();
  }

  async function handleDelete(id: string) {
    await supabase.from("news").delete().eq("id", id);
    await load();
  }

  return (
    <div>
      <h1 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12 }}>
        Haberler
      </h1>
      <form
        onSubmit={handleAdd}
        style={{ display: "flex", gap: 8, marginBottom: 12 }}
      >
        <input
          placeholder="Başlık"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            flex: 1,
          }}
        />
        <input
          type="date"
          value={publishedAt}
          onChange={(e) => setPublishedAt(e.target.value)}
          style={{
            padding: 10,
            borderRadius: 8,
            border: "1px solid #e5e7eb",
            width: 200,
          }}
        />
        <button
          style={{
            padding: "10px 12px",
            borderRadius: 8,
            background: "#111827",
            color: "#fff",
            fontWeight: 700,
          }}
        >
          Ekle
        </button>
      </form>
      {news.length === 0 ? (
        <p>Henüz kayıt bulunmuyor.</p>
      ) : (
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
                style={{
                  padding: "8px 10px",
                  borderRadius: 8,
                  background: "#ef4444",
                  color: "#fff",
                  fontWeight: 700,
                }}
              >
                Sil
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
