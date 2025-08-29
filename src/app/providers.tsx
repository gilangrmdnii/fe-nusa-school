"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/context/AuthContext";
import { AppProvider } from "@/context/AppContext";
import { ErrorBoundary } from "@/components/layout/ErrorBoundary";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AppProvider>{children}</AppProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}
