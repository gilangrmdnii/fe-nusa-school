"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import StudentRegistrationModal from "@/components/ui/StudentRegistrationModal";

export default function StudentRegistrationPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [students, setStudents] = useState<string[]>([]);

  const handleAddStudent = (studentName: string) => {
    setStudents((prev) => [...prev, studentName]);
  };

  return (
    <div className="p-6">
      {/* Header */}
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Data Calon Siswa</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Tambahkan Calon Siswa +
        </button>
      </header>

      {/* Data Calon Siswa */}
      {students.length === 0 ? (
        <div className="text-center py-8">
          <Image
            src="/assets/icons/cuate.png" // Ganti dengan path gambar yang sesuai
            alt="Belum Ada Data Calon Siswa"
            width={300}
            height={300}
            className="mx-auto mb-4"
          />
          <h3 className="font-medium text-gray-800 mb-2">
            Belum Ada Data Calon Siswa
          </h3>
          <p className="text-gray-500 text-sm">
            Yuk, klik tombol di kanan atas untuk menambahkan siswa baru!
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

      <StudentRegistrationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddStudent}
      />
    </div>
  );
}
