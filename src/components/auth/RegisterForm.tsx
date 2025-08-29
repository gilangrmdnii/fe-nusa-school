"use client";
import { useAuth } from "@/context/AuthContext";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function RegisterForm() {
    const { register } = useAuth();
    const [form, setForm] = useState({
        full_name: "",
        phone: "",
        email: "",
        password: "",
        confirm_password: "",
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await register({
            fullname: form.full_name,
            email: form.email,
            password: form.password,
            confirm_password: form.confirm_password,
            phone: form.phone,
        });
    };


    return (
         <div className="flex flex-col items-center w-full">
            {/* Logo di luar card */}
            <div className="mb-6">
                <Image
                    src="/assets/icons/logo.png"
                    alt="Nusa School"
                    width={160}
                    height={50}
                    priority
                />
            </div>

            {/* Card */}
            <div className="w-full max-w-[700px] bg-white shadow-lg rounded-xl p-10">
                {/* Title */}
                <h1 className="text-2xl font-bold text-center text-blue-800 mb-6">
                    Daftarkan Akun
                </h1>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6 p-2">
                    {/* Nama Lengkap */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            placeholder="Masukkan Nama Lengkap"
                            className="w-full border border-gray-400 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                            value={form.full_name}
                            onChange={(e) => setForm({ ...form, full_name: e.target.value })}
                            required
                        />
                    </div>

                    {/* Phone + Email */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm  font-medium text-gray-700 mb-1">
                                Nomor HP
                            </label>
                            <div className="flex">
                                <span className="inline-flex items-center px-2 border border-r-0 rounded-l-lg text-gray-500 bg-gray-50">
                                    +62
                                </span>
                                <input
                                    type="tel"
                                    placeholder="812 1234 1234"
                                    className="w-full border border-gray-400 rounded-r-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                    value={form.phone}
                                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                                    required
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                placeholder="Masukkan Email"
                                className="w-full border border-gray-400 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    {/* Password + Confirm Password */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Kata Sandi
                            </label>
                            <input
                                type="password"
                                placeholder="Masukkan Kata Sandi"
                                className="w-full border border-gray-400 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Ulangi Kata Sandi
                            </label>
                            <input
                                type="password"
                                placeholder="Masukkan Kata Sandi"
                                className="w-full border border-gray-400 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 outline-none"
                                value={form.confirm_password}
                                onChange={(e) =>
                                    setForm({ ...form, confirm_password: e.target.value })
                                }
                                required
                            />
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
                    >
                        Daftar
                    </button>
                </form>

                {/* Login Link */}
                <p className="text-center text-sm text-gray-600 mt-4">
                    Sudah punya akun?{" "}
                    <Link
                        href="/login"
                        className="text-blue-600 font-medium hover:underline"
                    >
                        Masuk Sekarang
                    </Link>
                </p>
            </div>

            {/* Footer */}
            <p className="text-center text-xs text-gray-400 mt-8">
                Copyright © 2025 PT. Nafisha Universal Network
            </p>
        </div>
    );
}
