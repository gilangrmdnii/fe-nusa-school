"use client";

import { useAuth } from "@/context/AuthContext";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginForm() {
  const { login, loading, error, clearError } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState<string>("");

  useEffect(() => {
    if (error) {
      setLocalError(error.message);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError("");
    clearError();
    
    if (!email || !password) {
      setLocalError("Email dan password harus diisi");
      return;
    }

    try {
      await login(email, password);
    } catch (err) {
      // Error sudah ditangani oleh AuthContext
      console.error("Login error:", err);
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Logo di luar card */}
      <div className="mb-6">
        <Image
          src="/assets/icons/logo.png"
          alt="Nusa School"
          width={180}
          height={60}
          priority
        />
      </div>

      {/* Card */}
      <div className="w-full max-w-[700px] bg-white shadow-lg rounded-xl p-10">
        {/* Title */}
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
          Silahkan Masuk
        </h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="Masukkan Email"
              className="w-full border border-gray-400 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Kata Sandi
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Masukkan Kata Sandi"
                className="w-full border border-gray-400 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none pr-10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
            <div className="text-right mt-1">
              <Link
                href="/forgot-password"
                className="text-sm text-blue-600 hover:underline"
              >
                Lupa Kata Sandi?
              </Link>
            </div>
          </div>

          {/* Error Message */}
          {localError && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
              {localError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                Memproses...
              </div>
            ) : (
              "Masuk"
            )}
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center text-sm text-gray-600 mt-4">
          Belum punya akun?{" "}
          <Link
            href="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Daftarkan Akun
          </Link>
        </p>
      </div>

      {/* Footer di luar card */}
      <p className="text-center text-xs text-gray-400 mt-8">
        Copyright © 2025 PT. Nafisha Universal Network
      </p>
    </div>
  );
}
