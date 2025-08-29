"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import type { User, Session } from "@/lib/authService";
import { authService } from "@/lib/authService";

export type AuthError = {
  message: string;
  code?: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  loading: boolean;
  error: AuthError | null;
  login: (email: string, password: string) => Promise<void>;
  register: (data: {
    fullname: string;
    email: string;
    password: string;
    confirm_password: string;
    phone?: string;
  }) => Promise<void>;
  logout: () => void;
  clearError: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AuthError | null>(null);
  const router = useRouter();

  // Restore session saat app start
  useEffect(() => {
    const session = authService.loadSession();
    if (session) {
      setUser(session.user);
      setToken(session.token);
    }
    setLoading(false);
  }, []);

  const clearError = () => setError(null);

  const login = async (email: string, password: string) => {
    setLoading(true);
    clearError();
    try {
      const session: Session = await authService.login(email, password);
      setUser(session.user);
      setToken(session.token);
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Login failed";
      setError({ message: errorMessage });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: {
    fullname: string;
    email: string;
    password: string;
    confirm_password: string;
    phone?: string;
  }) => {
    setLoading(true);
    clearError();
    try {
      const session: Session = await authService.register(data);
      setUser(session.user);
      setToken(session.token);
      router.push("/dashboard");
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Registration failed";
      setError({ message: errorMessage });
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    authService.logout();
    setUser(null);
    setToken(null);
    setError(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        error,
        login,
        register,
        logout,
        clearError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
