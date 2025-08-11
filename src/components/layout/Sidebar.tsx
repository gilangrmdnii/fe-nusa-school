"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/cn";

const menu = [
  { name: "Dashboard", path: "/" },
  { name: "Data Siswa", path: "/students" },
  { name: "Data Guru", path: "/teachers" },
  { name: "Kelas", path: "/classes" },
  { name: "Jadwal Pelajaran", path: "/schedule" },
  { name: "Laporan", path: "/reports" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-secondary text-white min-h-screen flex flex-col">
      <div className="p-4 border-b border-white/10">
        <h1 className="text-xl font-bold">Nusa School</h1>
      </div>
      <nav className="flex-1 p-4 space-y-1">
        {menu.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={cn(
              "block px-3 py-2 rounded hover:bg-primary transition-colors",
              pathname === item.path && "bg-primary"
            )}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
