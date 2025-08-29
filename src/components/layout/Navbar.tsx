"use client";
import { useAuth } from "@/context/AuthContext";
import { Bell } from "lucide-react";
import Image from "next/image";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-white px-6 py-4 flex justify-between items-center">
      {/* Left side: Greeting */}
      <div>
        <p className="text-sm text-gray-500">Selamat datang,</p>
        <h2 className="text-xl font-bold text-gray-800">
          {user?.role ? `${user.role}!` : "Admin!"}
        </h2>
      </div>

      {/* Right side: Actions */}
      <div className="flex items-center space-x-3">
        {/* Notification Button */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-gray-50 hover:bg-gray-100">
          <Bell className="w-5 h-5 text-gray-600" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Avatar */}
        <div className="flex items-center space-x-2">
          <Image
            src={user?.avatar || "/assets/avatar.png"}
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full object-cover"
          />

          {/* Logout */}
          <button
            onClick={logout}
            className="text-sm text-red-500 hover:underline"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
