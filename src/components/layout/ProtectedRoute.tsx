"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Hanya jalankan di client side
    if (typeof window === 'undefined') return;

    if (!loading) {
      // Jika tidak loading dan tidak ada user, redirect ke login
      // Kecuali jika sedang di halaman auth
      if (!user && !pathname.startsWith("/auth")) {
        router.replace("/login");
        return;
      }

      // Jika sudah login tapi mencoba akses halaman auth, redirect ke dashboard
      if (user && (pathname === "/login" || pathname === "/register")) {
        router.replace("/dashboard");
        return;
      }
    }
  }, [user, loading, pathname, router]);

  // Show loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Memuat...</p>
        </div>
      </div>
    );
  }

  // Jika tidak ada user dan bukan di halaman auth, return null (akan di-redirect)
  if (!user && !pathname.startsWith("/auth")) {
    return null;
  }

  return <>{children}</>;
}
