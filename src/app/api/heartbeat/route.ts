import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// Supabase client oluştur
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

/**
 * Heartbeat endpoint
 * Amaç: Supabase'e hafif bir okuma isteği atarak projeyi "aktif" tutmak.
 * announcements tablosundan sadece count alıyoruz (çok hafif istek)
 */
export async function GET() {
  try {
    // HEAD + count: 'exact' çok hafif bir istek - sadece kayıt sayısını alır
    const { count, error } = await supabase
      .from("announcements")
      .select("id", { count: "exact", head: true })
      .limit(1);

    if (error) {
      console.error("Heartbeat error:", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 }
      );
    }

    // Başarılı yanıt döndür
    return new NextResponse(
      JSON.stringify({
        ok: true,
        timestamp: new Date().toISOString(),
        message: "Supabase connection active",
        recordCount: count,
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store, no-cache, must-revalidate",
        },
      }
    );
  } catch (err) {
    console.error("Unexpected error in heartbeat:", err);
    return NextResponse.json(
      { ok: false, error: "Unexpected error" },
      { status: 500 }
    );
  }
}

