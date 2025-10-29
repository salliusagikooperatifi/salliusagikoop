"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { supabaseBrowser } from "@/lib/supabase/client";

interface SupabaseRealtimeRefresherProps {
  tables: string[]; // e.g., ["members"]
}

export default function SupabaseRealtimeRefresher({
  tables,
}: SupabaseRealtimeRefresherProps) {
  const router = useRouter();

  useEffect(() => {
    const channel = supabaseBrowser.channel("site-realtime-refresh");

    tables.forEach((table) => {
      channel.on(
        "postgres_changes",
        { event: "*", schema: "public", table },
        (payload) => {
          // Debug: olayları konsola yaz
          // console.log("Realtime event:", table, payload.eventType, payload);
          router.refresh();
        }
      );
    });

    channel.subscribe((status) => {
      // console.log("Realtime status:", status);
    });

    return () => {
      supabaseBrowser.removeChannel(channel);
    };
  }, [router, tables]);

  return null;
}
