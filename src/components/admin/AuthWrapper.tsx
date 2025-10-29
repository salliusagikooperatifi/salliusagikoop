"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const redirectedRef = useRef(false); // Çift yönlendirmeyi önle

  const isProtected = pathname?.startsWith("/admin"); // Sadece admin rotalarını koru

  useEffect(() => {
    let isMounted = true;

    const redirectToLogin = () => {
      if (redirectedRef.current) return;
      redirectedRef.current = true;
      // History'de iz bırakmadan yönlendir
      router.replace("/login");
    };

    const checkAuth = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        // Sadece korunan sayfalarda kontrol et
        if (isProtected && !session) {
          setIsAuthenticated(false);
          redirectToLogin();
          return;
        }

        if (session) {
          if (!isMounted) return;
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    checkAuth();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        setIsAuthenticated(false);
        if (isProtected) redirectToLogin();
      } else {
        setIsAuthenticated(true);
        setLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
      isMounted = false;
    };
  }, [pathname, router, isProtected]);

  if (!isProtected) {
    // Korumasız sayfaları etkileme: direkt render et
    return <>{children}</>;
  }

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Replace çalışana kadar boş döndür (flicker olmasın)
    return null;
  }

  return <>{children}</>;
}
