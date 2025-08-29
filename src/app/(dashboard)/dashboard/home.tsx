"use client";

import { useAuth } from "@/context/AuthContext";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import StudentRegistrationModal from "@/components/ui/StudentRegistrationModal";

export default function HomePage() {
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState<string[]>([]);

  const currentDate = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handleAddStudent = (studentName: string) => {
    setStudents((prev) => [...prev, studentName]);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">
          Selamat datang, {user?.fullname || "Pengguna"}!
        </h1>
        <p className="text-gray-500">{currentDate}</p>
      </header>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold">Total Tugas Tertunda</h2>
          <p className="text-3xl">0</p>
          <p className="text-gray-500">tidak ada tugas yang tertunda</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="font-semibold">Total Tagihan Belum Terbayar</h2>
          <p className="text-3xl">Rp 0</p>
          <p className="text-gray-500">tidak ada tagihan yang belum terbayar</p>
        </div>
        <div className="bg-white shadow rounded-lg p-4 col-span-1 md:col-span-2">
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Daftar Tugas Anak</h2>
            <Link
              href="/tasks"
              className="text-blue-600 hover:underline text-sm"
            >
              Lihat Semua
            </Link>
          </div>
          <div className="bg-gray-50 rounded-lg p-4 text-center">
            <p className="text-gray-500">Belum Ada Tugas</p>
            <p className="text-sm text-gray-400 mt-1">
              Kami akan beri kabar jika ada tugas baru
            </p>
          </div>
        </div>
      </div>

      {/* Data Anak */}
      <div className="bg-white shadow rounded-lg p-6 relative">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-semibold text-lg">Data Anak</h2>
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Daftarkan Calon Siswa +
          </button>
        </div>

        {students.length === 0 ? (
          <div className="text-center py-8">
            <Image
              src="/assets/icons/cuate.png"
              alt="Belum Ada Data Anak"
              width={200}
              height={200}
              className="mx-auto mb-4"
            />
            <h3 className="font-medium text-gray-800 mb-2">
              Belum Ada Data Anak
            </h3>
            <p className="text-gray-500 text-sm">
              Yuk, klik tombol di kanan atas untuk pendaftaran siswa baru!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {students.map((student, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-lg p-4 flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-medium text-sm">
                      {student.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{student}</p>
                    <p className="text-sm text-gray-500">Calon Siswa</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Inline Modal Component */}
        <StudentRegistrationModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onSubmit={handleAddStudent}
        />
      </div>
    </div>
  );
}
