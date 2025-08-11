"use client";
import { useAppContext } from "@/context/AppContext";

export default function Navbar() {
  const { user } = useAppContext();

  return (
    <header className="bg-white shadow p-4 flex justify-between items-center">
      <h2 className="font-semibold">Dashboard</h2>
      <div className="flex items-center space-x-3">
        <span>{user?.name}</span>
        <span className="text-sm text-gray-500">({user?.role})</span>
      </div>
    </header>
  );
}
